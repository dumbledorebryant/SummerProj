package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.WindowliketimeEntity;

import java.sql.Timestamp;
import java.util.List;

public interface WindowLikeTimeDao {
    List<WindowliketimeEntity> getWindowLikeByTimeAndWindow(Timestamp date, int windowId, int period);
}
