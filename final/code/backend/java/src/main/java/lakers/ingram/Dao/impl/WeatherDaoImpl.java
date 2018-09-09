package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.WeatherDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.WeatherEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

@Repository
@Transactional
public class WeatherDaoImpl implements WeatherDao {
    public List<WeatherEntity> getWeatherByTime(Timestamp date){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        long time = 112L * 60L * 60L * 24L * 1000L;
        Query query =session.createQuery("select data from WeatherEntity data " +
                "where data.date <= :dt and data.date >= :ds order by date asc")
                .setParameter("dt",date)
                .setParameter("ds",new Timestamp(date.getTime()-time));
        @SuppressWarnings("unchecked")
        List<WeatherEntity> ds= query.list();
        session.getTransaction().commit();
        return ds;
    }
}
