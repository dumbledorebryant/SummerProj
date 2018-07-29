package lakers.ingram.Action;


import lakers.ingram.ImgUtil.ImgUtil;
import lakers.ingram.OSUtil.OSUtil;
import net.sf.json.JSONArray;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@RestController
@RequestMapping(value = "/Img")
public class ImgAction extends HttpServlet {

    @RequestMapping(value = "/Adver")
    private void processAdver(HttpServletRequest request,
                              HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        ArrayList<String> arrayList = new ArrayList<String>();
        String path = "";
        if (OSUtil.getOS().contains("Mac")){
            path = "/Users/myu/Downloads/eat/adver/";
        }
        else if (OSUtil.getOS().contains("Windows")){
            path = "C:\\webImages\\adver\\";
        }
        for (int i=1;i<4;i++){
            arrayList.add("data:image/*;base64,"+ImgUtil.getImgStr(path+String.valueOf(i)+".jpg"));
        }
        out.println(JSONArray.fromObject(arrayList));
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/Restaurant")
    private void processRest(HttpServletRequest request,
                              HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        ArrayList<String> arrayList = new ArrayList<String>();
        String path = "";
        if (OSUtil.getOS().contains("Mac")){
            path = "/Users/myu/Downloads/eat/restaurant/";
        }
        else if (OSUtil.getOS().contains("Windows")){
            path = "C:\\webImages\\restaurant\\";
        }
        for (int i=1;i<7;i++){
            arrayList.add("data:image/*;base64,"+ImgUtil.getImgStr(path+String.valueOf(i)+".jpg"));
        }
        out.println(JSONArray.fromObject(arrayList));
        out.flush();
        out.close();
    }
}
