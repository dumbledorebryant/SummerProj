package lakers.ingram.Action;

import lakers.ingram.ModelEntity.WeatherEntity;
import lakers.ingram.WeatherUtil.WeatherUtil;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/Weather")
public class WeatherAction extends HttpServlet {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/Get")
    private void processGet(@RequestParam("time") String time, HttpServletResponse response) throws Exception {
        PrintWriter out = response.getWriter();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=sdf.parse(time);
        List<WeatherEntity> res=appService.getWeatherByTime(new Timestamp(date.getTime()));
        ArrayList<WeatherEntity> arrayList = new ArrayList<WeatherEntity>();
        System.out.println(JSONArray.fromObject(res));
        out.println(JSONArray.fromObject(res));
        out.flush();
        out.close();
    }
}
