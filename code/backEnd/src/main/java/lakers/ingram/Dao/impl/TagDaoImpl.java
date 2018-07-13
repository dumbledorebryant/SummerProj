package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.TagDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.TagEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TagDaoImpl implements TagDao {
    public JSONArray showTags(){
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("select a from TagEntity a");
        List<TagEntity> list=query.list();
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(list);
        System.out.println("all"+jsonArray);
        transaction.commit();
        return jsonArray;
    }

    public JSONObject showTags(String tagName)
    {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("select a from TagEntity a where a.tagName= :name").
                setParameter("name", tagName);
        TagEntity tag=(TagEntity) query.uniqueResult();
        JSONObject object=JSONObject.fromObject(tag);
        System.out.println("new object:"+object);
        session.getTransaction().commit();
        return object;
    }

    public List<TagEntity> getTagByLikeName(String tagName){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select tag from TagEntity tag where tag.tagName like :name")
                .setParameter("name","%"+tagName+"%");
        @SuppressWarnings("unchecked")
        List<TagEntity> lst=query.list();
        session.getTransaction().commit();
        return lst;
    }
}
