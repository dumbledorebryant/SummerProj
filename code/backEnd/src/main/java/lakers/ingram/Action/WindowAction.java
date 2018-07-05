package lakers.ingram.Action;

import lakers.ingram.ModelEntity.UserEntity;
import lakers.ingram.ModelEntity.WindowEntity;
import lakers.ingram.encode.MD5Util;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
        PrintWriter out = response.getWriter();
        List<Integer> FloorList = appService.getFloorListByRestaurant(restaurant);

        Iterator it = FloorList.iterator();

        ArrayList<Integer> arrayList = new ArrayList<Integer>();
        arrayList.add(0);
        while (it.hasNext()){
            Integer x = (Integer) it.next();
            System.out.println(x);
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

            List<WindowEntity> Windows = new ArrayList<WindowEntity>();
            if(floor==0) {
                Windows = appService.getAllWindowsByRestaurant(restaurant);
            }
            else {
                Windows = appService.getAllWindowsByRestaurantAndFloor(restaurant,floor);
            }
            PrintWriter out = response.getWriter();

            Iterator it = Windows.iterator();
            ArrayList<JSONArray> qJ = new ArrayList<JSONArray>();
            WindowEntity win = new WindowEntity();
             while (it.hasNext()) {
                 WindowEntity w= (WindowEntity) it.next();
                 ArrayList<String> arrayList = new ArrayList<String>();
                 arrayList.add(String.valueOf(w.getWindowId()));
                 arrayList.add(String.valueOf(w.getRestaurant()));
                 arrayList.add(String.valueOf(w.getWindowName()));
                 arrayList.add(String.valueOf(w.getFloor()));
                 qJ.add(JSONArray.fromObject(arrayList));
             }

             JSONArray q = JSONArray.fromObject(qJ.toArray());
             System.out.println(q);
            out.println(q);
            out.flush();
            out.close();
    }


}
