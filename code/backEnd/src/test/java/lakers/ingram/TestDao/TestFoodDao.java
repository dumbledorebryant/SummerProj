package lakers.ingram.TestDao;


import lakers.ingram.Dao.*;
import lakers.ingram.IngramApplication;
import lakers.ingram.ModelEntity.WindowEntity;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = IngramApplication.class)

public class TestFoodDao {

    @Autowired
    private FoodDao foodDao;

    @Test
    public void testFoodDaoGetAll_1(){
        Assert.assertEquals(foodDao.getAllFood().size(),5);
    }

    @Test
    public void testFoodDaoGetFoodByRestaurant_1(){
        Assert.assertEquals(foodDao.getAllFoodByRestaurant("one").size(),4);
    }

    @Test
    public void testgetAllFoodByRestaurantAndFloor_1(){
        Assert.assertEquals(foodDao.getAllFoodByRestaurantAndFloor("one", 1).size(),3);
    }

    @Test
    public void testgetAllFoodByWindowid_1(){
        Assert.assertEquals(foodDao.getAllFoodByWindowid(1).size(),2);
    }



}
