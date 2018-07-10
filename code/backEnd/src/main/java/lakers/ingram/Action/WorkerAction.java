package lakers.ingram.Action;

import lakers.ingram.ModelEntity.AdminEntity;
import lakers.ingram.ModelEntity.WorkerEntity;
import lakers.ingram.service.AppService;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
@RequestMapping(value = "/Worker")
public class WorkerAction extends HttpServlet {

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
            WorkerEntity worker=appService.getWorkerById(Integer.valueOf(id));
            if (worker!=null){
                if (password.equals(worker.getPassword())){
                    request.getSession().setAttribute("windowid",id);
                    out.println("you are from window "+id);
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
        request.getSession().setAttribute("windowid",-1);
    }

    @RequestMapping(value = "/UpdatePic")
    private void execute(@RequestParam("WindowID") String windowid,
                         @RequestParam("files[]") MultipartFile file,
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
            // 构建上传目录及文件对象，不存在则自动创建
            String path = "C:\\webImages\\";
            File imgFile = new File(path, headImg);
            file.transferTo(imgFile);
            String result=appService.newFoodPic(imgFile,windowid);
            out.print(result);
        }
    }
}
