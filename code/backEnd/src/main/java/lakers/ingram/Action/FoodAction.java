package lakers.ingram.Action;

import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.TagEntity;
import lakers.ingram.ModelEntity.ViewhistoryEntity;
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
import javax.servlet.http.HttpSession;
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
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        List<FoodEntity> foodList = appService.getAllFood();
        Iterator it = foodList.iterator();
        ArrayList<FoodEntity> arrayList = new ArrayList<FoodEntity>();
        System.out.println(JSONArray.fromObject(foodList));
        out.println(JSONArray.fromObject(foodList));
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/FoodsByWindowId")
    private void processFoodByWindowid(@RequestParam("restaurant") String restaurant,
                                       @RequestParam("floor") int floor,
                                       @RequestParam("windowId") int windowId,
                                       @RequestParam("tagList") ArrayList<Integer> tagList,
                                       HttpServletRequest request,
                                       HttpServletResponse response)  throws Exception
    {
        System.out.println("restaurant:"+restaurant);
        System.out.println("floor:"+floor);
        System.out.println("windowId:"+windowId);
        System.out.println("tagList"+tagList.size());

        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        List<FoodEntity> Foods = new ArrayList<FoodEntity>();
        if(floor==0 && windowId==0 ) {
            Foods = appService.getAllFoodByRestaurant(restaurant);
        }
        else {
            if(windowId==0) Foods = appService.getAllFoodByRestaurantAndFloor(restaurant,floor);
            else {
                Foods = appService.getAllFoodByWindowid(windowId);
                Object obj=request.getSession().getAttribute("userid");
                if (obj==null){
                    System.out.println("---------------------1-----------------");
                }
                else{
                    int userId=Integer.parseInt(obj.toString());
                    if(userId!=-1){
                        ViewhistoryEntity viewHistory = appService.selectView(userId,windowId);
                        if(viewHistory==null){
                            ViewhistoryEntity view = new ViewhistoryEntity();
                            view.setUserId(userId);
                            view.setWindowId(windowId);
                            System.out.println("userId:"+ userId);
                            view.setCount(1);
                            appService.saveViewHistory(view);
                        }
                        else {
                            viewHistory.setCount(viewHistory.getCount()+1);
                            appService.updateViewHistory(viewHistory);
                        }
                    }
                }
            }
        }

        if(tagList.size()!=0) {
            List<Integer> tagId = tagList;
            Foods = appService.getFoodsByTags(tagId,Foods);
            if(Foods==null){
                out.println("[]");
                out.flush();
                out.close();
                System.out.println("[]");
                return;
            }
        }

        JSONArray arr3 = FoodEntityAddWindowName(Foods);
        JSONArray arr4 = FoodEntityAddTag(arr3);
        out.println(arr4.toString());

        HttpSession session=request.getSession();
        session.setAttribute("foodList",Foods);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/SortFood")
    private void processSort(@RequestParam("foodList") String foodList,
                             @RequestParam("type") int type,
                             HttpServletRequest request,
                             HttpServletResponse response)  throws Exception {
        response.setContentType("application/json;charset=utf-8");
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
                    if( o1.getDouble("price")>o2.getDouble("price"))return 1;
                    return -1;
                }
            });
        }
        else if(type==4){
            Collections.sort(arr, new Comparator<JSONObject>() {
                @Override
                public int compare(JSONObject o1, JSONObject o2) {//降序
                    System.out.println("000"+o2.getDouble("price"));
                    if(o1.getDouble("price")>o2.getDouble("price"))return -1;
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
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        List<TagEntity> tagList = appService.getAllTags();
        out.println(JSONArray.fromObject(tagList));
        System.out.println(JSONArray.fromObject(tagList));
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/Test")
    private void processTags(@RequestParam("restaurant") String restaurant,
                             @RequestParam("floor") int floor,
                             @RequestParam("windowId") int windowId,
                             @RequestParam("tagList") ArrayList<Integer> tagList,
                             HttpServletRequest request,
                             HttpServletResponse response)  throws Exception {
        response.setContentType("application/json;charset=utf-8");
        System.out.println("restaurant:"+restaurant);
        System.out.println("floor:"+floor);
        System.out.println("windowId:"+windowId);
        System.out.println("tagList"+tagList.size());
        List<FoodEntity> Foods = appService.getAllFoodByWindowid(windowId);
        List<Integer> tagId = tagList;
        List<FoodEntity> result = appService.getFoodsByTags(tagId,Foods);
        PrintWriter out = response.getWriter();
        out.println(JSONArray.fromObject(result).toString());
        out.flush();
        out.close();
    }

}
