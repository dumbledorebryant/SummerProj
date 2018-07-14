package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.DataEntity;

import java.sql.Timestamp;
import java.util.List;

public interface DataDao {

    //today
    public List<DataEntity> getInitDataByDate(Timestamp date, int windowId);
    public DataEntity getCurrentData( int windowId);

    //time ago
    public List<DataEntity> getHistoryDataByDate(Timestamp date, int windowId, long period);
    public DataEntity getCurrentHistoryDataByDate(Timestamp date, int windowId, long period);


}
