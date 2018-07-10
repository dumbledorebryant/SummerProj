package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.FoodDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository("FoodDao")
@Transactional
class FoodDaoImpl implements FoodDao {

    @Override
    public List<FoodEntity> getAllFood() {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select food " +
                "from FoodEntity food " +
                "where foodId in (select foodId from TodayfoodEntity todayfood) " +
                "order by food.likes desc, windowId");
        @SuppressWarnings("unchecked")
        List<FoodEntity> foods = query.list();
        session.getTransaction().commit();
        return foods;
    }

    @Override
    public List<FoodEntity> getAllFoodByRestaurant(String restaurant) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select food " +
                "from FoodEntity food " +
                "where foodId in (select foodId from TodayfoodEntity todayfood " +
                "where food.windowId in " +
                "(select distinct window.windowId from WindowEntity window where " +
                "window.restaurant = :restaurant)) " +
                "order by food.likes desc,food.windowId ");
        query.setParameter("restaurant", restaurant);
        @SuppressWarnings("unchecked")
        List<FoodEntity> foods = query.list();
        session.getTransaction().commit();

        return foods;
    }

    @Override
    public List<FoodEntity> getAllFoodByRestaurantAndFloor(String restaurant, int floor) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select food " +
                "from FoodEntity food " +
                "where foodId in (select foodId from TodayfoodEntity todayfood " +
                "where windowId in " +
                "(select distinct windowId from WindowEntity window where " +
                "window.restaurant = :restaurant and window.floor = :floor ))" +
                "order by likes desc,windowId ");
        query.setParameter("restaurant", restaurant);
        query.setParameter("floor", floor);
        @SuppressWarnings("unchecked")
        List<FoodEntity> foods = query.list();
        session.getTransaction().commit();
        return foods;
    }


    @Override
    public List<FoodEntity> getAllFoodByWindowid(int window_id) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select food " +
                "from FoodEntity food " +
                "where foodId in (select foodId from TodayfoodEntity todayfood " +
                "where windowId = :windowId) " +
                "order by likes desc ");
        query.setParameter("windowId", window_id);
        @SuppressWarnings("unchecked")
        List<FoodEntity> foods = query.list();
        session.getTransaction().commit();
        return foods;
    }

    @Override
    public String getWindowNameByFoodId(int foodId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();

        Query query =session.createQuery("select windowName " +
                "from WindowEntity window " +
                "where windowId in (select windowId from FoodEntity food  " +
                "where foodId = :foodId) ");
        query.setParameter("foodId", foodId);
        @SuppressWarnings("unchecked")
        List<String> windowNames = query.list();
        session.getTransaction().commit();
       String windowName = windowNames.size() > 0 ? windowNames.get(0) : null;
        return windowName;
    }
}
