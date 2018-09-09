package lakers.ingram.TestDao;


import lakers.ingram.Dao.*;
import lakers.ingram.IngramApplication;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static sun.plugin2.os.windows.OSVERSIONINFOA.size;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = IngramApplication.class)

public class TestFoodDao {

    @Autowired
    private FoodDao foodDao;
    @Autowired
    private FoodTagDao foodTagDao;

    @Test
    public void testGetAllFood(){
        Assert.assertEquals(6,foodDao.getAllFood().size());
    };

    @Test
    public void testGetFoodByRestaurant_1(){
        Assert.assertEquals(5,foodDao.getAllFoodByRestaurant("one").size());
    };
    @Test
    public void testGetFoodByRestaurant_2(){
        Assert.assertEquals(1,foodDao.getAllFoodByRestaurant("two").size());
    }
    @Test
    public void testGetFoodByRestaurant_3(){
        Assert.assertEquals(0,foodDao.getAllFoodByRestaurant("three").size());
    }
    @Test
    public void testGetAllFoodByRestaurantAndFloor_1(){
        Assert.assertEquals(4,foodDao.getAllFoodByRestaurantAndFloor("one",1).size());
    };
    @Test
    public void testGetAllFoodByRestaurantAndFloor_2(){
        Assert.assertEquals(1,foodDao.getAllFoodByRestaurantAndFloor("one",2).size());
    };

    @Test
    public void testGetAllFoodByWindowid_1(){
        Assert.assertEquals(3,foodDao.getAllFoodByWindowid(1).size());
    };

    @Test
    public void testGetAllFoodByWindowid_2(){
        Assert.assertEquals(1,foodDao.getAllFoodByWindowid(2).size());
    };
    @Test
    public void testGetAllFoodByWindowid_3(){
        Assert.assertEquals(1,foodDao.getAllFoodByWindowid(3).size());
    };
    @Test
    public void testGetAllFoodByWindowid_4(){
        Assert.assertEquals(0,foodDao.getAllFoodByWindowid(4).size());
    };
    @Test
    public void testGetAllFoodByWindowid_5(){
        Assert.assertEquals(0,foodDao.getAllFoodByWindowid(6).size());
    };

    @Test
    public void testGetWindowNameByFoodId_1(){
        Assert.assertEquals("川",foodDao.getWindowNameByFoodId(5));
    };
    @Test
    public void testGetAllFoodByLikeStr(){
        Assert.assertEquals(null,foodDao.getWindowNameByFoodId(1));
    };
    @Test
    public void testGetWindowIdByFoodIdAndTime_1(){
        Assert.assertEquals(null,foodDao.getWindowIdByFoodIdAndTime(5, 2));
    };
    @Test
    public void testGetWindowIdByFoodIdAndTime_2(){
        Assert.assertEquals(1,(int)foodDao.getWindowIdByFoodIdAndTime(5, 1));
    };
    @Test
    public void testGetWindowIdByFoodIdAndTime_3(){
        Assert.assertEquals(null,foodDao.getWindowIdByFoodIdAndTime(1, 1));
    };
    @Test
    public void testGetFoodById_1(){
        Assert.assertEquals(null,foodDao.getFoodById( 1));
    };
    @Test
    public void testGetFoodById_2(){
        Assert.assertEquals("[{\"foodId\":5,\"foodName\":\"土豆汤\",\"likes\":9,\"price\":10.1,\"tips\":\"Nice\",\"windowId\":1}]",
                JSONArray.fromObject(foodDao.getFoodById( 5)).toString());
    };

}
