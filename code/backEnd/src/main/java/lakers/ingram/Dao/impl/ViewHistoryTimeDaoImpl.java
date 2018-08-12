package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.ViewHistoryTimeDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.ViewhistorytimeEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Repository
@Transactional
public class ViewHistoryTimeDaoImpl implements ViewHistoryTimeDao {
    public List<ViewhistorytimeEntity> getViewHistoryByTimeAndWindow(Timestamp date, int windowId){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        long time = 112L * 60L * 60L * 24L * 1000L;
        Query query =session.createQuery("select data from ViewhistorytimeEntity data " +
                "where data.windowId = :id and data.time <= :dt and data.time >= :ds order by time asc")
                .setParameter("id",windowId)
                .setParameter("dt",date)
                .setParameter("ds",new Timestamp(date.getTime()-time));
        @SuppressWarnings("unchecked")
        List<ViewhistorytimeEntity> ds= query.list();
        session.getTransaction().commit();
        return ds;
    }
}
