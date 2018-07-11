package lakers.ingram.service.impl;

import lakers.ingram.Dao.*;
import lakers.ingram.ModelEntity.*;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.File;
import java.sql.Timestamp;
import java.util.List;

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

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    public void setAdminDao(AdminDao adminDao) {
        this.adminDao = adminDao;
    }
    public void setWorkerDao(WorkerDao workerDao) {
        this.workerDao = workerDao;
    }
    public void setWindowDao(WindowDao windowDao){ this.windowDao = windowDao; }
    public void setDataDao(DataDao dataDao){ this.dataDao = dataDao; }
    //user
    public Integer addUser(UserEntity user){ return userDao.save(user); }

    public void deleteUser(UserEntity user){
        userDao.delete(user);
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


    //data
    public List<DataEntity> getInitDataByDate(Timestamp date, int windowId){ return dataDao.getInitDataByDate(date,windowId); }

    public DataEntity getCurrentData(int windowId){ return dataDao.getCurrentData(windowId); }

    public List<DataEntity> getHistoryDataByDate(Timestamp date, int windowId){ return dataDao.getHistoryDataByDate(date,windowId); }

    public DataEntity getCurrentHistoryDataByDate(Timestamp date, int windowId){ return dataDao.getCurrentHistoryDataByDate(date,windowId); }
}
