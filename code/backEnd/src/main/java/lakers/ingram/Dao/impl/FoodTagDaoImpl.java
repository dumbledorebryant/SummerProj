package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.FoodTagDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
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
}
