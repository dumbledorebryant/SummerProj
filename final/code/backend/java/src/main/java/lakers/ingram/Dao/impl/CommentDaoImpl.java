package lakers.ingram.Dao.impl;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSInputFile;
import lakers.ingram.Dao.CommentDao;
import lakers.ingram.Dao.UserDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.CommentEntity;
import lakers.ingram.ModelEntity.UserEntity;
import net.sf.json.JSONObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.io.File;
import java.util.List;

@Repository("CommentDao")
@Transactional
class CommentDaoImpl implements CommentDao {

//评论
    public int save(CommentEntity comment){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        session.save(comment);
        session.getTransaction().commit();
        return 1;
    };//发表评论

    public void delete(int commentId){
        CommentEntity comment = new CommentEntity();
        comment.setCommentId(commentId);
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        session.delete(comment);
        session.getTransaction().commit();
    };//删除评论

    public int isValid(int commentId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select comment " +
                "from CommentEntity comment " +
                "where comment.commentId = :commentId");
        query.setParameter("commentId", commentId);
        @SuppressWarnings("unchecked")
        List<CommentEntity> commentList = query.list();
        session.getTransaction().commit();
        int valid = commentList.get(0).getValid();
        return 1;
    };//返回状态

    public int update(int commentId,int valid){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select comment " +
                "from CommentEntity comment " +
                "where comment.commentId = :commentId");
        query.setParameter("commentId", commentId);
        @SuppressWarnings("unchecked")
        List<CommentEntity> commentList = query.list();
        session.getTransaction().commit();
        CommentEntity comment = commentList.get(0);
        comment.setValid((byte) valid);
        save(comment);
        return valid;
    };//封禁，解禁

    public List<CommentEntity> GetCommentListByWindowId(int WindowId,byte valid){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select comment " +
                "from CommentEntity comment " +
                "where comment.windowId = :windowId " +
                "and comment.valid = :valid " +
                "order by comment.commentDate desc ");
        query.setParameter("windowId", WindowId);
        query.setParameter("valid", valid);
        @SuppressWarnings("unchecked")
        List<CommentEntity> commentList = query.list();
        session.getTransaction().commit();
        return commentList;
    };//拿到窗口的评论

    @Override
    public List<CommentEntity> showAllComments() {
        Session session = HibernateUtil.getSession();
        session.beginTransaction();

        Byte valid = 1;
        Query query = session.createQuery(
                "select comment " +
                        "from CommentEntity comment " +
                        "where comment.valid= :validState")
                .setParameter("validState", valid);

        @SuppressWarnings("unchecked")
        List<CommentEntity> comments = query.list();
        session.getTransaction().commit();
        return comments;
    }
}
