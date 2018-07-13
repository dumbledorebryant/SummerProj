package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.CommentEntity;
import lakers.ingram.ModelEntity.UserEntity;
import net.sf.json.JSONObject;

import java.io.File;
import java.util.List;

public interface CommentDao {

    public int save(CommentEntity comment);//发表评论

    public void delete(int commentId);//删除评论

    public int isValid(int commentId);//返回状态

    public int update(int commentId, int valid);//封禁，解禁

    public List<CommentEntity> GetCommentListByWindowId(int WindowId, byte valid);//拿到窗口的评论

    List<CommentEntity> showAllComments();
}



