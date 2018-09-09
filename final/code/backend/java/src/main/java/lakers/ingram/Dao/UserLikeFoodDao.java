package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.UserlikefoodEntity;
import net.sf.json.JSONArray;

import java.util.List;

public interface UserLikeFoodDao {

    public boolean IsSave(int userId, int foodId);//是否已经收藏，是返回1，不是返回0

    public Integer save(UserlikefoodEntity userLikeFood, int foodId);//收藏

    public Integer delete(UserlikefoodEntity userLikeFood, int foodId);//取消收藏

    public List<FoodEntity> getFoodListByUserId(int UserId);//查看用户的收藏菜单

    public int getCountUserByFoodId(int foodId);//统计每一道菜的收藏数目

    public List<UserlikefoodEntity> getAllUserLikeFood();

    public JSONArray searchUserLike(Integer userID);

    public String updateUserLike(Integer userID, Integer foodID, Integer flag);

}



