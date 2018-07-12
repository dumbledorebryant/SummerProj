package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.ViewhistoryEntity;

import java.util.List;

public interface ViewHistoryDao {

    //viewHistory
    public void save(ViewhistoryEntity view);

    public void update(ViewhistoryEntity view);

    public ViewhistoryEntity select(int userId, int windowId);

}



