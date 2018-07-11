package lakers.ingram.service;

import lakers.ingram.ModelEntity.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.File;
import java.sql.Timestamp;
import java.util.List;

public interface AppService {
    public Integer addUser(UserEntity user);

    public void deleteUser(UserEntity user);

    public void updateUser(UserEntity user);

    public UserEntity getUserById(int id);

    public UserEntity getUserByName(String name);

    public UserEntity getUserByPhone(String phone);

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

    //Food

    public List<FoodEntity> getAllFood();

    public List<FoodEntity> getAllFoodByRestaurant(String restaurant);

    public List<FoodEntity> getAllFoodByRestaurantAndFloor(String restaurant, int floor);

    public List<FoodEntity> getAllFoodByWindowid(int window_id);

    public String getWindowNameByFoodId(int foodId);

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

    public JSONArray showTags();
    public String sendTags(Integer userid, JSONArray tagArray);
    public JSONObject showTags(String tagName);

    public String updatePic(File imgFile, Integer userid);
    public String newFoodPic(File imageFile,String windowid);
    //data
    public List<DataEntity> getInitDataByDate(Timestamp date, int windowId);

    public DataEntity getCurrentData(int windowId);

    public List<DataEntity> getHistoryDataByDate(Timestamp date, int windowId);

    public DataEntity getCurrentHistoryDataByDate(Timestamp date, int windowId);
}
