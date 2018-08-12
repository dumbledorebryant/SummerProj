package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.DataDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.DataEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import javax.xml.crypto.Data;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

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

    public List<DataEntity> getHistoryDataByDate(Timestamp date, int windowId, long period){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        long time=date.getTime();
        //time=time-86400000;
        time=time-period;
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

    public DataEntity getCurrentHistoryDataByDate(Timestamp date, int windowId, long period){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        long time=date.getTime();
        //time=time-86400000;
        time =time-period;
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

    public ArrayList<JSONArray> getWrapDataByDateAndWindow(Timestamp date, int p, int windowId){
        ArrayList<JSONArray> res=new ArrayList<>();
        long time1, time2;
        long period = 7L * 24L * 60L * 60L * 1000L;
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String day = df.format(date).substring(0,10);
        day += " 00:00:00.00";
        System.out.println(day);
        long time =Timestamp.valueOf(day).getTime() - period;
        System.out.println(time);
        if (p == 0){
            time1 = time + 60*60*7*1000;
            time2 = time + 60*60*10*1000;
        }
        else if (p == 1){
            time1 = time + 60*60*11*1000;
            time2 = time + 60*60*14*1000;
            System.out.println(df.format(time1));
            System.out.println(df.format(time2));
        }
        else if (p == 2){
            time1 = time + 60*60*17*1000;
            time2 = time + 60*60*20*1000;
        }
        else return res;
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        for (int i=0;i<16;i++) {
            Query query = session.createQuery("select data from DataEntity data " +
                    "where data.windowId = :id and data.date < :dt and data.date >= :ds order by date desc")
                    .setParameter("id", windowId)
                    .setParameter("dt", new Timestamp(time2))
                    .setParameter("ds", new Timestamp(time1));

            @SuppressWarnings("unchecked")
            List<DataEntity> dl = query.list();
            if (dl.size()>0){
                res.add(JSONArray.fromObject(dl));
            }
            else{
                res.add(null);
            }
            time1 -= period;
            time2 -= period;
        }
        return res;
    }

}
