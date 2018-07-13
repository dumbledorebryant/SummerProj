package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.FoodDao;
import lakers.ingram.Dao.ViewHistoryDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.ViewhistoryEntity;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository("ViewHistoryDao")
@Transactional
class ViewHistoryDaoImpl implements ViewHistoryDao {

    @Override
    public void save(ViewhistoryEntity view){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        session.save(view);
        session.getTransaction().commit();
    };

    public void update(ViewhistoryEntity view){
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        session.update(view);
        session.getTransaction().commit();
    };

    public ViewhistoryEntity select(int userId, int windowId) {
        Session session=HibernateUtil.getSession();
        session.beginTransaction();
        Query query =session.createQuery("select viewhistory " +
                "from ViewhistoryEntity viewhistory " +
                "where viewhistory.userId= :userId " +
                "and viewhistory.windowId= :windowId");
        query.setParameter("userId", userId);
        query.setParameter("windowId", windowId);
        @SuppressWarnings("unchecked")
        List<ViewhistoryEntity> viewhistorys = query.list();
        session.getTransaction().commit();
        return viewhistorys.size()>0?viewhistorys.get(0):null;
    }


}
