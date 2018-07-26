package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.FoodEntity;

import java.io.File;
import java.util.List;
import java.util.Map;

public interface FoodDao {

    public List<FoodEntity> getAllFood();

    public List<FoodEntity> getAllFoodByRestaurant(String restaurant);

    public List<FoodEntity> getAllFoodByRestaurantAndFloor(String restaurant, int floor);

    public List<FoodEntity> getAllFoodByWindowid(int window_id);

    public String getWindowNameByFoodId(int foodId);

    public List<FoodEntity> getAllFoodByLikeStr(String str);

    public Integer getWindowIdByFoodIdAndTime(int foodId, int time);

    public FoodEntity getFoodById(int foodId);

    Map<String, String> getFoodId_NameByWindowID(int WindowID);

    public String uploadNewFoodPic(File imgFile, Integer foodID);

}



