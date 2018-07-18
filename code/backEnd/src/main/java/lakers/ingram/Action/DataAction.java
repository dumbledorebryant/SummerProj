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
import java.sql.Time;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.sql.Time;

@RestController
@RequestMapping(value = "/Data")
public class DataAction extends HttpServlet {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/Init")
    private void processInit(@RequestParam("time") String time,
                             @RequestParam("window") Integer windowId,
                              HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=sdf.parse(time);
        List<DataEntity> ls=appService.getInitDataByDate(new Timestamp(date.getTime()),windowId);
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
    private void processCurrent(@RequestParam("window") Integer windowId,
                                HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        DataEntity dt=appService.getCurrentData(windowId);
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
                             @RequestParam("window") Integer windowId,
                             HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=sdf.parse(time);
        List<DataEntity> ls=appService.getYesterdayDataByDate(new Timestamp(date.getTime()), windowId);
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
                                       @RequestParam("window") Integer windowId,
                                HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=sdf.parse(time);
        DataEntity res=appService.getCurrentYesterdayDataByDate(new Timestamp(date.getTime()),windowId);
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

    //suppose no data lost
    @RequestMapping(value = "/HopeInit")
    private void processHope(@RequestParam("time") String time,
                                @RequestParam("window") Integer windowId,
                                HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=sdf.parse(time);
        List<DataEntity> ls1=appService.getDataByDate1(new Timestamp(date.getTime()), windowId);
        List<DataEntity> ls2=appService.getDataByDate2(new Timestamp(date.getTime()), windowId);
        List<DataEntity> ls3=appService.getDataByDate3(new Timestamp(date.getTime()), windowId);

        ArrayList<JSONArray> res =new ArrayList<JSONArray>();
        for (int i=0;i<ls3.size();i++){
            DataEntity data1=ls1.get(i);
            DataEntity data2=ls2.get(i);
            DataEntity data3=ls3.get(i);
            ArrayList<String> arrayList = new ArrayList<String>();
            int number=(data1.getNumber()+data2.getNumber()+data3.getNumber())/3;
            arrayList.add(String.valueOf(number));
            arrayList.add(data1.getDate().toString());
            res.add(JSONArray.fromObject(arrayList));
        }
        JSONArray rest=JSONArray.fromObject(res.toArray());
        out.println(rest);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/HopeCurrent")
    private void processHopeCurrent(@RequestParam("time") String time,
                                       @RequestParam("window") Integer windowId,
                                       HttpServletResponse response)
            throws Exception {
        PrintWriter out = response.getWriter();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=sdf.parse(time);
        DataEntity data1=appService.getCurrentDataByDate1(new Timestamp(date.getTime()),windowId);
        DataEntity data2=appService.getCurrentDataByDate2(new Timestamp(date.getTime()),windowId);
        DataEntity data3=appService.getCurrentDataByDate3(new Timestamp(date.getTime()),windowId);
        ArrayList<String> arrayList = new ArrayList<String>();
        if (data1!=null && data2!=null && data3!=null){
            int number=(data1.getNumber()+data2.getNumber()+data3.getNumber())/3;
            arrayList.add(String.valueOf(number));
            arrayList.add(data1.getDate().toString());
        }
        JSONArray rest=JSONArray.fromObject(arrayList);
        out.println(rest);
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/GetTime")
    private void processGetTime(@RequestParam("window")Integer windowId,
                                HttpServletResponse response) throws Exception{
        PrintWriter out = response.getWriter();
        Timestamp time=appService.getTimeByWindowId(windowId);
        out.println(time.toString());
        out.flush();
        out.close();
    }
}
