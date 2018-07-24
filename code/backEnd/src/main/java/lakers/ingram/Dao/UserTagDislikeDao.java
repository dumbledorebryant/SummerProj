package lakers.ingram.Dao;

import net.sf.json.JSONArray;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTagDislikeDao {
    public String updateUserDislikeTag(Integer userId,JSONArray dislikeTags);
}
