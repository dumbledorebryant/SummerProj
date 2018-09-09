package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.AdminDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.AdminEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository("AdminDao")
@Transactional
public class AdminDaoImpl implements AdminDao {
    public AdminEntity getAdminById(int id){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select admin " +
                "from AdminEntity admin " +
                "where admin.adminId= :id");
        query.setParameter("id", id);
        @SuppressWarnings("unchecked")
        List<AdminEntity> admins = query.list();
        session.getTransaction().commit();
        AdminEntity admin = admins.size() > 0 ? admins.get(0) : null;
        return admin;
    }
}
