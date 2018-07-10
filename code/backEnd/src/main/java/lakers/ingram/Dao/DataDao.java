package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.DataEntity;

import java.sql.Timestamp;
import java.util.List;

public interface DataDao {
    public List<DataEntity> getInitDataByDate(Timestamp date);
    public DataEntity getCurrentData();
    public List<DataEntity> getHistoryDataByDate(Timestamp date);
    public DataEntity getCurrentHistoryDataByDate(Timestamp date);
}
