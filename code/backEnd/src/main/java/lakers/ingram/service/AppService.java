package lakers.ingram.service;

import lakers.ingram.ModelEntity.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.File;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface AppService {
    public Integer addUser(UserEntity user);

    void freezeUser(UserEntity user);

    void activateUser(UserEntity user);
    public void deleteUsers(int[] userIDs);

    public void updateUser(UserEntity user);

    public UserEntity getUserById(int id);

    public UserEntity getUserByName(String name);

    public UserEntity getUserByPhone(String phone);

    public void getUserAvatar(Integer userid, OutputStream out);

    public List<UserEntity> getAllUsers();

    public AdminEntity getAdminById(int id);

    public WorkerEntity getWorkerById(int id);

    //Floor
    public List<Integer> getFloorListByRestaurant(String restaurant);

    //Window
    public List<WindowEntity> getAllWindowsByRestaurant(String restaurant);

    public List<WindowEntity> getAllWindowsByRestaurantAndFloor(String restaurant, int floor);

    public WindowEntity getWindowByRestaurantAndFloorAndName(String restaurant, int floor, String windowName);

    public List<WindowEntity> getAllWindows();

    public WindowEntity getWindowById(int id);

    public Timestamp getTimeByWindowId(int windowId);
    //Today Food
    FoodEntity addFoodNew(String foodName,Double foodPrice,String foodTip,Integer windowID);
    void addNewTodayFood(Integer foodId,Integer windowId);
    void deleteAllTodayFoodByWindowId(Integer windowId);
    //Food

    public List<FoodEntity> getAllFood();

    public List<FoodEntity> getAllFoodByRestaurant(String restaurant);

    public List<FoodEntity> getAllFoodByRestaurantAndFloor(String restaurant, int floor);

    public List<FoodEntity> getAllFoodByWindowid(int window_id);

    public String getWindowNameByFoodId(int foodId);

    public String uploadNewFoodPic(File imgFile,Integer foodID);

    //UserLikeFood

    public boolean IsSave(int userId, int foodId);//是否已经收藏，是返回1，不是返回0

    public Integer saveUserLikeFood(UserlikefoodEntity userLikeFood, int foodId);//收藏

    public Integer deleteUserLikeFood(UserlikefoodEntity userLikeFood, int foodId);//取消收藏

    public List<FoodEntity> getLikeFoodListByUserId(int UserId);//查看用户的收藏菜单

    public int getCountUserByFoodId(int foodId);//统计每一道菜的收藏数目

    public List<UserlikefoodEntity> getAllUserLikeFood();

    //user center
    public JSONArray listUserTag(Integer name);
    public String chooseUserTag(Integer userid, String[] tagArray);

    public JSONObject showUserInfo(Integer userID);
    public String handleUserInfo(UserEntity user)throws Exception;

    public List<TagEntity> getAllTags();
    public String sendTags(Integer userid, JSONArray tagArray);
    public JSONObject showTags(String tagName);

    public String updatePic(File imgFile, Integer userid);
    public String newFoodPic(File imageFile, String windowid);

    public JSONArray searchUserLike(Integer userID);
    public String updateUserLike(Integer userID, Integer foodID, Integer flag);

    public JSONArray getViewHistory(Integer userId);
    public String updateViewHistory(Integer userId,JSONArray deleteId);
    public JSONArray searchUserTagRelatedFood(Integer userId);
    public String updateUserDislikeTag(Integer userId,JSONArray dislikeTags);
    public JSONArray allFoodTags();
    //data
        //today
    public List<DataEntity> getInitDataByDate(Timestamp date, int windowId);
    public DataEntity getCurrentData(int windowId);
        //one day ago
    public List<DataEntity> getYesterdayDataByDate(Timestamp date, int windowId);
    public DataEntity getCurrentYesterdayDataByDate(Timestamp date, int windowId);
        //one week ago
    public List<DataEntity> getDataByDate1(Timestamp date, int windowId);
    public DataEntity getCurrentDataByDate1(Timestamp date, int windowId);
        //two weeks ago
    public List<DataEntity> getDataByDate2(Timestamp date, int windowId);
    public DataEntity getCurrentDataByDate2(Timestamp date, int windowId);
        //three weeks ago
    public List<DataEntity> getDataByDate3(Timestamp date, int windowId);
    public DataEntity getCurrentDataByDate3(Timestamp date, int windowId);

    //viewHistory
    public void saveViewHistory(ViewhistoryEntity viewHistory);

    public void updateViewHistory(ViewhistoryEntity view);

    public ViewhistoryEntity selectView(int userId, int windowId);


    //Comment
    public int CommentSave(CommentEntity comment);//发表评论

    public void CommentDelete(int commentId);//删除评论

    public int CommentIsValid(int commentId);//返回状态

    public int CommentUpdate(int commentId, int valid);//封禁，解禁

    public List<CommentEntity> CommentListGetByWindowId(int WindowId, byte valid);//拿到窗口的评论


    //Search
    public List<FoodEntity> getFoodsByTagId(int tagId);

    public List<FoodEntity> getAllFoodByLikeStr(String str);

    public Integer getWindowIdByFoodIdAndTime(int foodId, int time);

    public List<TagEntity> getTagByLikeName(String tagName);

    List<WindowEntity> getAllNews();
    void RegisterWindow();
    JSONArray ShowWindowFood(int windowID);
    void getNewPicByWindowID(int windowID, OutputStream out);
    List<CommentEntity> getAllComments();

    //foodtag
    public List<TagEntity> getTagByFoodId(int foodId);
    public List<FoodEntity> getFoodsByTags(List<Integer> tagIdList,List<FoodEntity> Food);
    public void addFoodTag(Integer foodId,int[] tags);

}
