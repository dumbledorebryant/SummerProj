package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.UserDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.UserEntity;
import net.sf.json.JSONObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;
import java.util.List;

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

    public void delete(UserEntity user) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        session.delete(user);
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
        String pwd=user.getPassword();
        String encodePwd=lakers.ingram.encode.MD5Util.md5Encode(pwd);

        userDB.setEmail(user.getEmail());
        userDB.setPhone(user.getPhone());
        userDB.setUsername(user.getUsername());
        userDB.setPassword(encodePwd);

        session.update(userDB);
        transaction.commit();
        return "success";
    }

}
