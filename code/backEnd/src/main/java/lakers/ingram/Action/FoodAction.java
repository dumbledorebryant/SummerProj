package lakers.ingram.Action;

import lakers.ingram.ImgUtil.ImgUtil;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.TagEntity;
import lakers.ingram.ModelEntity.ViewhistoryEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import lakers.ingram.OSUtil.OSUtil;
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
                    if(userId!=-1) {
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
        JSONArray arr5 = AddFoodPic(arr4);
        out.println(arr5.toString());

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

    private JSONArray AddFoodPic(JSONArray arr){
        JSONArray arr2 = new JSONArray();
        for(int i= 0;i<arr.size();i++){
            JSONObject food = arr.getJSONObject(i);
            int foodId = food.getInt("foodId");
            //   String userName= appService.getUserById((int)comment.get("userId")).getUsername();
            //String path = "/Users/myu/Downloads/eat/"+String.valueOf(foodId)+".jpg";
            String path = "";
            if (OSUtil.getOS().contains("Mac")){
                path = "/Users/myu/Downloads/eat/food/"+String.valueOf(foodId)+".jpg";
            }
            else if (OSUtil.getOS().contains("Windows")){
                path = "C:\\webImages\\food\\"+String.valueOf(foodId)+".jpg";
            }
            String imgBase = ImgUtil.getImgStr(path);
            if (imgBase.equals("error")){
                imgBase= "data:image/*;base64,"
                        +"/9j/4QBkRXhpZgAATU0AKgAAAAgABYdpAAQAAAABAAAASgESAAQAAAABAAAAAAEBAAMAAAABADAAAAEyAAIAAAABAAAAAAEAAAMAAAABADAAAAAAAAAAAZIIAAQAAAABAAAAAAAAAAD/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wgARCAAwADADASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAGAEAAwEBAAAAAAAAAAAAAAAAAQIDAAT/2gAMAwEAAhADEAAAAddVWBI9CskuaGZvQMFsac1Lo1I/BCHA62T56rf5xFdRVW89LSAXV5//xAAfEAADAAICAgMAAAAAAAAAAAABAgMABBETEiIFISP/2gAIAQEAAQUCwsAH2VebtWOSoKJladaeHIG6KXptrELR0CnnKkNap8p6yxyjwtdjOUdRvHHYivJ5aZrEmgwoBr/HD97x7Miiu+EA5Wntqw6UH3k6ns9jjNdQwoYLww//xAAaEQACAwEBAAAAAAAAAAAAAAAAAQIQEQMS/9oACAEDAQE/AVcIaPmeFhB02f/EABkRAAMAAwAAAAAAAAAAAAAAAAABAhARIf/aAAgBAgEBPwFtYRQqE9lnSD//xAApEAACAgAEBAUFAAAAAAAAAAABAgARAxIxURMhIkEQI0JhgTJxcpHB/9oACAEBAAY/ApZNVrG4JZj7IYfMxa9IAuvvczBlb8T4M9aCXjnMe+wnAw1Un3OsJxFIYdpx1wxwn1yNLir2Tn89v7HW+oipnygYgFGddHDK0T2/cCpWUDku84DNmpQRMde9Zll3Acqs4rWXxFFeio7olWdoTssBU5XXQxs2EFdTzrw5qD8QYagFjvN2OsuY4H1EkrOg47H35QWwzn0qtzO9DETqEDbz/8QAJBAAAQQCAQMFAQAAAAAAAAAAAQARITFBYVGBkbEQcaHB4dH/2gAIAQEAAT8hRIwWYTvTgFr3ZkGnYhRkHKBuUFwA+jmZA3pPllT6VxdCIZRBU9BC8Tt+E9FBNwjdBBAAYIdY2JPX5IAPJBOk/Y8qbYBltjFmSIwx8oOg3KQalHDei2wR47qIjh3Bm8j5Qv7o4hAoXpCDMLMDbymluFmRkvwok9Hcj+K6Me7vpUzs09x6FuoJwEcU6oJw9g4EqTA0USFfZxBrwgzWZMA7hBEcESHuXhAYyRY1+QiDqEEdZX//2gAMAwEAAgADAAAAEPvbo92gS+//xAAZEQEBAQADAAAAAAAAAAAAAAABABEQITH/2gAIAQMBAT8QGzwQuySjls/l/8QAGREBAQEBAQEAAAAAAAAAAAAAAAERMSFB/9oACAECAQE/EGy/HDpNseGl2P/EACEQAQEAAgICAwADAAAAAAAAAAERACExQVFhEIGhcZHB/9k=";
            }
            else{
                imgBase = "data:image/*;base64,"+imgBase;
            }
            food.put("picture",imgBase);
            arr2.add(food);
        }
        return arr2;
    }

    @RequestMapping(value = "/GetPic")
    private void processGetPic(
                               @RequestParam("foodId") int foodId,
                               HttpServletResponse response)  throws Exception {
        PrintWriter out = response.getWriter();
        String path = "";
        if (OSUtil.getOS().contains("Mac")){
            path = "/Users/myu/Downloads/eat/food/";
        }
        else if (OSUtil.getOS().contains("Windows")){
            path = "C:\\webImages\\food\\";
        }
        ArrayList<String> arrayList = new ArrayList<String>();
        arrayList.add("data:image/*;base64,"+ImgUtil.getImgStr(path+String.valueOf(foodId)+".jpg"));
        out.println(JSONArray.fromObject(arrayList));
        out.flush();
        out.close();
    }
}
