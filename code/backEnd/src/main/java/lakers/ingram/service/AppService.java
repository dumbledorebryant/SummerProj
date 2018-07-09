package lakers.ingram.service;

import lakers.ingram.ModelEntity.AdminEntity;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import lakers.ingram.ModelEntity.WorkerEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.File;
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

    public JSONArray listUserTag(Integer name);
    public String chooseUserTag(Integer userid,String[] tagArray);

    public JSONObject showUserInfo(Integer userID);
    public String handleUserInfo(UserEntity user)throws Exception;

    public JSONArray showTags();
    public String sendTags(Integer userid,JSONArray tagArray);
    public JSONObject showTags(String tagName);

    public String updatePic(File imgFile, Integer userid);

}
