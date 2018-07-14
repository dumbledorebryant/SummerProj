package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.TagEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagDao {
    public JSONArray showTags();
    public JSONObject showTags(String tagName);
    public List<TagEntity> getTagByLikeName(String tagName);
}
