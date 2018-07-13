package lakers.ingram.Dao.impl;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import lakers.ingram.Dao.TodayFoodDao;
import org.bson.Document;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

@Repository("TodayFoodDao")
@Transactional
public class TodayFoodDaoImpl implements TodayFoodDao
{
    @Override
    public List<Integer> showAllNews()
    {
        MongoClientURI connectionString = new MongoClientURI(
                "mongodb://ingram:14" +
                        "@localhost:27017/" +
                        "?authSource=SummerProj");
        MongoClient mongoClient = new MongoClient(connectionString);

        MongoDatabase mongodb = mongoClient.getDatabase("SummerProj");
        MongoCollection<Document> collection = mongodb.getCollection("MenuList");
        FindIterable<Document> result = collection.find();

        List<Integer> windowIDs = new ArrayList<>();
        for (Document cur : result) {
            String ID = (String) cur.get("windowID");
            Integer windowID = Integer.valueOf(ID);
            windowIDs.add(windowID);
        }
        return windowIDs;
    }

    @Override
    public void getNewPic(int windowID, OutputStream out)
    {
        String windowId = String.valueOf(windowID);

        MongoClientURI connectionString = new MongoClientURI(
                "mongodb://ingram:14" +
                        "@localhost:27017/" +
                        "?authSource=SummerProj");
        MongoClient mongoClient = new MongoClient(connectionString);
        MongoDatabase mongodb = mongoClient.getDatabase("SummerProj");

        GridFSBucket bucket = GridFSBuckets.create(mongodb);

        // test
        try
        {
            // test
            String path = "C:\\webImages\\IMG_5462.JPG";
            File imageFile = new File(path);
            InputStream inputFile = new FileInputStream(imageFile);
            bucket.uploadFromStream(windowId, inputFile);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        bucket.downloadToStream(windowId, out);
    }
}
