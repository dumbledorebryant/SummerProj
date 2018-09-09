package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.ViewhistorytimeEntity;

import java.sql.Timestamp;
import java.util.List;

public interface ViewHistoryTimeDao {
    public List<ViewhistorytimeEntity> getViewHistoryByTimeAndWindow(Timestamp date, int windowId);
}
