package lakers.ingram.TestDao;


import lakers.ingram.Dao.CommentDao;
import lakers.ingram.Dao.FoodDao;
import lakers.ingram.IngramApplication;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = IngramApplication.class)

public class TestCommentDao {

    @Autowired
    private CommentDao commentDao;

    @Test
    public void testCommentDaoGetAll_1(){
        Assert.assertEquals(commentDao.GetCommentListByWindowId(1,(byte)1).size(),2);
    }


    @Test
    public void testCommentDaoDelete_1(){
        commentDao.delete(4);
        Assert.assertEquals(commentDao.GetCommentListByWindowId(1,(byte)1).size(),1);
    }



}
