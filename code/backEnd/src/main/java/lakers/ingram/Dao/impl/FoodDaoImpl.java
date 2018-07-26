package lakers.ingram.Dao.impl;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import lakers.ingram.Dao.FoodDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

    public List<FoodEntity> getAllFoodByLikeStr(String str){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query= session.createQuery("select food f" +
                "rom FoodEntity food where food.foodName like :name or food.tips like :tip")
                .setParameter("name","%"+str+"%").setParameter("tip","%"+str+"%");
        @SuppressWarnings("unchecked")
        List<FoodEntity> lst=query.list();
        session.getTransaction().commit();
        return lst;
    }

    public Integer getWindowIdByFoodIdAndTime(int foodId, int time){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query= session.createQuery("select food.windowId " +
                "from TodayfoodEntity food where food.foodId= :id and food.time= :time")
                .setParameter("id",foodId).setParameter("time",time);
        @SuppressWarnings("unchecked")
        List<Integer> lst=query.list();
        Integer id=lst.size()>0 ? lst.get(0):null;
        session.getTransaction().commit();
        return id;
    }

    public FoodEntity getFoodById(int foodId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query= session.createQuery("select food from FoodEntity food where food.foodId= :id")
                .setParameter("id",foodId);
        @SuppressWarnings("unchecked")
        List<FoodEntity> foods=query.list();
        session.getTransaction().commit();
        return foods.size()>0?foods.get(0):null;
    }

    @Override
    public JSONArray getFoodId_NameByWindowID(int windowID)
    {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();

        Query query = session.createQuery("select everyfood " +
                "from FoodEntity everyfood " +
                "where everyfood.windowId= :window_ID ")
                .setParameter("window_ID", windowID);

        @SuppressWarnings("unchecked")
        List<FoodEntity> foodList = query.list();
        JSONArray array=new JSONArray();
        JSONObject jsonObject =new JSONObject();

        Integer time=0;
        Calendar cal=Calendar.getInstance();
        int hour=cal.get(Calendar.HOUR_OF_DAY);
        if(hour>9 && hour<=13){
            time=1;
        }
        if(hour>13 && hour<20){
            time=2;
        }

        for(FoodEntity singleFood : foodList)
        {
            Integer foodID = singleFood.getFoodId();
            String foodName = singleFood.getFoodName();
            Integer flag=0;
            Query query2 = session.createQuery("select food " +
                    "from TodayfoodEntity food " +
                    "where food.foodId= :foodID and food.time=:time")
                    .setParameter("foodID", foodID).setParameter("time",time);
            if(query2.list().size()>0){
                flag=1;
            }
            jsonObject.put("foodId", foodID);
            jsonObject.put("foodName", foodName);
            jsonObject.put("flag", flag);
            array.add(jsonObject);
        }
        System.out.println("array:"+array);
        transaction.commit();
        session.close();
        return array;
    }


    public String uploadNewFoodPic(File imgFile, Integer foodID){
        MongoClientURI connectionString = new MongoClientURI(
                "mongodb://ingram:14" +
                        "@localhost:27017/Food?authSource=admin");
        MongoClient mongoClient = new MongoClient(connectionString);
        MongoDatabase mongodb = mongoClient.getDatabase("Food");
        GridFSBucket bucket = GridFSBuckets.create(mongodb);
        try {
            InputStream inputFile = new FileInputStream(imgFile);
            bucket.uploadFromStream(foodID.toString(), inputFile);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            mongoClient.close();
            return "Success";
        }
    }
}
