package lakers.ingram.service.impl;

import lakers.ingram.Dao.*;
import lakers.ingram.ModelEntity.*;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.sql.Time;

@Service
public class AppServiceImpl implements AppService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private WorkerDao workerDao;

    @Autowired
    private WindowDao windowDao;

    @Autowired
    private FoodDao foodDao;

    @Autowired
    private UserLikeFoodDao userLikeFoodDao;

    @Autowired
    private UserTagDao userTagDao;

    @Autowired
    private TagDao tagDao;

    @Autowired
    private DataDao dataDao;

    @Autowired
    private ViewHistoryDao viewHistoryDao;

    @Autowired
    private CommentDao commentDao;

    @Autowired
    private FoodTagDao foodTagDao;

    @Autowired
    private TodayFoodDao todayFoodDao;

    @Autowired
    private UserTagDislikeDao userTagDislikeDao;

    //user
    public Integer addUser(UserEntity user){ return userDao.save(user); }

    public void deleteUsers(int[] userIDs){
        userDao.delete(userIDs);
    }

    public void updateUser(UserEntity user){
        userDao.update(user);
    }

    public UserEntity getUserById(int id){
        return userDao.getUserById(id);
    }

    public UserEntity getUserByName(String name){ return userDao.getUserByName(name); }

    public UserEntity getUserByPhone(String phone){ return userDao.getUserByPhone(phone); }

    public List<UserEntity> getAllUsers(){ return userDao.getAllUsers(); }

    @Override
    public void freezeUser(UserEntity user) {
        userDao.freeze(user);
    }

    @Override
    public void activateUser(UserEntity user) {
        userDao.activate(user);
    }

    //admin
    public AdminEntity getAdminById(int id){ return adminDao.getAdminById(id); }

    //worker
    public WorkerEntity getWorkerById(int id){ return workerDao.getWorkerById(id); }

    //Floor
    public List<Integer> getFloorListByRestaurant(String restaurant){
        return windowDao.getFloorListByRestaurant(restaurant);
    };

    //Window
    public List<WindowEntity> getAllWindowsByRestaurant(String restaurant){
        return windowDao.getAllWindowsByRestaurant(restaurant);
    };

    public List<WindowEntity> getAllWindowsByRestaurantAndFloor(String restaurant, int floor){
        return windowDao.getAllWindowsByRestaurantAndFloor(restaurant,floor);
    };

    public WindowEntity getWindowByRestaurantAndFloorAndName(String restaurant, int floor, String windowName){
        return windowDao.getWindowByRestaurantAndFloorAndName(restaurant,floor,windowName);
    };

    public List<WindowEntity> getAllWindows(){
        return windowDao.getAllWindows();
    };

    public WindowEntity getWindowById(int id) { return windowDao.getWindowById(id); }

    public Timestamp getTimeByWindowId(int windowId){ return windowDao.getTimeByWindowId(windowId); }

    //Food
    public List<FoodEntity> getAllFood(){
        return foodDao.getAllFood();
    };

    public List<FoodEntity> getAllFoodByRestaurant(String restaurant){
        return foodDao.getAllFoodByRestaurant(restaurant);
    };

    public List<FoodEntity> getAllFoodByRestaurantAndFloor(String restaurant, int floor){
        return foodDao.getAllFoodByRestaurantAndFloor(restaurant,floor);
    };

    public List<FoodEntity> getAllFoodByWindowid(int window_id){
        return foodDao.getAllFoodByWindowid(window_id);
    };

    public String getWindowNameByFoodId(int foodId){
        return foodDao.getWindowNameByFoodId(foodId);
    };



    //  UserLikeFood

    public boolean IsSave(int userId, int foodId){
        return userLikeFoodDao.IsSave(userId,foodId);
    };//是否已经收藏，是返回1，不是返回0

    public Integer saveUserLikeFood(UserlikefoodEntity userLikeFood, int foodId){
        return userLikeFoodDao.save(userLikeFood,foodId);
    };//收藏

    public Integer deleteUserLikeFood(UserlikefoodEntity userLikeFood, int foodId){
        return userLikeFoodDao.delete(userLikeFood,foodId);
    };//取消收藏

    public List<FoodEntity> getLikeFoodListByUserId(int UserId){
        return userLikeFoodDao.getFoodListByUserId(UserId);
    };//查看用户的收藏菜单

    public int getCountUserByFoodId(int foodId){
        return userLikeFoodDao.getCountUserByFoodId(foodId);
    };//统计每一道菜的收藏数目

    public List<UserlikefoodEntity> getAllUserLikeFood(){
        return userLikeFoodDao.getAllUserLikeFood();
    };

    //user center
    public JSONArray listUserTag(Integer name){return userTagDao.listUserTag(name);}
    public String chooseUserTag(Integer userid,String[] tagArray) {
        return userTagDao.chooseUserTag(userid,tagArray);
    }

    public JSONObject showUserInfo(Integer userID){
        return userDao.showUserInfo( userID);
    }
    public String handleUserInfo(UserEntity user)throws Exception{
        return userDao.handleUserInfo(user);
    }

    public JSONArray showTags(){
        return tagDao.showTags();
    }

    public String sendTags(Integer userid,JSONArray tagArray){
        return userTagDao.sendTags(userid,tagArray);
    }

    public JSONObject showTags(String tagName){
        return tagDao.showTags(tagName);
    }

    public String updatePic(File imgFile, Integer userid){
        return userDao.updatePic(imgFile, userid);
    }

    public String newFoodPic(File imageFile,String windowid){
        return workerDao.newFoodPic(imageFile,windowid);
    }
    public JSONArray searchUserLike(Integer userID){
        return userLikeFoodDao.searchUserLike(userID);
    }
    public String updateUserLike(Integer userID,Integer foodID,Integer flag){
        return userLikeFoodDao.updateUserLike(userID,foodID,flag);
    }

    public JSONArray getViewHistory(Integer userId){
        return viewHistoryDao.getViewHistory(userId);
    }
    public String updateViewHistory(Integer userId,JSONArray deleteId){
        return viewHistoryDao.updateViewHistory(userId,deleteId);
    }
    public JSONArray searchUserTagRelatedFood(Integer userId){
        return userTagDao.searchUserTagRelatedFood(userId);
    }
    public String updateUserDislikeTag(Integer userId,JSONArray dislikeTags){
        return userTagDislikeDao.updateUserDislikeTag(userId,dislikeTags);
    }
    public JSONArray allFoodTags(){
        return foodTagDao.allFoodTags();
    }
    //data
        // today
    public List<DataEntity> getInitDataByDate(Timestamp date, int windowId){ return dataDao.getInitDataByDate(date,windowId); }
    public DataEntity getCurrentData(int windowId){ return dataDao.getCurrentData(windowId); }

        // one day ago
    public List<DataEntity> getYesterdayDataByDate(Timestamp date, int windowId){ return dataDao.getHistoryDataByDate(date,windowId,86400000); }
    public DataEntity getCurrentYesterdayDataByDate(Timestamp date, int windowId){ return dataDao.getCurrentHistoryDataByDate(date,windowId,86400000); }

        // one week ago
    public List<DataEntity> getDataByDate1(Timestamp date, int windowId){ return dataDao.getHistoryDataByDate(date,windowId,604800000); }
    public DataEntity getCurrentDataByDate1(Timestamp date, int windowId){ return dataDao.getCurrentHistoryDataByDate(date,windowId,604800000);}

        // two weeks ago
    public List<DataEntity> getDataByDate2(Timestamp date, int windowId){ return dataDao.getHistoryDataByDate(date,windowId,2*604800000); }
    public DataEntity getCurrentDataByDate2(Timestamp date, int windowId){ return dataDao.getCurrentHistoryDataByDate(date,windowId,2*604800000);}

        // three weeks ago
    public List<DataEntity> getDataByDate3(Timestamp date, int windowId){ return dataDao.getHistoryDataByDate(date,windowId,3*604800000); }
    public DataEntity getCurrentDataByDate3(Timestamp date, int windowId){ return dataDao.getCurrentHistoryDataByDate(date,windowId,3*604800000);}


    //viewHistory
    public void saveViewHistory(ViewhistoryEntity viewHistory){
        viewHistoryDao.save(viewHistory);
    }

    public void updateViewHistory(ViewhistoryEntity view){
        viewHistoryDao.update(view);
    };

    public ViewhistoryEntity selectView(int userId, int windowId){
        return viewHistoryDao.select(userId,windowId);
    };


    //Comment
    public int CommentSave(CommentEntity comment){return commentDao.save(comment);};//发表评论

    public void CommentDelete(int commentId){commentDao.delete(commentId);};//删除评论

    public int CommentIsValid(int commentId){return commentDao.isValid(commentId);};//返回状态

    public int CommentUpdate(int commentId,int valid){return commentDao.update(commentId,valid);};//封禁，解禁

    public List<CommentEntity> CommentListGetByWindowId(int WindowId, byte valid){return commentDao.GetCommentListByWindowId(WindowId,valid);};//拿到窗口的评论

    //Search
    public List<FoodEntity> getFoodsByTagId(int tagId) {
        List<Integer> ids=foodTagDao.getFoodsByTagId(tagId);
        List<FoodEntity> res= new ArrayList<FoodEntity>();
        Iterator<Integer> it=ids.iterator();
        while (it.hasNext()){
            Integer id=it.next();
            res.add(foodDao.getFoodById(id));
        }
        return res;
    }

    public List<FoodEntity> getAllFoodByLikeStr(String str){ return foodDao.getAllFoodByLikeStr(str); }

    public Integer getWindowIdByFoodIdAndTime(int foodId, int time){ return foodDao.getWindowIdByFoodIdAndTime(foodId,time); }

    public List<TagEntity> getTagByLikeName(String tagName){ return tagDao.getTagByLikeName(tagName); }



    //GetAllPossibleFoodForToday
    @Override
    public List<WindowEntity> getAllNews()
    {
        List<Integer> UpdatedWindows = todayFoodDao.showAllNews();
        List<WindowEntity> windowList = new ArrayList<>();
        for (int windowID : UpdatedWindows)
        {
            WindowEntity singleWindow = windowDao.getWindowById(windowID);
            windowList.add(singleWindow);
        }
        return windowList;
    }

    @Override
    public void RegisterWindow() {
        //todayFoodDao.registerToday();
        //windowDao.checkNew();
    }

    @Override
    public Map<String, String> ShowWindowFood(int windowID) { return foodDao.getFoodId_NameByWindowID(windowID); }

    @Override
    public void getNewPicByWindowID(int windowID, OutputStream out) {
        todayFoodDao.getNewPic(windowID, out);
    }

    @Override
    public List<CommentEntity> getAllComments() {
        return commentDao.showAllComments();
    }

    //FoodTag
    public List<TagEntity> getTagByFoodId(int foodId){
        return foodTagDao.getTagByFoodId(foodId);
    };

    public List<TagEntity> getAllTags(){
        return foodTagDao.getAllTags();
    }

    public List<FoodEntity> getFoodsByTags(List<Integer> tagIdList,List<FoodEntity> Food){
        return foodTagDao.getFoodsByTags(tagIdList,Food);
    };


}
