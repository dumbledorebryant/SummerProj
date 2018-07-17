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
import javax.swing.text.html.HTML;
import java.io.PrintWriter;
import java.util.*;

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
        JSONArray arr3 = FoodEntityAddWindowName(Foods);
        JSONArray arr4 = FoodEntityAddTag(arr3);
        out.println(arr4.toString());
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/SortFood")
    private void processSort(@RequestParam("foodList") String foodList,
                             @RequestParam("type") int type,
                             HttpServletRequest request,
                             HttpServletResponse response)  throws Exception {
        PrintWriter out = response.getWriter();
        System.out.println("========sort==========");
        System.out.println(foodList);
        JSONArray arr = JSONArray.fromObject(foodList);
        SortFoodList(arr,type);
        out.println(arr.toString());
        System.out.println(arr.toString());
        out.flush();
        out.close();
    }

    private void SortFoodList(JSONArray arr, int type){//1-likes升序，2-likes降序，3-price升序，4-price降序
        JSONObject ob = (JSONObject) arr.get(0);
        if(type==1){
            Collections.sort(arr, new Comparator<JSONObject>() {
                @Override
                public int compare(JSONObject o1, JSONObject o2) {//升序
                    if((int)o1.get("likes")>(int)o2.get("likes"))return 1;
                    return -1;
                }
            });
        }
        else if(type==2){
            Collections.sort(arr, new Comparator<JSONObject>() {
                @Override
                public int compare(JSONObject o1, JSONObject o2) {//降序
                    if((int)o1.get("likes")>(int)o2.get("likes"))return -1;
                    return 1;
                }
            });
        }
        else if(type==3){
            Collections.sort(arr, new Comparator<JSONObject>() {
                @Override
                public int compare(JSONObject o1, JSONObject o2) {//升序
                    if((double)o1.get("price")>(double)o2.get("price"))return 1;
                    return -1;
                }
            });
        }
        else if(type==4){
            Collections.sort(arr, new Comparator<JSONObject>() {
                @Override
                public int compare(JSONObject o1, JSONObject o2) {//降序
                    if((double)o1.get("price")>(double)o2.get("price"))return -1;
                    return 1;
                }
            });
        }
        System.out.println("-------------------SORT-------------");
        System.out.println(arr.toString());
    }
    private JSONArray FoodEntityAddTag(JSONArray foodList){
        JSONArray arr = JSONArray.fromObject(foodList);
        JSONArray arr2 = new JSONArray();
        for(int i= 0;i<arr.size();i++){
            JSONObject food = arr.getJSONObject(i);
            List<TagEntity> tags = appService.getTagByFoodId((int)food.get("foodId"));
            JSONArray tag = JSONArray.fromObject(tags);
            food.put("Tags",tags);
            arr2.add(food);
        }
        System.out.println(arr2.toString());
        return arr2;
    }
    private JSONArray FoodEntityAddWindowName(List<FoodEntity>foodList){
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

    @RequestMapping(value = "/AllTags")
    private void processAllTags(HttpServletRequest request,
                                HttpServletResponse response)  throws Exception {
        PrintWriter out = response.getWriter();
        List<TagEntity> tagList = appService.getAllTags();
        out.println(JSONArray.fromObject(tagList));
        System.out.println(JSONArray.fromObject(tagList));
        out.flush();
        out.close();
    }




}
