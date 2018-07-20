package lakers.ingram.Dao.impl;

import lakers.ingram.Dao.UserTagDao;
import lakers.ingram.HibernateUtil.HibernateUtil;
import lakers.ingram.ModelEntity.*;

import net.sf.json.JSONArray;

import net.sf.json.JSONObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;

@Repository
@Transactional
public class UserTagDaoImpl implements UserTagDao{
    public JSONArray listUserTag(Integer name)
    {
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        Query query1 = session.createQuery("select a from UsertagEntity a where a.userId= :id").
                setParameter("id", name);
        List<UsertagEntity> list = query1.list();
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(list);
        transaction.commit();
        return jsonArray;
    }

    private final static boolean isNumeric(String s) {
        if (s != null && !"".equals(s.trim()))
            return s.matches("^[0-9]*$");
        else
            return false;
    }

    public String sendTags(Integer userid,JSONArray tagArray){
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        Integer arrayFinal=tagArray.size();
        Query query = session.createQuery("delete from UsertagEntity a where a.userId= :userid").
                setParameter("userid", userid);
        query.executeUpdate();
        if(arrayFinal==0){
            transaction.commit();
            return "success";
        }
        Integer idx=tagArray.size()-1;
        Integer tagID;
        String judge =tagArray.getString(idx);
        if(!isNumeric(judge)){
            TagEntity newTag=new TagEntity(tagArray.getString(idx-1),tagArray.getString(idx));
            session.save(newTag);
            Query query2 = session.createQuery("select a from TagEntity a where a.tagName= :tagName").
                    setParameter("tagName", tagArray.getString(idx));
            TagEntity tag=(TagEntity)query2.uniqueResult();
            UsertagEntity personalTag=new UsertagEntity(tag.getTagId(),userid);
            session.save(personalTag);
            arrayFinal=arrayFinal-2;
        }
        for(int i=0;i<arrayFinal;i++)
        {
            tagID=Integer.parseInt(tagArray.getString(i));
            UsertagEntity newUserTag=new UsertagEntity(tagID,userid);
            session.save(newUserTag);
        }
        transaction.commit();
        return "success";
    }

    public JSONArray searchUserTagRelatedFood(Integer userId){
        Session session = HibernateUtil.getSession();
        Transaction transaction = session.beginTransaction();
        JSONArray jsonArray=new JSONArray();
        Query query1 = session.createQuery("select a " +
                "from UsertagEntity a where a.userId= :id").
                setParameter("id", userId);
        List<UsertagEntity> list1 = query1.list();
        Set<Integer> foodList = new TreeSet<>();
        Set<Integer> tagList = new TreeSet<>();
        for (int i=0;i<list1.size();i++) {
            Query query2 = session.createQuery("select a " +
                    "from FoodtagEntity a where a.tagId= :tagID").
                    setParameter("tagID", list1.get(i).getTagId());
            List<FoodtagEntity> list2 = query2.list();
            for(int j=0;j<list2.size();j++){
                foodList.add(list2.get(j).getFoodId());
            }
            tagList.add(list1.get(i).getTagId());
        }

        for (Integer value : foodList) {
            Query query3 = session.createQuery("select a from FoodEntity a where a.foodId= :foodID").
                    setParameter("foodID", value);
            FoodEntity food = (FoodEntity) query3.uniqueResult();

            Date date=new Date();
            SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
            Calendar cal=Calendar.getInstance();
            int h=cal.get(Calendar.HOUR_OF_DAY);

            Query query10 = session.createQuery("select a from TodayfoodEntity a where a.foodId= :foodID").
                    setParameter("foodID", value);
            if(query10.list().size()==0){
                continue;
            }
            else{
                TodayfoodEntity todayFood=(TodayfoodEntity)query10.uniqueResult();
                if(!dateFormat.format(date).equals(dateFormat.format(todayFood.getDate()))){
                    continue;
                }
                if(!(((h>6&&h<=9)&&(todayFood.getTime()==0))||
                        ((h>9&&h<=13)&&(todayFood.getTime()==1))||
                        ((h>13&&h<20)&&(todayFood.getTime()==2)))){
                    continue;
                }
            }

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("foodId", food.getFoodId());
            jsonObject.put("foodName", food.getFoodName());
            jsonObject.put("price", food.getPrice());
            jsonObject.put("tips", food.getTips());

            Query query7 = session.createQuery("select a from ViewhistoryEntity  a " +
                    "where a.windowId= :windowID and a.userId=:userId")
                    .setParameter("windowID", food.getWindowId())
                    .setParameter("userId",userId);
            ViewhistoryEntity view = (ViewhistoryEntity) query7.uniqueResult();
            jsonObject.put("viewHistory", view.getCount());

            Query query4 = session.createQuery("select a from WindowEntity  a where a.windowId= :windowID").
                    setParameter("windowID", food.getWindowId());
            WindowEntity window = (WindowEntity) query4.uniqueResult();
            jsonObject.put("windowName", window.getWindowName());
            jsonObject.put("restaurant", window.getRestaurant());

            Query query5 = session.createQuery("select a from FoodtagEntity  a where a.foodId= :foodID").
                    setParameter("foodID", value);
            List<FoodtagEntity> list5 = query5.list();

            Query query9 = session.createQuery("select a " +
                    "from UsertagdislikeEntity a " +
                    "where a.userId= :userID and a.dislikeCount>=2").setParameter("userID",userId);
            List<UsertagdislikeEntity> dislikeTags=query9.list();
            List<Integer> dislikeTagsID=new ArrayList<>();
            for(int i=0;i<dislikeTags.size();i++){
                dislikeTagsID.add(dislikeTags.get(i).getTagId());
            }

            List<String> tags=new ArrayList<>();
            List<String> relatedTags=new ArrayList<>();
            Boolean flag=true;
            for (int i=0;i<list5.size();i++) {
                Query query6 = session.createQuery("select a from TagEntity  a where a.tagId= :tagID").
                        setParameter("tagID", list5.get(i).getTagId());
                TagEntity tag=(TagEntity) query6.uniqueResult();
                String tagName=tag.getTagName();
                tags.add(tagName);
                if(tagList.contains(tag.getTagId())){
                    relatedTags.add(tagName);
                }
                if(dislikeTagsID.contains(tag.getTagId())){
                    flag=false;
                }
            }
            if(!flag){
                continue;
            }
            jsonObject.put("relatedTags", relatedTags);
            jsonObject.put("tags", tags);

            Query query8 = session.createQuery("select a " +
                    "from UserlikefoodEntity a " +
                    "where a.foodId= :foodID and a.userId= :userID").
                    setParameter("foodID", value).setParameter("userID",userId);
            if(query8.list().size()>0)
                jsonObject.put("like", 1);
            else
                jsonObject.put("like", 0);
            jsonArray.add(jsonObject);
        }
        transaction.commit();
        System.out.println("jsonArrayReco"+jsonArray);
        return jsonArray;
    }
    }

