package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.UserLikeFoodDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.UserlikefoodEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository("UserLikeFoodDao")
@Transactional
class UserLikeFoodDaoImpl implements UserLikeFoodDao {

    public boolean IsSave(int userId, int foodId) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select userlikefood " +
                "from UserlikefoodEntity userlikefood " +
                "where userlikefood.userId= :userId and " +
                "userlikefood.foodId= :foodId");
        query.setParameter("userId", userId);
        query.setParameter("foodId", foodId);
        @SuppressWarnings("unchecked")
        List<UserlikefoodEntity> UserLikeFood = query.list();
        session.getTransaction().commit();
        Boolean IsSave= UserLikeFood.size() > 0;
        return IsSave;
    };//是否已经收藏，是返回1，不是返回0

    public Integer save(UserlikefoodEntity userLikeFood, int foodId) {//收藏
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        session.save(userLikeFood);
        session.getTransaction().commit();

        session=HibernateUtil.getSession();
        session.beginTransaction();
       Query query = session.createQuery("select food " +
                "from FoodEntity food " +
                "where foodId = :foodId");
        query.setParameter("foodId", foodId);
        FoodEntity food = (FoodEntity) query.list().get(0);
        food.setLikes(food.getLikes()+1);
        session.save(food);
        session.getTransaction().commit();
        return 1;
    };

    public Integer delete(UserlikefoodEntity userLikeFood, int foodId) {//取消收藏
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        session.delete(userLikeFood);
        session.getTransaction().commit();

        session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query = session.createQuery("select food " +
                "from FoodEntity food " +
                "where foodId = :foodId");
        query.setParameter("foodId", foodId);
        FoodEntity food = (FoodEntity) query.list().get(0);
        food.setLikes(food.getLikes()-1);
     //   System.out.println(food.getLikes()-1);
        session.save(food);
        session.getTransaction().commit();
        return 0;
    };

    public List<FoodEntity> getFoodListByUserId(int userId) {//查看用户的收藏菜单
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select userlikefood " +
                "from UserlikefoodEntity userlikefood " +
                "where userlikefood.userId= :userId ");
        query.setParameter("userId", userId);
        @SuppressWarnings("unchecked")
        List<FoodEntity> foodList = query.list();
        session.getTransaction().commit();
        return foodList;
    };

    public int getCountUserByFoodId(int foodId){//统计每一道菜的收藏数目
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select userlikefood " +
                "from UserlikefoodEntity userlikefood " +
                "where userlikefood.foodId= :foodId ");
        query.setParameter("foodId", foodId);
        @SuppressWarnings("unchecked")
        int likeCount = query.list().size();
        session.getTransaction().commit();
        return likeCount;

    };

    public List<UserlikefoodEntity> getAllUserLikeFood(){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select userlikefood " +
                "from UserlikefoodEntity userlikefood ");
        @SuppressWarnings("unchecked")
        List<UserlikefoodEntity> userlikefoods = query.list();
        session.getTransaction().commit();
        return userlikefoods;
    };

}
