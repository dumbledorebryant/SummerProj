package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.DataDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.DataEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import javax.xml.crypto.Data;
import java.sql.Timestamp;
import java.util.List;

@Repository("DataDao")
@Transactional
public class DataDaoImpl implements DataDao {
    public List<DataEntity> getInitDataByDate(Timestamp date, int windowId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select data from DataEntity data " +
                "where data.windowId = :id and data.date <= :dt and data.date >= :ds order by date asc")
                .setParameter("id",windowId)
                .setParameter("dt",date)
                .setParameter("ds",new Timestamp(date.getTime()-1800000));
        @SuppressWarnings("unchecked")
        List<DataEntity> ds= query.list();
        session.getTransaction().commit();
        return ds;
    }

    public DataEntity getCurrentData(int windowId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query = session.createQuery("select data from DataEntity data " +
                "where data.windowId = :id order by date desc").setParameter("id",windowId);
        @SuppressWarnings("unchecked")
        DataEntity d= (DataEntity)query.list().get(0);
        session.getTransaction().commit();
        return d;
    }

    public List<DataEntity> getHistoryDataByDate(Timestamp date, int windowId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        long time=date.getTime();
        time=time-86400000;
        Query query =session.createQuery("select data from DataEntity data " +
                "where data.windowId = :id and data.date <= :dt and data.date >= :ds order by date asc")
                .setParameter("id",windowId)
                .setParameter("dt",new Timestamp(time+1800000))
                .setParameter("ds",new Timestamp(time-1800000));
        @SuppressWarnings("unchecked")
        List<DataEntity> ds= query.list();
        session.getTransaction().commit();
        return ds;
    }

    public DataEntity getCurrentHistoryDataByDate(Timestamp date, int windowId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        long time=date.getTime();
        time=time-86400000;
        Query query =session.createQuery("select data from DataEntity data " +
                "where data.windowId = :id and data.date <= :dt and data.date >= :ds order by date desc")
                .setParameter("id",windowId)
                .setParameter("dt",new Timestamp(time+1800000))
                .setParameter("ds",new Timestamp(time+1800000-120000));
        @SuppressWarnings("unchecked")
        List<DataEntity> dl= query.list();
        DataEntity dt= dl.size()> 0 ? dl.get(0):null;
        session.getTransaction().commit();
        return dt;
    }
}
