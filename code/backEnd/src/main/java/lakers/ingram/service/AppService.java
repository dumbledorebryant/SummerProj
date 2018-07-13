package lakers.ingram.service;

import lakers.ingram.Dao.UserDao;
import lakers.ingram.ModelEntity.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.File;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface AppService {

    // User
    Integer addUser(UserEntity user);
    void freezeUser(UserEntity user);
    void activateUser(UserEntity user);
    void deleteUser(UserEntity user);
    void updateUser(UserEntity user);
    UserEntity getUserById(int id);
    UserEntity getUserByName(String name);
    UserEntity getUserByPhone(String phone);
    List<UserEntity> getAllUsers();
    AdminEntity getAdminById(int id);
    WorkerEntity getWorkerById(int id);

    // Floor
    List<Integer> getFloorListByRestaurant(String restaurant);

    // Window
    List<WindowEntity> getAllWindowsByRestaurant(String restaurant);
    List<WindowEntity> getAllWindowsByRestaurantAndFloor(String restaurant, int floor);
    WindowEntity getWindowByRestaurantAndFloorAndName(String restaurant, int floor, String windowName);
    List<WindowEntity> getAllWindows();

    // Food
    List<FoodEntity> getAllFood();
    List<FoodEntity> getAllFoodByRestaurant(String restaurant);
    List<FoodEntity> getAllFoodByRestaurantAndFloor(String restaurant, int floor);
    List<FoodEntity> getAllFoodByWindowid(int window_id);
    String getWindowNameByFoodId(int foodId);

    // UserLikeFood
    boolean IsSave(int userId, int foodId);//是否已经收藏，是返回1，不是返回0
    void saveUserLikeFood(UserlikefoodEntity userLikeFood, int foodId);//收藏
    void deleteUserLikeFood(UserlikefoodEntity userLikeFood, int foodId);//取消收藏
    List<FoodEntity> getLikeFoodListByUserId(int UserId);//查看用户的收藏菜单
    int getCountUserByFoodId(int foodId);//统计每一道菜的收藏数目
    List<UserlikefoodEntity> getAllUserLikeFood();

    // user center
    JSONArray listUserTag(Integer name);
    String chooseUserTag(Integer userid, String[] tagArray);
    JSONObject showUserInfo(Integer userID);
    String handleUserInfo(UserEntity user)throws Exception;
    JSONArray showTags();
    String sendTags(Integer userid, JSONArray tagArray);
    JSONObject showTags(String tagName);
    String updatePic(File imgFile, Integer userid);
    String newFoodPic(File imageFile, String windowid);
    JSONArray searchUserLike(Integer userID);
    String updateUserLike(Integer userID, Integer foodID, Integer flag);

    // data
    List<DataEntity> getInitDataByDate(Timestamp date, int windowId);
    DataEntity getCurrentData(int windowId);
    List<DataEntity> getHistoryDataByDate(Timestamp date, int windowId);
    DataEntity getCurrentHistoryDataByDate(Timestamp date, int windowId);

    // viewHistory
    void saveViewHistory(ViewhistoryEntity viewHistory);
    void updateViewHistory(ViewhistoryEntity view);
    ViewhistoryEntity selectView(int userId, int windowId);


    // Comment
    void CommentSave(CommentEntity comment);//发表评论
    void CommentDelete(int commentId);//删除评论
    int CommentIsValid(int commentId);//返回状态
    void CommentUpdate(int commentId, int valid);//封禁，解禁
    List<CommentEntity> CommentListGetByWindowId(int WindowId, byte valid);//拿到窗口的评论
    void setUserDao(UserDao userDao);
    List<WindowEntity> getAllNews();
    void RegisterWindow();
    Map<String, String> ShowWindowFood(int windowID);
    void getNewPicByWindowID(int windowID, OutputStream out);
    List<CommentEntity> getAllComments();
}
