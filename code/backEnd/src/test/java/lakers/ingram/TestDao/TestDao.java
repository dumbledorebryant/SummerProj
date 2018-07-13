package lakers.ingram.TestDao;


import lakers.ingram.Dao.AdminDao;
import lakers.ingram.Dao.UserDao;
import lakers.ingram.Dao.WindowDao;
import lakers.ingram.Dao.WorkerDao;
import lakers.ingram.IngramApplication;
import lakers.ingram.ModelEntity.WindowEntity;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = IngramApplication.class)

public class TestDao {

    @Autowired
    private UserDao userDao;
    @Autowired
    private AdminDao adminDao;
    @Autowired
    private WorkerDao workerDao;
    @Autowired
    private WindowDao windowDao;

    @Test
    public void testUserDaoGetAll(){
        System.out.println("----start user DAO test----");
        Assert.assertEquals(userDao.getAllUsers().size(),1);
    }

    @Test
    public void testUserDaoGetById(){
        Assert.assertEquals(userDao.getUserById(20002).getUsername(),"testuser2");
    }

    @Test
    public void testUserDaoGetByName(){
        Assert.assertEquals(userDao.getUserByName("testuser2").getUserId(),20002);
    }

    @Test
    public void testUserDaoGetByPhone(){
        Assert.assertEquals(userDao.getUserByPhone("12345678902").getUserId(),20002);
    }

    @Test
    public void testAdminDaoGetById(){
        System.out.println("----start admin DAO test----");
        Assert.assertEquals(adminDao.getAdminById(111111).getEmail(),"123@yu.com");
    }

    @Test
    public void testWorkerDaoGetById(){
        System.out.println("----start worker DAO test----");
        Assert.assertEquals(workerDao.getWorkerById(1).getPassword(),"123");
    }

    @Test
    public void testWindowDaoGetFloorListByRestaurant(){
        System.out.println("----start window DAO test----");
        List<Integer> list=new ArrayList<Integer>();
        list.add(1);
        list.add(2);
        Assert.assertEquals(windowDao.getFloorListByRestaurant("One"), list);
    }

    @Test
    public void testWindowDaoGetAllWindowsByRestaurant(){
        List<WindowEntity> list=new ArrayList<WindowEntity>();
        list.add(windowDao.getWindowById(1));
        list.add(windowDao.getWindowById(2));
        list.add(windowDao.getWindowById(3));
        Assert.assertEquals(windowDao.getAllWindowsByRestaurant("One"),list);
    }

    @Test
    public void testWindowDaoGetAllWindowsByRestaurantAndFloor(){
        List<WindowEntity> list=new ArrayList<WindowEntity>();
        list.add(windowDao.getWindowById(1));
        list.add(windowDao.getWindowById(2));
        Assert.assertEquals(windowDao.getAllWindowsByRestaurantAndFloor("One",1),list);
    }

    @Test
    public void testWindowDaoGetWindowByRestaurantAndFloorAndName(){
        Assert.assertEquals(windowDao.getWindowByRestaurantAndFloorAndName("One",1,"AWM"),
                windowDao.getWindowById(1));
    }
}
