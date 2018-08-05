package lakers.ingram.Action;

import lakers.ingram.ImgUtil.ImgUtil;
import lakers.ingram.ModelEntity.WindowEntity;
import lakers.ingram.OSUtil.OSUtil;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping(value = "/Window")
public class WindowAction extends HttpServlet {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/FloorListByRestaurant")
    private void processFloorList(@RequestParam("restaurant") String restaurant,
                                HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        List<Integer> FloorList = appService.getFloorListByRestaurant(restaurant);

        Iterator it = FloorList.iterator();

        ArrayList<Integer> arrayList = new ArrayList<Integer>();
        arrayList.add(0);
        while (it.hasNext()){
            Integer x = (Integer) it.next();
            arrayList.add(x);
        }
        System.out.println(JSONArray.fromObject(arrayList));
        out.println(JSONArray.fromObject(arrayList));
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/WindowsByRestaurantFloor")
    private void processWindowRestaurantAndFloor(@RequestParam("restaurant") String restaurant,
                                                 @RequestParam("floor") int floor,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response)  throws Exception {
            response.setContentType("application/json;charset=utf-8");
            List<WindowEntity> Windows = new ArrayList<WindowEntity>();
            if(floor==0) {
                Windows = appService.getAllWindowsByRestaurant(restaurant);
            }
            else {
                Windows = appService.getAllWindowsByRestaurantAndFloor(restaurant,floor);
            }
            PrintWriter out = response.getWriter();

             System.out.println(JSONArray.fromObject(Windows));
             out.println(JSONArray.fromObject(Windows));
             out.flush();
             out.close();
    }

    @RequestMapping(value = "/GetPic")
    private void processGetPic(@RequestParam("windowId") int windowId  ,HttpServletResponse response)  throws Exception {
        PrintWriter out = response.getWriter();
        String path = "";
        if (OSUtil.getOS().contains("Mac")){
            path = "/Users/myu/Downloads/eat/window/";
        }
        else if (OSUtil.getOS().contains("Windows")){
            path = "C:\\webImages\\window\\";
        }
        ArrayList<String> arrayList = new ArrayList<String>();
        arrayList.add("data:image/*;base64,"+ImgUtil.getImgStr(path+String.valueOf(windowId)+".jpg"));
        out.println(JSONArray.fromObject(arrayList));
        out.flush();
        out.close();
    }
}
