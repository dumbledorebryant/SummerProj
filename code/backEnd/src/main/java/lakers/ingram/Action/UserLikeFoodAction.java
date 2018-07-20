package lakers.ingram.Action;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
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
import java.io.OutputStream;
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

    @RequestMapping(value = "/update")
    private void processLogin(@RequestParam("userId") Integer userID,
                              @RequestParam("userLikeId") Integer foodID,
                              @RequestParam("flag") Integer flag,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        String result = appService.updateUserLike(userID,foodID,flag);
        out.print(result);
    }

    @RequestMapping(value = "/search")
    private void processLogin(@RequestParam("userId") Integer userID,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        JSONArray result = appService.searchUserLike(userID);
        out.print(result);
    }

    @RequestMapping(value = "/GetPic")
    private void processLogin(@RequestParam("foodID") String foodID,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        response.setCharacterEncoding("utf-8");
        response.setContentType("image/*");
        OutputStream out = response.getOutputStream();
        //GridFSDBFile result = appService.getPic(fileName);
        MongoClient mongo = new MongoClient();
        DB mongodb = mongo.getDB("Food");
        GridFS gfsPhoto = new GridFS(mongodb, "Images");
        // get image file by it's filename
        GridFSDBFile imageForOutput = gfsPhoto.findOne(foodID);
        if (imageForOutput!=null){
            imageForOutput.writeTo(out);
        }
        out.flush();
        out.close();
        mongo.close();
    }

}
