package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.FoodDao;
import lakers.ingram.Dao.ViewHistoryDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.ViewhistoryEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
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

    public JSONArray getViewHistory(Integer userId){
        Session session= HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        Query query1 = session.createQuery("select a from ViewhistoryEntity a where a.userId= :userID").
                setParameter("userID", userId);
        List<ViewhistoryEntity> list1 = query1.list();
        JSONArray jsonArray = new JSONArray();
        for(int i=0;i<list1.size();i++){
            Query query2 = session.createQuery("select a from WindowEntity a where a.windowId= :windowId").
                    setParameter("windowId", list1.get(i).getWindowId());
            WindowEntity window=(WindowEntity) query2.uniqueResult();
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("windowId", list1.get(i).getWindowId());
            jsonObject.put("count", list1.get(i).getCount());
            jsonObject.put("windowName", window.getWindowName());
            jsonObject.put("restaurant", window.getRestaurant());
            jsonObject.put("floor", window.getFloor());
            jsonArray.add(jsonObject);
        }
        transaction.commit();
        return jsonArray;
    }
    public String updateViewHistory(Integer userId,JSONArray deleteId){
        System.out.println("jsonWin:"+deleteId);
        Session session= HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        for(int i=0;i<deleteId.size();i++){
            Integer windowId=Integer.parseInt(deleteId.getString(i));
            Query query = session.createQuery("delete from ViewhistoryEntity a where a.userId= :userid " +
                    "and a.windowId=:windowId").
                    setParameter("userid", userId).setParameter("windowId",windowId);
            query.executeUpdate();
        }
        transaction.commit();
        return "success";
    }


}
