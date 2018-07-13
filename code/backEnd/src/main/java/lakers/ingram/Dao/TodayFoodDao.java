package lakers.ingram.Dao;

import java.io.OutputStream;
import java.util.List;

public interface TodayFoodDao
{
    List<Integer> showAllNews();
    void getNewPic(int windowID, OutputStream out);
}

