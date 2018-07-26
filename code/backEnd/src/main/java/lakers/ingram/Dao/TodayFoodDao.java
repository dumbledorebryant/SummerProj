package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.FoodEntity;

import java.io.OutputStream;
import java.util.List;

public interface TodayFoodDao
{
    List<Integer> showAllNews();
    void getNewPic(int windowID, OutputStream out);
    public FoodEntity addFoodNew(String foodName, Double foodPrice, String foodTip,Integer windowID);
    public void addNewTodayFood(Integer foodId,Integer windowId);
    public void deleteAllTodayFoodByWindowId(Integer windowId);

}

