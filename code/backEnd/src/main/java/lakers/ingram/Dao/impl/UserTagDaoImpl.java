package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.UserTagDao;
import lakers.ingram.ModelEntity.TagEntity;

import lakers.ingram.ModelEntity.UsertagEntity;
import net.sf.json.JSONArray;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UserTagDaoImpl implements UserTagDao{
    public JSONArray listUserTag(Integer name)
    {
        Session session = lakers.ingram.HibernateUtil.HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        Query query1 = session.createQuery("select a from UsertagEntity a where a.userId= :id").
                setParameter("id", name);
        List<UsertagEntity> list = query1.list();
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(list);
        transaction.commit();
        return jsonArray;
    }

    public String chooseUserTag(Integer userid,String[] tagArray){
        Session session = lakers.ingram.HibernateUtil.HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        Boolean tasteFlag=true;
        Boolean countryFlag=true;
        Boolean tabooFlag=true;
        Query query1 = session.createQuery("select a from UsertagEntity a where a.userId= :userid").
                setParameter("userid", userid);
        List<UsertagEntity> list=query1.list();
        for (int i=0;i<list.size();i++){
            Integer tagID=list.get(i).getTagId();
            Query query2 = session.createQuery("select a from TagEntity a where a.tagId= :userid").
                    setParameter("userid", userid);

        }
        for(int i=0;i<tagArray.length;i++){
            Query query = session.createQuery("select a from TagEntity a where a.tagName= :name").
                    setParameter("name", tagArray[i]);
            TagEntity tag=(TagEntity)query.uniqueResult();
            String tagType=tag.getTagType();
            if(tagType.equals("taste")&&tasteFlag){

            }
        }
        return "success";
    }


    private final static boolean isNumeric(String s) {
        if (s != null && !"".equals(s.trim()))
            return s.matches("^[0-9]*$");
        else
            return false;
    }

    public String sendTags(Integer userid,JSONArray tagArray){
        Session session = lakers.ingram.HibernateUtil.HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        Integer idx=tagArray.size()-1;
        Integer arrayFinal=tagArray.size();
        Integer tagID;
        String judge =tagArray.getString(idx);
        Query query = session.createQuery("delete from UsertagEntity a where a.userId= :userid").
                setParameter("userid", userid);
        query.executeUpdate();
        if(!isNumeric(judge)){
            TagEntity newTag=new TagEntity(tagArray.getString(idx-1),tagArray.getString(idx));
            session.save(newTag);
            Query query2 = session.createQuery("select a from TagEntity a where a.tagName= :tagName").
                    setParameter("tagName", tagArray.getString(idx));
            TagEntity tag=(TagEntity)query2.uniqueResult();
            System.out.println("new ID:"+tag.getTagId());
            UsertagEntity personalTag=new UsertagEntity(tag.getTagId(),userid);
            session.save(personalTag);
            arrayFinal=arrayFinal-2;
        }


        for(int i=0;i<arrayFinal;i++)
        {
            tagID=Integer.parseInt(tagArray.getString(i));
            System.out.println("new userTag:"+tagID);
            UsertagEntity newUserTag=new UsertagEntity(tagID,userid);
            session.save(newUserTag);
        }
        transaction.commit();
        return "success";
    }





    }

