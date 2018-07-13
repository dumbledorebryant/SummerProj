package lakers.ingram.TestService;

import lakers.ingram.IngramApplication;
import lakers.ingram.service.AppService;
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
public class TestService {

    @Autowired
    private AppService appService;

    @Test
    public void testServiceGetAllUsers(){
        System.out.println("----start user service test----");
        Assert.assertEquals(appService.getAllUsers().size(),1);
    }

    @Test
    public void testServiceGetUserById(){
        Assert.assertEquals(appService.getUserById(20002).getUsername(),"testuser2");
    }

    @Test
    public void testServiceGetUserByName(){
        Assert.assertEquals(appService.getUserByName("testuser2").getUserId(),20002);
    }

    @Test
    public void testServiceGetUserByPhone(){
        Assert.assertEquals(appService.getUserByPhone("12345678902").getUserId(),20002);
    }

    @Test
    public void testServiceGetAdminById(){
        System.out.println("----start admin service test----");
        Assert.assertEquals(appService.getAdminById(111111).getEmail(),"123@yu.com");
    }

    @Test
    public void testServiceGetWorkerById(){
        System.out.println("----start worker service test----");
        Assert.assertEquals(appService.getWorkerById(1).getPassword(),"123");
    }

    @Test
    public void testServiceGetFloorListByRestaurant(){
        System.out.println("----start window service test----");
        List<Integer> list=new ArrayList<Integer>();
        list.add(1);
        list.add(2);
        Assert.assertEquals(appService.getFloorListByRestaurant("One"), list);
    }
}
