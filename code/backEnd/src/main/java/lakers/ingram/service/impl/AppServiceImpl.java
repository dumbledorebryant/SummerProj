package lakers.ingram.service.impl;

import lakers.ingram.Dao.UserDao;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.UnsupportedEncodingException;

import java.util.List;

@Service
public class AppServiceImpl implements AppService {
    @Autowired
    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    //user
    public Integer addUser(UserEntity user){
        return userDao.save(user);
    }

    public void deleteUser(UserEntity user){
        userDao.delete(user);
    }

    public void updateUser(UserEntity user){
        userDao.update(user);
    }

    public UserEntity getUserById(int id){
        return userDao.getUserById(id);
    }

    public UserEntity getUserByName(String name){ return userDao.getUserByName(name); }

    public UserEntity getUserByPhone(String phone){ return userDao.getUserByPhone(phone); }

    public List<UserEntity> getAllUsers(){
        return userDao.getAllUsers();
    }
}
