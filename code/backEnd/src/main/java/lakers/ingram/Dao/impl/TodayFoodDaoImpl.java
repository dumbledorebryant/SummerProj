package lakers.ingram.Dao.impl;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.GridFSFindIterable;
import com.mongodb.client.gridfs.model.GridFSFile;
import lakers.ingram.Dao.TodayFoodDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.TodayfoodEntity;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;

@Repository("TodayFoodDao")
@Transactional
public class TodayFoodDaoImpl implements TodayFoodDao
{
    @Override
    public List<Integer> showAllNews()
    {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase mongodb = mongoClient.getDatabase("Worker");
        GridFSBucket bucket = GridFSBuckets.create(mongodb);
        GridFSFindIterable gridFSFindIterable = bucket.find();
        Iterator iter =gridFSFindIterable.iterator();
        List<Integer> windowIDs = new ArrayList<>();
        while(iter.hasNext()) {
            GridFSFile gridFSFile = (GridFSFile)iter.next();
            windowIDs.add(Integer.valueOf(gridFSFile.getFilename()));
        }
        return windowIDs;
    }

    @Override
    public void getNewPic(int windowID, OutputStream out)
    {
        MongoClientURI connectionString = new MongoClientURI(
                "mongodb://ingram:14" +
                        "@localhost:27017/Worker?authSource=admin");
        MongoClient mongoClient = new MongoClient(connectionString);
        String windowId = String.valueOf(windowID);
        MongoDatabase mongodb = mongoClient.getDatabase("Worker");
        GridFSBucket bucket = GridFSBuckets.create(mongodb);
        bucket.downloadToStream(windowId, out);
        mongoClient.close();
    }

    public void addNewTodayFood(Integer foodId,Integer windowId){
        Session session= HibernateUtil.getSession();
        session.beginTransaction();
        Integer time=0;
        java.sql.Date currentDate = new java.sql.Date(System.currentTimeMillis());
        Calendar cal=Calendar.getInstance();
        int hour=cal.get(Calendar.HOUR_OF_DAY);
        if(hour>9 && hour<=13){
            time=1;
        }
        if(hour>13 && hour<20){
            time=2;
        }
        TodayfoodEntity newFood=new TodayfoodEntity(foodId,currentDate,time,windowId);
        session.save(newFood);
        session.getTransaction().commit();
    }


    public FoodEntity addFoodNew(String foodName, Double foodPrice, String foodTip,Integer windowID){
        Session session= HibernateUtil.getSession();
        session.beginTransaction();
        FoodEntity food=new FoodEntity(foodName,foodPrice,foodTip,0,windowID);
        session.save(food);
        Query query = session.createQuery("select a from FoodEntity  a where a.foodName= :foodName").
                setParameter("foodName", foodName);
        FoodEntity newFood=(FoodEntity) query.uniqueResult();
        session.getTransaction().commit();
        return newFood;
    }

    public void deleteAllTodayFoodByWindowId(Integer windowId){
        Session session= HibernateUtil.getSession();
        session.beginTransaction();
        Integer time=0;
        java.sql.Date currentDate = new java.sql.Date(System.currentTimeMillis());
        Calendar cal=Calendar.getInstance();
        int hour=cal.get(Calendar.HOUR_OF_DAY);
        if(hour>9 && hour<=13){
            time=1;
        }
        if(hour>13 && hour<20){
            time=2;
        }
        Query query2 = session.createQuery("select a from TodayfoodEntity a " +
                "where a.windowId = :windowId and a.time=:time").
                setParameter("windowId", windowId).setParameter("time",time);
        if(query2.list().size()>0){
            Query query = session.createQuery("delete from TodayfoodEntity a " +
                    "where a.windowId = :windowId and a.time=:time").
                    setParameter("windowId", windowId).setParameter("time",time);
            query.executeUpdate();
        }
        session.getTransaction().commit();
    }
}
