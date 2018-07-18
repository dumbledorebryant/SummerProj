package lakers.ingram.Dao;

import net.sf.json.JSONArray;

public interface UserTagDislikeDao {
    public String updateUserDislikeTag(Integer userId,JSONArray dislikeTags);
}
