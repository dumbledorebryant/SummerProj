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
import org.bson.Document;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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
        String windowId = String.valueOf(windowID);
        MongoClient mongoClient = new MongoClient();
        MongoDatabase mongodb = mongoClient.getDatabase("Worker");
        GridFSBucket bucket = GridFSBuckets.create(mongodb);
        bucket.downloadToStream(windowId, out);
    }
}
