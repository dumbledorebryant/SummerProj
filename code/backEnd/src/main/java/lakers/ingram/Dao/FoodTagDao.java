package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.TagEntity;

import java.util.List;

public interface FoodTagDao {
    public List<Integer> getFoodsByTagId(int tagId);

    public List<TagEntity> getTagByFoodId(int foodId);

    public List<TagEntity> getAllTags();

   // public List<Integer> getFoodsByTags(Array tagIdList);

}
