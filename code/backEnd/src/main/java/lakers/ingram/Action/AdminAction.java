package lakers.ingram.Action;

import lakers.ingram.ModelEntity.*;
import lakers.ingram.OSUtil.OSUtil;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/Admin")
public class AdminAction extends HttpServlet {

    @Autowired
    private AppService appService;

    @RequestMapping(value = "/Login")
    private void processLogin(@RequestParam("id") String id,
                              @RequestParam("password") String password,
                              HttpServletRequest request,
                              HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        if (!NumberUtils.isNumber(id)){out.println("fail");}
        else{
            AdminEntity admin=appService.getAdminById(Integer.valueOf(id));
            if (admin!=null){
                if (password.equals(admin.getPassword())){
                    request.getSession().setAttribute("adminid",id);
                    out.println("admin "+id);
                }
                else{
                    out.println("fail");
                }
            }
            else{
                out.println("fail");
            }
        }
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/Logout")
    private void processLogout(HttpServletRequest request){
        request.getSession().setAttribute("adminid",-1);
    }

    @RequestMapping(value="/State")
    private void processState(HttpServletRequest request,HttpServletResponse response) throws IOException{
        Object obj=request.getSession().getAttribute("adminid");
        PrintWriter out = response.getWriter();
        if (obj!=null){
            String adminid=obj.toString();
            if (!adminid.equals("-1")){
                out.println(adminid);
            }
            else{
                out.println("-1");
            }
        }
        else{
            out.println("-1");
        }
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/showUsers", method = RequestMethod.GET)
    public void showUsers(HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        List<UserEntity> userList =  appService.getAllUsers();
        JSONArray jsonArray = new JSONArray();
        jsonArray.add(userList.size());
        jsonArray.addAll(userList);

        out.print(jsonArray);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/deleteUsers", method = RequestMethod.POST)
    public void deleteUsers(@RequestParam("UserID") int[] userIDs,
                           HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        appService.deleteUsers(userIDs);
        out.print("delete SUCCESS!");
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/freezeUsers")
    public void freezeUser(@RequestParam("UserID") int[] userIDs,
                           HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        for (int id: userIDs)
        {
            UserEntity user = appService.getUserById(id);
            if(user != null)
            {
                appService.freezeUser(user);
            }
        }
        out.print("freeze SUCCESS!");
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/activateUsers")
    public void activateUser(@RequestParam("UserID")int[] userIDs,
                             HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        for (int id: userIDs)
        {
            UserEntity user = appService.getUserById(id);
            if(user != null)
            {
                appService.activateUser(user);
            }
        }
        out.print("activate SUCCESS!");
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/ShowNews", method = RequestMethod.GET)
    public void showNews(HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();
        List<WindowEntity> todayList =  appService.getAllNews();
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(todayList);
        out.print(jsonArray);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/checkWindow", method = RequestMethod.GET)
    public void registerWindow(@RequestParam("windowID") int windowID,
                               HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        JSONArray FoodList = appService.ShowWindowFood(windowID);
        out.print(FoodList);

        out.flush();
        out.close();
    }

    @RequestMapping(value = "/fetchWindowPic", method = RequestMethod.GET)
    public void fetchWindowPic(@RequestParam("windowID") int windowID,
                               HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");

        OutputStream out = response.getOutputStream();
        appService.getNewPicByWindowID(windowID, out);

        out.flush();
        out.close();
    }

    @RequestMapping(value = "/showComments", method = RequestMethod.GET)
    public void showComments(HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        List<CommentEntity> comments = appService.getAllComments();
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(comments);
        out.print(jsonArray);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/deleteComments", method = RequestMethod.POST)
    public void deleteComments(@RequestParam("deletedCommentIDs") int[] commentIDs,
                               HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        for(int commentID : commentIDs)
        {
            appService.CommentDelete(commentID);
        }
        out.print("delete SUCCESS!");
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/AddTodayFood/ExistedFood", method = RequestMethod.POST)
    public void addTodayFoodExisted(@RequestParam("ExistedFood") int[] foodIDArr,
                                    @RequestParam("windowID") Integer windowId,
                                    HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();
        appService.deleteAllTodayFoodByWindowId(windowId);
        for(int foodId:foodIDArr){
            appService.addNewTodayFood(foodId,windowId);
        }
        out.print("success");
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/AddTodayFood/NewFood", method = RequestMethod.POST)
    public void addTodayFoodNew(@RequestParam("windowID") Integer windowID,
                                @RequestParam("foodName") String name,
                                @RequestParam("foodPrice") Double price,
                                @RequestParam("foodTip") String tip,
                                @RequestParam("tags") int[] tags,
                                HttpServletResponse response)
            throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();
        FoodEntity food = appService.addFoodNew(name,price,tip,windowID);
        Integer foodId=food.getFoodId();
        appService.addNewTodayFood(foodId,windowID);
        appService.addFoodTag(foodId,tags);
        out.print(foodId);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/UploadNewFoodPic")
    private void uploadNewFoodPic(@RequestParam("foodID") Integer foodID,
                                  @RequestParam("files[]") MultipartFile file,
                                  HttpServletResponse response)
            throws Exception {
        response.setCharacterEncoding("utf-8");
        response.setContentType("image/*");
        PrintWriter out = response.getWriter();
        String headImg;
        if (file != null && !file.isEmpty()) {
            headImg = file.getOriginalFilename();
            // 构建上传目录及文件对象，不存在则自动创建
            String path = "";
            if (OSUtil.getOS().contains("Mac")){
                path = "/Users/myu/Downloads/eat/food";
            }
            else if (OSUtil.getOS().contains("Windows")){
                path = "C:\\webImages\\food";
            }
            File imgFile = new File(path, foodID.toString()+".jpg");
            file.transferTo(imgFile);
            String result = appService.uploadNewFoodPic(imgFile,foodID);
            out.print(result);
        }
    }
}
