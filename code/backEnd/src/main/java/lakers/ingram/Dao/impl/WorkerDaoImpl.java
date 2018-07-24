package lakers.ingram.Dao.impl;


import com.mongodb.Block;
import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;

import com.mongodb.client.gridfs.GridFSFindIterable;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.model.Filters;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;


import com.mongodb.gridfs.GridFSInputFile;
import lakers.ingram.Dao.WorkerDao;
import lakers.ingram.HibernateUtil.HibernateUtil;

import lakers.ingram.ModelEntity.WorkerEntity;
import org.bson.types.ObjectId;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;

@Repository("WorkerDao")
@Transactional
public class WorkerDaoImpl implements WorkerDao {
    public WorkerEntity getWorkerById(int id){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select worker " +
                "from WorkerEntity worker " +
                "where worker.windowId= :id");
        query.setParameter("id", id);
        @SuppressWarnings("unchecked")
        List<WorkerEntity> workers = query.list();
        session.getTransaction().commit();
        WorkerEntity worker = workers.size() > 0 ? workers.get(0) : null;
        return worker;
    }

    public String newFoodPic(File imageFile, String windowid){
        MongoClientURI connectionString = new MongoClientURI(
                "mongodb://ingram:14" +
                        "@localhost:27017/Worker?authSource=admin");
        MongoClient mongoClient = new MongoClient(connectionString);
        MongoDatabase mongodb = mongoClient.getDatabase("Worker");
        GridFSBucket bucket = GridFSBuckets.create(mongodb);
        try {
            InputStream inputFile = new FileInputStream(imageFile);
            bucket.uploadFromStream(windowid, inputFile);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            mongoClient.close();
            return "Success";
        }

    }
}
