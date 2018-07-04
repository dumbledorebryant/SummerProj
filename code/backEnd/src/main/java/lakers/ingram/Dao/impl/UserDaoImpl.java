package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.UserDao;
import lakers.ingram.ModelEntity.UserEntity;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Repository("UserDao")
@Transactional
class UserDaoImpl extends HibernateDaoSupport implements UserDao {
    public Integer save(UserEntity user) {
        return (Integer) getHibernateTemplate().save(user);
    }

    public void delete(UserEntity user) {
        getHibernateTemplate().delete(user);
    }

    public void update(UserEntity user) {
        getHibernateTemplate().merge(user);
    }

    public UserEntity getUserById(int id) {
        @SuppressWarnings("unchecked")
        List<UserEntity> users = (List<UserEntity>) getHibernateTemplate().find(
                "from user as u where u.id=?", id);
        UserEntity user = users.size() > 0 ? users.get(0) : null;
        return user;
    }

    public UserEntity getUserByName(String name){
        @SuppressWarnings("unchecked")
        List<UserEntity> users = (List<UserEntity>) getHibernateTemplate().find(
                "from user as u where u.username=?", name);
        UserEntity user = users.size() > 0 ? users.get(0) : null;
        return user;
    }

    public UserEntity getUserByPhone(String phone){
        @SuppressWarnings("unchecked")
        List<UserEntity> users = (List<UserEntity>) getHibernateTemplate().find(
                "from User as u where u.phone=?", phone);
        UserEntity user = users.size() > 0 ? users.get(0) : null;
        return user;
    }

    public List<UserEntity> getAllUsers() {
        @SuppressWarnings("unchecked")
        List<UserEntity> users = (List<UserEntity>) getHibernateTemplate()
                .find("from user");
        return users;
    }
}
