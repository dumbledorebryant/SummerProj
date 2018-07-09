package lakers.ingram.Dao.impl;


import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;
import lakers.ingram.Dao.WorkerDao;
import lakers.ingram.HibernateUtil.HibernateUtil;

import lakers.ingram.ModelEntity.WorkerEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.io.File;
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
        MongoClient mongo = new MongoClient();
        DB mongodb = mongo.getDB("Food");
        try {
            GridFS gfsPhoto = new GridFS(mongodb, "Images");
            GridFSDBFile imageForOutput = gfsPhoto.findOne(windowid);
            if (imageForOutput!=null){
                gfsPhoto.remove(gfsPhoto.findOne(windowid));
            }
            GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile);
            gfsFile.setFilename(windowid);
            gfsFile.save();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            mongo.close();
            return "Success";
        }

    }
}
