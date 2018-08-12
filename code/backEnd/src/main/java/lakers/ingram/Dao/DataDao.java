package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.DataEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public interface DataDao {

    //today
    public List<DataEntity> getInitDataByDate(Timestamp date, int windowId);
    public DataEntity getCurrentData( int windowId);

    //time ago
    public List<DataEntity> getHistoryDataByDate(Timestamp date, int windowId, long period);
    public DataEntity getCurrentHistoryDataByDate(Timestamp date, int windowId, long period);

    // wrap one
    public ArrayList<JSONArray> getWrapDataByDateAndWindow(Timestamp date, int p, int windowId);

}
