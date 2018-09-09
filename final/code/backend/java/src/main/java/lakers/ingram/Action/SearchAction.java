package lakers.ingram.Action;

import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.TagEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping(value = "/Search")
public class SearchAction extends HttpServlet {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/All")
    private void processSearchAll(@RequestParam("content") String content,
                              @RequestParam("time") Integer time,
                              HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=utf-8");
        System.out.println(content);
        PrintWriter out = response.getWriter();
        List<FoodEntity> foodList=appService.getAllFoodByLikeStr(content);
        JSONArray foods = JSONArray.fromObject(foodList);
        System.out.println(foods);
        JSONArray res = new JSONArray();
        for(int i= 0;i<foods.size();i++){
            JSONObject food = foods.getJSONObject(i);
            Integer windowId= appService.getWindowIdByFoodIdAndTime(foodList.get(i).getFoodId(),time);
            if (windowId!= null){
                WindowEntity window=appService.getWindowById(windowId);
                food.put("windowId",windowId);
                food.put("windowName",window.getWindowName());
                food.put("restaurant",window.getRestaurant());
                food.put("tag",null);
                res.add(food);
            }
        }
        List<TagEntity> tagList=appService.getTagByLikeName(content);
        Iterator<TagEntity> tagIt= tagList.iterator();
        while (tagIt.hasNext()){
            TagEntity tag=tagIt.next();
            List<FoodEntity> foodList2=appService.getFoodsByTagId(tag.getTagId());
            JSONArray foods2 = JSONArray.fromObject(foodList2);
            for(int i= 0;i<foods2.size();i++){
                JSONObject food =foods2.getJSONObject(i);
                Integer windowId= appService.getWindowIdByFoodIdAndTime(foodList2.get(i).getFoodId(),time);
                if (windowId!= null){
                    WindowEntity window=appService.getWindowById(windowId);
                    food.put("windowId",windowId);
                    food.put("windowName",window.getWindowName());
                    food.put("restaurant",window.getRestaurant());
                    food.put("tag",tag.getTagName());
                    res.add(food);
                }
            }
        }
        out.println(JSONArray.fromObject(res));
        out.flush();
        out.close();
    }
}
