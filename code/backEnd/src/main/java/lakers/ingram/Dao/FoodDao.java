package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.FoodEntity;

import java.util.List;

public interface FoodDao {

    public List<FoodEntity> getAllFood();

    public List<FoodEntity> getAllFoodByRestaurant(String restaurant);

    public List<FoodEntity> getAllFoodByRestaurantAndFloor(String restaurant, int floor);

    public List<FoodEntity> getAllFoodByWindowid(int window_id);

    public String getWindowNameByFoodId(int foodId);

}



