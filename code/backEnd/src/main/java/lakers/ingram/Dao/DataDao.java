package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.DataEntity;

import java.sql.Timestamp;
import java.util.List;

public interface DataDao {
    public List<DataEntity> getInitDataByDate(Timestamp date, int windowId);
    public DataEntity getCurrentData( int windowId);
    public List<DataEntity> getHistoryDataByDate(Timestamp date, int windowId);
    public DataEntity getCurrentHistoryDataByDate(Timestamp date, int windowId);
}
