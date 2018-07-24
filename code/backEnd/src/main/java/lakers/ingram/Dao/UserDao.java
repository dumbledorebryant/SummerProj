package lakers.ingram.Dao;

import lakers.ingram.ModelEntity.UserEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.data.repository.CrudRepository;

import java.io.File;
import java.io.OutputStream;
import java.util.List;

public interface UserDao{

    public Integer save(UserEntity user);

    public void delete(int[] userIDs);

    public void update(UserEntity user);

    public UserEntity getUserById(int id);

    public UserEntity getUserByName(String name);

    public UserEntity getUserByPhone(String phone);

    public List<UserEntity> getAllUsers();

    public JSONObject showUserInfo(Integer userID);
    public String handleUserInfo(UserEntity user) throws Exception;
    public String updatePic(File imgFile, Integer userid);

    void freeze(UserEntity user);

    void activate(UserEntity user);

    public void getUserAvatar(Integer userid, OutputStream out);
}



