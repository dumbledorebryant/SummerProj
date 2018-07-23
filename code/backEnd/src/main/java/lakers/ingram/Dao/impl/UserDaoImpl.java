package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.UserDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.UserEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
import java.io.File;
import java.util.List;
import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSInputFile;

@Repository("UserDao")
@Transactional
class UserDaoImpl implements UserDao {

    public Integer save(UserEntity user) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        session.save(user);
        session.getTransaction().commit();
        session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =HibernateUtil.getSession().createQuery("select user " +
                "from UserEntity user " +
                "where user.username= :name");
        query.setParameter("name", user.getUsername());
        @SuppressWarnings("unchecked")
        UserEntity userr = (UserEntity)query.list().get(0);
        session.getTransaction().commit();
        return userr.getUserId();
    }

    public void delete(int[] userIDs) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        for (int id: userIDs){
            UserEntity user = getUserById(id);
            session.delete(user);
        }
        session.getTransaction().commit();
    }

    public void update(UserEntity user) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        session.update(user);
        session.getTransaction().commit();
    }

    public UserEntity getUserById(int id) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select user " +
                "from UserEntity user " +
                "where user.userId= :id");
        query.setParameter("id", id);
        @SuppressWarnings("unchecked")
        List<UserEntity> users = query.list();
        session.getTransaction().commit();
        UserEntity user = users.size() > 0 ? users.get(0) : null;
        return user;
    }

    public UserEntity getUserByName(String name){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select user " +
                "from UserEntity user " +
                "where user.username= :name");
        query.setParameter("name", name);
        @SuppressWarnings("unchecked")
        List<UserEntity> users = query.list();
        session.getTransaction().commit();
        UserEntity user = users.size() > 0 ? users.get(0) : null;
        return user;
    }

    public UserEntity getUserByPhone(String phone){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query = session.createQuery("select user " +
                "from UserEntity user " +
                "where user.phone= :phone");
        query.setParameter("phone", phone);
        @SuppressWarnings("unchecked")
        List<UserEntity> users = query.list();
        session.getTransaction().commit();
        UserEntity user = users.size() > 0 ? users.get(0) : null;
        return user;
    }

    public List<UserEntity> getAllUsers() {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select user " +
                "from UserEntity user ");
        @SuppressWarnings("unchecked")
        List<UserEntity> users = query.list();

        session.getTransaction().commit();
        return users;
    }

    public JSONObject showUserInfo(Integer userID)
    {
        Session session=HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("select a from UserEntity a where a.userId= :id").
                setParameter("id", userID);
        UserEntity user=(UserEntity)query.uniqueResult();
        JSONObject userJson=new JSONObject().fromObject(user);
        System.out.println(userJson);
        transaction.commit();
        return userJson;
    }

    public String handleUserInfo(UserEntity user) throws Exception {
        Session session=HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        Query query = session.createQuery("select a from UserEntity a where a.userId= :id").
                setParameter("id", user.getUserId());
        UserEntity userDB=(UserEntity)query.uniqueResult();
        Query query2 = session.createQuery("select a from UserEntity a where a.username= :username").
                setParameter("username", user.getUsername());
        Query query3 = session.createQuery("select a from UserEntity a where a.phone= :phone").
                setParameter("phone", user.getPhone());
        if(query2.list().size()==1){
            if((((UserEntity) query2.uniqueResult()).getUserId())!=(userDB.getUserId())){
                transaction.commit();
                return "The name has been used!";
            }
        }
        if(query3.list().size()==1){
            System.out.println("phone1:"+((UserEntity) query3.uniqueResult()).getUserId());
            System.out.println("phone2:"+userDB.getUserId());
            if((((UserEntity) query3.uniqueResult()).getUserId())!=(userDB.getUserId())){
                transaction.commit();
                return "The phone has been used for register!";
            }
        }
        String pwd=user.getPassword();
        String encodePwd=lakers.ingram.encode.MD5Util.md5Encode(pwd);
        userDB.setEmail(user.getEmail());
        userDB.setPhone(user.getPhone());
        userDB.setUsername(user.getUsername());
        userDB.setPassword(encodePwd);
        session.update(userDB);
        System.out.println("email:"+user.getEmail());
        System.out.println("phone:"+user.getPhone());
        transaction.commit();
        return "success";
    }

    public String updatePic(File imgFile, Integer userid){
        MongoClient mongo = new MongoClient();
        DB mongodb = mongo.getDB("Portrait");
        try {
            GridFS gfsPhoto = new GridFS(mongodb, "Images");
            gfsPhoto.remove(gfsPhoto.findOne(userid.toString()));
            GridFSInputFile gfsFile = gfsPhoto.createFile(imgFile);
            gfsFile.setFilename(userid.toString());
            gfsFile.save();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            mongo.close();
            return "Success";
        }
    }

    @Override
    public void freeze(UserEntity user)
    {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();

        user.setValid((byte) 0);
        session.update(user);

        transaction.commit();
        session.close();
    }

    @Override
    public void activate(UserEntity user)
    {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();

        user.setValid((byte) 1);
        session.update(user);

        transaction.commit();
        session.close();
    }
}
