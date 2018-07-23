package lakers.ingram.Action;

import lakers.ingram.ModelEntity.AdminEntity;
import lakers.ingram.ModelEntity.CommentEntity;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

        Map<String, String> FoodList = appService.ShowWindowFood(windowID);
        JSONObject jsonobject = JSONObject.fromObject(FoodList);
        out.print(jsonobject);
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
}
