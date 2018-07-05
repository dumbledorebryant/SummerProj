package lakers.ingram.Dao.impl;


import lakers.ingram.Dao.WorkerDao;
import lakers.ingram.HibernateUtil.HibernateUtil;

import lakers.ingram.ModelEntity.WorkerEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
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
}
