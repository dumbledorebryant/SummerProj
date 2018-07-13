package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.UserLikeFoodDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.UserlikefoodEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
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

    public JSONArray searchUserLike(Integer userID) {
        Session session=HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        Query query1 = session.createQuery("select a from UserlikefoodEntity a where a.userId= :userID").
                setParameter("userID", userID);
        List<UserlikefoodEntity> list = query1.list();
        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < list.size(); i++) {
            Integer foodId = list.get(i).getFoodId();
            Query query2 = session.createQuery("select a from FoodEntity a where a.foodId= :foodID").
                    setParameter("foodID", foodId);
            FoodEntity food = (FoodEntity) query2.uniqueResult();
            String foodName = food.getFoodName();
            Query query3 = session.createQuery("select a from WindowEntity  a where a.windowId= :windowID").
                    setParameter("windowID", food.getWindowId());
            WindowEntity window = (WindowEntity) query3.uniqueResult();
            String windowName = window.getWindowName();
            String restaurant = window.getRestaurant();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("foodId", foodId);
            jsonObject.put("foodName", foodName);
            jsonObject.put("windowName", windowName);
            jsonObject.put("restaurant", restaurant);
            jsonArray.add(jsonObject);
        }
        transaction.commit();
        return jsonArray;
    }

    public String updateUserLike(Integer userID,Integer foodID,Integer flag) {
        Session session=HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        if (flag == 0) {
            Query query = session.createQuery("delete from UserlikefoodEntity a where a.userId= :userid " +
                    "and a.foodId=:foodid").
                    setParameter("userid", userID).setParameter("foodid", foodID);
            query.executeUpdate();
        } else {
            Query query2 = session.createQuery("select a from UserlikefoodEntity a where a.userId= :userid " +
                    "and a.foodId=:foodid").
                    setParameter("userid", userID).setParameter("foodid", foodID);
            if (query2.list().size() == 0) {
                UserlikefoodEntity newUserLike = new UserlikefoodEntity();
                newUserLike.setFoodId(foodID);
                newUserLike.setUserId(userID);
                session.save(newUserLike);
            }
        }
        transaction.commit();
        return "success";
    }


}
