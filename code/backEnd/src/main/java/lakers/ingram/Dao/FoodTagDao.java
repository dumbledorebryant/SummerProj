package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.FoodEntity;

import java.util.List;

public interface FoodTagDao {
    public List<Integer> getFoodsByTagId(int tagId);

}
