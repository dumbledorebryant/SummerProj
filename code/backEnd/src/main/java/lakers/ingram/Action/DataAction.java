package lakers.ingram.Action;

import lakers.ingram.ModelEntity.DataEntity;
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
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping(value = "/Data")
public class DataAction extends HttpServlet {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/Init")
    private void processInit(@RequestParam("time") String time,
                              HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=sdf.parse(time);
        List<DataEntity> ls=appService.getInitDataByDate(new Timestamp(date.getTime()));
        Iterator its=ls.iterator();
        ArrayList<JSONArray> res =new ArrayList<JSONArray>();
        while (its.hasNext()){
            DataEntity it=(DataEntity)its.next();
            ArrayList<String> arrayList = new ArrayList<String>();
            arrayList.add(it.getNumber().toString());
            arrayList.add(it.getDate().toString());
            res.add(JSONArray.fromObject(arrayList));
        }
        JSONArray rest=JSONArray.fromObject(res.toArray());
        out.println(rest);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/Current")
    private void processCurrent(HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        DataEntity dt=appService.getCurrentData();
        ArrayList<String> arrayList = new ArrayList<String>();
        arrayList.add(dt.getNumber().toString());
        arrayList.add(dt.getDate().toString());
        JSONArray rest=JSONArray.fromObject(arrayList);
        out.println(rest);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/HistoryInit")
    private void processHistory(@RequestParam("time") String time,
                             HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=sdf.parse(time);
        List<DataEntity> ls=appService.getHistoryDataByDate(new Timestamp(date.getTime()));
        Iterator its=ls.iterator();
        ArrayList<JSONArray> res =new ArrayList<JSONArray>();
        while (its.hasNext()){
            DataEntity it=(DataEntity)its.next();
            ArrayList<String> arrayList = new ArrayList<String>();
            arrayList.add(it.getNumber().toString());
            arrayList.add(it.getDate().toString());
            res.add(JSONArray.fromObject(arrayList));
        }
        JSONArray rest=JSONArray.fromObject(res.toArray());
        out.println(rest);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/HistoryCurrent")
    private void processHistoryCurrent(@RequestParam("time") String time,
                                HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=sdf.parse(time);
        DataEntity res=appService.getCurrentHistoryDataByDate(new Timestamp(date.getTime()));
        ArrayList<String> arrayList = new ArrayList<String>();
        if (res!=null){
            arrayList.add(res.getNumber().toString());
            arrayList.add(res.getDate().toString());
        }
        JSONArray rest=JSONArray.fromObject(arrayList);
        out.println(rest);
        out.flush();
        out.close();
    }
}
