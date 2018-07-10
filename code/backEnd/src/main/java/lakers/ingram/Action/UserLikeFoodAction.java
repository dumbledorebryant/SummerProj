package lakers.ingram.Action;

import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.UserlikefoodEntity;
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
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping(value = "/UserLikeFood")
public class UserLikeFoodAction extends HttpServlet {

    @Autowired
    private AppService appService;

    @RequestMapping(value = "Save")//收藏返回1，删除返回0
    private void processSave(@RequestParam("userId") int userId,
                              @RequestParam("foodId") int foodId,
                             @RequestParam("state") int state,
                                HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        boolean IsSave = appService.IsSave(userId,foodId);//已收藏返回1，未收藏返回0
        UserlikefoodEntity userlikefood = new UserlikefoodEntity();
        userlikefood.setFoodId(foodId);
        userlikefood.setUserId(userId);
        if(state==0){//初始状态
            if(IsSave)out.println(0);//收藏状态
            else out.println(1);//没有收藏状态
            return;
        }
        if (IsSave) {
            appService.deleteUserLikeFood(userlikefood, foodId);
            out.println(1);//变成没有收藏的状态
        } else {
            appService.saveUserLikeFood(userlikefood, foodId);
            out.println(0);//变成收藏的状态
        }
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/FoodListByUserId")//拿到用户收藏的foodList
    private void processFoodList(@RequestParam("userId") int userId,
                                 HttpServletResponse response) throws Exception {
        PrintWriter out = response.getWriter();

        List<FoodEntity> foodList = appService.getLikeFoodListByUserId(userId);
        WindowEntity win = new WindowEntity();
        JSONArray arr = JSONArray.fromObject(foodList);
        JSONArray arr2 = new JSONArray();
        for(int i= 0;i<arr.size();i++){
            JSONObject food = arr.getJSONObject(i);
            String windowName= appService.getWindowNameByFoodId((int)food.get("foodId"));
            food.put("windowName",windowName);
            arr2.add(food);
        }
        System.out.println(arr2.toString());
        out.println(arr2.toString());
        out.flush();
        out.close();
    }

}
