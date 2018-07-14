package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.WindowEntity;

import java.util.List;

public interface WindowDao {

    //get FloorList
    public List<Integer> getFloorListByRestaurant(String restaurant);


    //get windowsList
    public List<WindowEntity> getAllWindowsByRestaurant(String restaurant);

    public List<WindowEntity> getAllWindowsByRestaurantAndFloor(String restaurant, int floor);

    public WindowEntity getWindowByRestaurantAndFloorAndName(String restaurant, int floor, String windowName);

    public WindowEntity getWindowById(int id);

    public List<WindowEntity> getAllWindows();



}
