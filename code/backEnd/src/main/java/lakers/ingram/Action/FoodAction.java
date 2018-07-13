package lakers.ingram.Action;

import lakers.ingram.ModelEntity.FoodEntity;
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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping(value = "/Food")
public class FoodAction extends HttpServlet {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/AllFoodList")
    private void processAllFoodList(HttpServletRequest request, HttpServletResponse response) throws Exception {
        PrintWriter out = response.getWriter();
        List<FoodEntity> foodList = appService.getAllFood();
        Iterator it = foodList.iterator();

        ArrayList<FoodEntity> arrayList = new ArrayList<FoodEntity>();

        System.out.println(JSONArray.fromObject(foodList));
        out.println(JSONArray.fromObject(foodList));
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/FoodListByRestaurant")
    private void processFoodByRestaurant(@RequestParam("restaurant") String restaurant,
                                HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        List<FoodEntity> foodList = appService.getAllFoodByRestaurant(restaurant);
        Iterator it = foodList.iterator();
        ArrayList<FoodEntity> arrayList = new ArrayList<FoodEntity>();
        out.println(JSONArray.fromObject(foodList));
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/FoodListByRestaurantFloor")
    private void processFoodByRestaurantAndFloor(@RequestParam("restaurant") String restaurant,
                                                 @RequestParam("floor") int floor,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response)  throws Exception {

        PrintWriter out = response.getWriter();

        List<FoodEntity> foodList = appService.getAllFoodByRestaurantAndFloor(restaurant,floor );

        Iterator it = foodList.iterator();

        ArrayList<FoodEntity> arrayList = new ArrayList<FoodEntity>();

        out.println(JSONArray.fromObject(foodList));

        out.flush();

        out.close();

    }

    @RequestMapping(value = "/FoodsByWindowId")
    private void processFoodByWindowid(@RequestParam("restaurant") String restaurant,
                                       @RequestParam("floor") int floor,
                                       @RequestParam("windowId") int windowId,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response)  throws Exception {

        System.out.println("restaurant:"+restaurant);
        System.out.println("floor:"+floor);
        System.out.println("windowId:"+windowId);
        List<FoodEntity> Foods = new ArrayList<FoodEntity>();
        if(floor==0 && windowId==0 ) {
            Foods = appService.getAllFoodByRestaurant(restaurant);
        }
        else {
            if(windowId==0) Foods = appService.getAllFoodByRestaurantAndFloor(restaurant,floor);
            else {
                Foods = appService.getAllFoodByWindowid(windowId);
            }
        }
        PrintWriter out = response.getWriter();
  //      ArrayList<JSONArray> qJ = new ArrayList<JSONArray>();
    /*    WindowEntity win = new WindowEntity();
        JSONArray arr = JSONArray.fromObject(Foods);
        JSONArray arr2 = new JSONArray();
        for(int i= 0;i<arr.size();i++){
            JSONObject food = arr.getJSONObject(i);
            String windowName= appService.getWindowNameByFoodId((int)food.get("foodId"));
            food.put("windowName",windowName);
            arr2.add(food);
        }
        System.out.println(arr2.toString());*/
        JSONArray arr3 = FoodEntityAddWindowName(Foods);
        System.out.println(arr3.toString());
        out.println(arr3.toString());
        out.flush();
        out.close();
    }

    public JSONArray FoodEntityAddWindowName(List<FoodEntity>foodList){
        WindowEntity win = new WindowEntity();
        JSONArray arr = JSONArray.fromObject(foodList);
        JSONArray arr2 = new JSONArray();
        for(int i= 0;i<arr.size();i++){
            JSONObject food = arr.getJSONObject(i);
            String windowName= appService.getWindowNameByFoodId((int)food.get("foodId"));
            food.put("windowName",windowName);
            arr2.add(food);
        }
        return arr2;
    }

}
