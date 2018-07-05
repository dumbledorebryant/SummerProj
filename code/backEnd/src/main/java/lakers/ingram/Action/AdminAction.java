package lakers.ingram.Action;

import lakers.ingram.ModelEntity.AdminEntity;
import lakers.ingram.service.AppService;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

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

}
