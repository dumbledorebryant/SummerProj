package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.UserTagDislikeDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.TagEntity;
import lakers.ingram.ModelEntity.UsertagdislikeEntity;
import net.sf.json.JSONArray;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.hibernate.query.Query;

@Repository
@Transactional
public class UserTagDislikeDaoImpl implements UserTagDislikeDao{
    public String updateUserDislikeTag(Integer userId,JSONArray dislikeTags)
    {
        Session session= HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        for(int i=0;i<dislikeTags.size();i++){
            String tagName=dislikeTags.getString(i);
            Query query1 = session.createQuery("select a from TagEntity a " +
                    "where a.tagName= :tagName").
                    setParameter("tagName", tagName);
            Integer tagId= ((TagEntity) query1.uniqueResult()).getTagId();
            Query query2 = session.createQuery("select a from UsertagdislikeEntity a " +
                    "where a.userId= :userId and a.tagId= :tagId").
                    setParameter("userId", userId).setParameter("tagId",tagId);
            if(query2.list().size()==0){
                UsertagdislikeEntity usertagdislike=new UsertagdislikeEntity(userId,tagId);
                session.save(usertagdislike);
            }
            else{
                UsertagdislikeEntity usertagdislike=(UsertagdislikeEntity)query2.uniqueResult();
                Integer count=usertagdislike.getDislikeCount()+1;
                usertagdislike.setDislikeCount(count);

            }
        }
        transaction.commit();
        return "success";
    }
}
