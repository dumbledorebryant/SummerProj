package lakers.ingram.Action;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.encode.MD5Util;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
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
            ur.add("-1");

        }

        out.println(JSONArray.fromObject(ur));
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/State")
    private void processState(HttpServletRequest request,HttpServletResponse response) throws IOException {
        Object obj=request.getSession().getAttribute("userid");
        ArrayList<String> ur=new ArrayList<String>();
        PrintWriter out = response.getWriter();
        if (obj==null){ur.add("-1");}
        else{
            String id=obj.toString();
            ur.add(id);
            if (!id.equals("-1")){ur.add(request.getSession().getAttribute("username").toString());}
        }
        out.println(JSONArray.fromObject(ur));
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/UserInfo")
    private void processGetUserInfo(
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        Object obj=request.getSession().getAttribute("userid");
        ArrayList<String> ur=new ArrayList<String>();
        PrintWriter out = response.getWriter();
        if (obj==null){ur.add("-1");}
        else{
            String id=obj.toString();
            ur.add(id);
            if (!id.equals("-1")){
                UserEntity user=appService.getUserById(Integer.valueOf(id));
                ur.add(user.getUsername());
                ur.add(user.getPassword());
                ur.add(user.getEmail());
                ur.add(user.getPhone());
            }
        }
        out.println(JSONArray.fromObject(ur));
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/HandleUserInfoChange")
    private void processChangeUserInfo(@RequestParam("userID") Integer userID,
                              @RequestParam("username") String username,
                              @RequestParam("password") String password,
                              @RequestParam("phone") String phone,
                              @RequestParam("email") String email,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        UserEntity user=new UserEntity(userID,username,password,email,phone);
        String result=appService.handleUserInfo(user);
        out.print(result);
        out.flush();
        out.close();
    }


    @RequestMapping(value = "/UpdatePic")
    private void processLogin(@RequestParam("files[]") MultipartFile file,
                              @RequestParam("userId") Integer userid,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        response.setCharacterEncoding("utf-8");
        response.setContentType("image/*");
        PrintWriter out = response.getWriter();
        System.out.println("file: " + file);
        String headImg;
        if (file != null && !file.isEmpty()) {
            headImg = file.getOriginalFilename();
            String path = "C:\\webImages\\";
            File imgFile = new File(path, headImg);
            file.transferTo(imgFile);
            String result = appService.updatePic(imgFile, userid);
            out.print(result);
            out.flush();
            out.close();
        }
    }

    @RequestMapping(value = "/GetPic")
    private void showPic(@RequestParam("userID") Integer userid,
                         HttpServletRequest request,
                         HttpServletResponse response)
            throws Exception {
        response.setCharacterEncoding("utf-8");
        response.setContentType("image/*");
        OutputStream out = response.getOutputStream();
        MongoClient mongo = new MongoClient();
        DB mongodb = mongo.getDB("Portrait");
        GridFS gfsPhoto = new GridFS(mongodb, "Images");
        GridFSDBFile imageForOutput = gfsPhoto.findOne(userid.toString());
        if (imageForOutput!=null){
            imageForOutput.writeTo(out);
        }
        out.flush();
        out.close();
        mongo.close();
    }

    @RequestMapping(value = "/PassWordCheck")
    private void processChangeUserInfo(@RequestParam("userID") Integer userID,
                                       @RequestParam("password") String password,
                                       HttpServletRequest request,
                                       HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        UserEntity user=appService.getUserById(userID);
        String encodePwd=lakers.ingram.encode.MD5Util.md5Encode(password);
        String result="success";
        if(!encodePwd.equals(user.getPassword())){
           result="fail";
        }
        System.out.println("check1:"+user.getPassword());
        System.out.println("check2:"+encodePwd);
        out.print(result);
        out.flush();
        out.close();
    }


}
