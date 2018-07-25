package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.FoodTagDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.FoodtagEntity;
import lakers.ingram.ModelEntity.TagEntity;
import net.sf.json.JSONArray;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

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

    public List<FoodEntity> getFoodsByTags(List<Integer> tagIdList,List<FoodEntity> Food){
        if(Food.size()==0||tagIdList.size()==0)return null;
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query1 =session.createQuery("select food.foodId " +
                "from FoodtagEntity food " +
                "where food.tagId in :tagIdList");
        query1.setParameter("tagIdList", tagIdList);
        @SuppressWarnings("unchecked")
        List<Integer> list1 = query1.list();
        if(list1.size()==0){ session.getTransaction().commit();return null;}
        Query query2 =session.createQuery("select food " +
                "from FoodEntity food " +
                "where food.foodId in :foodIdList");
        query2.setParameter("foodIdList", list1);
        @SuppressWarnings("unchecked")
        List<FoodEntity> list2 = query2.list();
        if(list2.size()==0){ session.getTransaction().commit();return null;}

        Query query3 = session.createQuery("select food " +
                "from FoodEntity food " +
                "where food in :Food and food in :list2");
        query3.setParameter("Food", Food);
        query3.setParameter("list2", list2);
        @SuppressWarnings("unchecked")
        List<FoodEntity> list3 = query3.list();
        if(list3.size()==0){ session.getTransaction().commit();return null;}
        session.getTransaction().commit();
        return list3;
    }

    public JSONArray allFoodTags(){
        Session session= HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        Set<Integer> tagSet=new TreeSet<>();
        Query query =session.createQuery("select a " +
                "from FoodtagEntity a ");
        for(int i=0;i<query.list().size();i++){
            tagSet.add(((FoodtagEntity)query.list().get(i)).getTagId());
        }
        JSONArray jsonArray=new JSONArray();
        for(Integer tagId:tagSet){
            Query query2 =session.createQuery("select a " +
                    "from TagEntity a " +
                    "where a.tagId=:tagId").setParameter("tagId",tagId);
            TagEntity tag=(TagEntity) query2.uniqueResult();
            jsonArray.add(tag);
        }
        transaction.commit();
        return jsonArray;
    }

    public void addFoodTag(Integer foodId,int[] tags){
        Session session= HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        for(Integer tagId:tags){
            FoodtagEntity foodTag=new FoodtagEntity(tagId,foodId);
            session.save(foodTag);
        }

        transaction.commit();
    }
}
