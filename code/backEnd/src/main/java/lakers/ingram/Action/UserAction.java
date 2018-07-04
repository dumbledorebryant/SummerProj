package lakers.ingram.Action;

import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.encode.MD5Util;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@RestController
@RequestMapping(value = "/User")
public class UserAction extends HttpServlet {

    @Autowired
    private AppService appService;

    @RequestMapping(value = "/Login")
    private void processLogin(@RequestParam("username") String name,
                              @RequestParam("password") String password,
                                HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        UserEntity user=appService.getUserByName(name);
        if (user!=null){
            if (user.getValid()==0){     //invalid user
                ArrayList<String> ur=new ArrayList<String>();
                ur.add("-2");
                out.println(JSONArray.fromObject(ur));
            }
            else if (MD5Util.md5Encode(password).equals(user.getPassword())){ //success
                HttpSession session=request.getSession();
                session.setAttribute("userid",user.getUserId());
                session.setAttribute("username",user.getUsername());
                session.setAttribute("phone",user.getPhone());
                session.setAttribute("email", user.getEmail());

                ArrayList<String> ur=new ArrayList<String>();
                ur.add(String.valueOf(user.getUserId()));
                ur.add(user.getUsername());
                ur.add(user.getPassword());
                ur.add(user.getPhone());
                ur.add(user.getEmail());
                out.println(JSONArray.fromObject(ur));
            }
            else{  //wrong password
                ArrayList<String> ur=new ArrayList<String>();
                ur.add("0");
                out.println(JSONArray.fromObject(ur));
            }
        }
        else{  //username no existence
            ArrayList<String> ur=new ArrayList<String>();
            ur.add("-1");
            out.println(JSONArray.fromObject(ur));
        }
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/Logout")
    private void processLogout(HttpServletRequest request){
        request.getSession().setAttribute("userid",-1);
    }

    @RequestMapping(value = "/Register")
    private void processRegister(@RequestParam("username") String name,
                                 @RequestParam("password") String password,
                                 @RequestParam("email") String email,
                                 @RequestParam("phone") String phone,
                                 HttpServletResponse response) throws Exception {
        PrintWriter out = response.getWriter();
        ArrayList<String> ur=new ArrayList<String>();
        UserEntity us=appService.getUserByPhone(phone);
        if (us==null){  //success
            us=appService.getUserByName(name);
            if (us==null){
                Byte v=1;
                UserEntity user=new UserEntity(name,MD5Util.md5Encode(password),email,phone,v);
                int id=appService.addUser(user);
                ur.add(String.valueOf(id));
            }
           else{
                ur.add("0"); //repeat name
            }
        }
        else{  //repeat phone
            ur.add("0");

        }

        out.println(JSONArray.fromObject(ur));
        out.flush();
        out.close();
    }

}
