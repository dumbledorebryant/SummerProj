package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.WindowLikeTimeDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.DataEntity;
import lakers.ingram.ModelEntity.WindowliketimeEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public class WindowLikeTimeDaoImpl implements WindowLikeTimeDao {
    public List<WindowliketimeEntity> getWindowLikeByTimeAndWindow(Timestamp date, int windowId, int period){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        long time = 112L * 60L * 60L * 24L * 1000L;
        Query query =session.createQuery("select data from WindowliketimeEntity data " +
                "where data.windowId = :id and data.time <= :dt " +
                "and data.time >= :ds and data.period = :period order by time asc")
                .setParameter("id",windowId)
                .setParameter("dt",date)
                .setParameter("ds",new Timestamp(date.getTime()-time))
                .setParameter("period",period);
        @SuppressWarnings("unchecked")
        List<WindowliketimeEntity> ds= query.list();
        session.getTransaction().commit();
        return ds;
    }
}
