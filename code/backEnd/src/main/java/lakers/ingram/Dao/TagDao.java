package lakers.ingram.Dao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Repository;

@Repository
public interface TagDao {
    public JSONArray showTags();
    public JSONObject showTags(String tagName);
}
