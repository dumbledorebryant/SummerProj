package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.ViewhistoryEntity;
import net.sf.json.JSONArray;

import java.util.List;

public interface ViewHistoryDao {

    //viewHistory
    public void save(ViewhistoryEntity view);

    public void update(ViewhistoryEntity view);

    public ViewhistoryEntity select(int userId, int windowId);

    public JSONArray getViewHistory(Integer userId);
    public String updateViewHistory(Integer userId,JSONArray deleteId);

}



