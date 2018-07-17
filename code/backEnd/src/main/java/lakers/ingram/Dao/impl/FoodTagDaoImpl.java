package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.FoodTagDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.TagEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository("FoodTagDao")
@Transactional
public class FoodTagDaoImpl implements FoodTagDao {

    public List<Integer> getFoodsByTagId(int tagId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select foodTag.foodId " +
                "from FoodtagEntity foodTag where foodTag.tagId= :id").setParameter("id",tagId);
        @SuppressWarnings("unchecked")
        List<Integer> foodId=query.list();
        session.getTransaction().commit();
        return foodId;
    }

    public List<TagEntity> getTagByFoodId(int foodId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select Tag " +
                "from TagEntity Tag where Tag.tagId in " +
                "(select FoodTag.tagId from FoodtagEntity FoodTag " +
                "where FoodTag.foodId= :foodId )").setParameter("foodId",foodId);
        @SuppressWarnings("unchecked")
        List<TagEntity> Tags=query.list();
        session.getTransaction().commit();
        return Tags;
    };

    public List<TagEntity> getAllTags(){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select Tag " +
                "from TagEntity Tag " +
                "group by tagType");
        @SuppressWarnings("unchecked")
        List<TagEntity> Tags=query.list();
        session.getTransaction().commit();
        return Tags;
    };

   /* public List<Integer> getFoodsByTags(Array tagIdList){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select foodTag.foodId " +
                "from FoodtagEntity foodTag where foodTag.tagId in :tagIdList").setParameter("tagIdList",tagIdList);
        @SuppressWarnings("unchecked")
        List<Integer> foodId=query.list();
        session.getTransaction().commit();
        return foodId;
    }
*/
}
