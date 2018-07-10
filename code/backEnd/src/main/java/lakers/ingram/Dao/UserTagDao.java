package lakers.ingram.Dao;

import net.sf.json.JSONArray;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Array;

@Repository
public interface UserTagDao {
    public JSONArray listUserTag(Integer name);
    public String chooseUserTag(Integer userid, String[] tagArray);
    public String sendTags(Integer userid, JSONArray tagArray);
}
