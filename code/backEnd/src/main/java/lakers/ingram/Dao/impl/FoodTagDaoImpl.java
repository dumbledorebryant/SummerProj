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

    public List<FoodEntity> getFoodsByTags(List<Integer> tagIdList,List<FoodEntity> Food){
        if(Food.size()==0||tagIdList.size()==0)return null;
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query1 =session.createQuery("select foodId " +
                "from FoodtagEntity food " +
                "where food.tagId in :tagIdList");
        query1.setParameter("tagIdList", tagIdList);
        List<Integer> list1 = query1.list();
        if(list1.size()==0){ session.getTransaction().commit();return null;}
        Query query2 =session.createQuery("select food " +
                "from FoodEntity food " +
                "where food.foodId in :foodIdList");
        query2.setParameter("foodIdList", list1);
        List<FoodEntity> list2 = query2.list();
        if(list2.size()==0){ session.getTransaction().commit();return null;}

        Query query3 = session.createQuery("select food " +
                "from FoodEntity food " +
                "where food in :Food and food in :list2");
        query3.setParameter("Food", Food);
        query3.setParameter("list2", list2);
        List<FoodEntity> list3 = query3.list();
        if(list3.size()==0){ session.getTransaction().commit();return null;}
        session.getTransaction().commit();
        return list3;
    }
}
