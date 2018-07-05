package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.UserDao;
import lakers.ingram.Dao.WindowDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.List;

@Repository("WindowDao")
@Transactional
class WindowDaoImpl implements WindowDao {

    public List<Integer> getFloorListByRestaurant(String restaurant){

        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select distinct window.floor " +
                "from WindowEntity window " +
                "where window.restaurant = :restaurant");
        query.setParameter("restaurant", restaurant);
        @SuppressWarnings("unchecked")

        List<Integer> floorList = query.list();
        session.getTransaction().commit();

        return floorList;
    };

    public List<WindowEntity> getAllWindowsByRestaurant(String restaurant){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select window " +
                "from WindowEntity window " +
                "where window.restaurant = :restaurant");
        query.setParameter("restaurant", restaurant);
        @SuppressWarnings("unchecked")
        List<WindowEntity> windows = query.list();
        session.getTransaction().commit();
        return windows;

    };

    public List<WindowEntity> getAllWindowsByRestaurantAndFloor(String restaurant, int floor){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select window " +
                "from WindowEntity window " +
                "where window.restaurant = :restaurant and window.floor = :floor");
        query.setParameter("restaurant", restaurant);
        query.setParameter("floor",floor);
        @SuppressWarnings("unchecked")
        List<WindowEntity> windows = query.list();
        session.getTransaction().commit();
        return windows;
    };

    public WindowEntity getWindowByRestaurantAndFloorAndName(String restaurant, int floor, String windowName){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select window " +
                "from WindowEntity window " +
                "where window.restaurant = :restaurant and " +
                "window.floor = :floor and " +
                "window.windowName = :windowName");

        query.setParameter("restaurant", restaurant);
        query.setParameter("floor",floor);
        query.setParameter("windowName",windowName);

        @SuppressWarnings("unchecked")
        List<WindowEntity> windows = query.list();
        session.getTransaction().commit();

        WindowEntity window = windows.size() > 0 ? windows.get(0) : null;

        return window;
    };

    public List<WindowEntity> getAllWindows(){

        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select window " +
                "from WindowEntity window ");
        @SuppressWarnings("unchecked")
        List<WindowEntity> windows = query.list();
        session.getTransaction().commit();
        return windows;

    };
}
