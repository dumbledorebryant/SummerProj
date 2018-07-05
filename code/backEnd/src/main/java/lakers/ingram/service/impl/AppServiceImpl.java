package lakers.ingram.service.impl;

import lakers.ingram.Dao.UserDao;
import lakers.ingram.Dao.WindowDao;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import lakers.ingram.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class AppServiceImpl implements AppService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private WindowDao windowDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    public void setWindowDao(WindowDao windowDao){ this.windowDao = windowDao;}


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


    //Floor
    public List<Integer> getFloorListByRestaurant(String restaurant){
        return windowDao.getFloorListByRestaurant(restaurant);
    };

    //Window
    public List<WindowEntity> getAllWindowsByRestaurant(String restaurant){
        return windowDao.getAllWindowsByRestaurant(restaurant);
    };

    public List<WindowEntity> getAllWindowsByRestaurantAndFloor(String restaurant, int floor){
        return windowDao.getAllWindowsByRestaurantAndFloor(restaurant,floor);
    };

    public WindowEntity getWindowByRestaurantAndFloorAndName(String restaurant, int floor, String windowName){
        return windowDao.getWindowByRestaurantAndFloorAndName(restaurant,floor,windowName);
    };

    public List<WindowEntity> getAllWindows(){
        return windowDao.getAllWindows();
    };

}
