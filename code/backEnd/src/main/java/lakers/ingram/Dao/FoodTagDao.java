package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.TagEntity;
import net.sf.json.JSONArray;

import java.util.List;

public interface FoodTagDao {
    public List<Integer> getFoodsByTagId(int tagId);

    public List<TagEntity> getTagByFoodId(int foodId);

    public List<TagEntity> getAllTags();

    public List<FoodEntity> getFoodsByTags(List<Integer> tagIdList,List<FoodEntity> Food);

    public JSONArray allFoodTags();
}
