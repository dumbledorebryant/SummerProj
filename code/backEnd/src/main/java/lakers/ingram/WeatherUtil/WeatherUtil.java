package lakers.ingram.WeatherUtil;

import net.sf.json.JSON;
import net.sf.json.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class WeatherUtil {
    public static JSONObject getTodayWeather(String Cityid)
            throws IOException, NullPointerException {
        // 连接中央气象台的API
        URL url = new URL("http://www.weather.com.cn/data/cityinfo/" + Cityid
                + ".html");
        URLConnection connectionData = url.openConnection();
        connectionData.setConnectTimeout(1000);
        JSONObject res=new JSONObject();
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    connectionData.getInputStream(), "UTF-8"));
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = br.readLine()) != null)
                sb.append(line);
            String data = sb.toString();
            System.out.println(data);
            JSONObject jsonData = JSONObject.fromObject(data);
            JSONObject info = jsonData.getJSONObject("weatherinfo");
            res.put("high",info.getString("temp1").toString()
                    .substring(0,info.getString("temp1").toString().length()-1));
            res.put("low",info.getString("temp2").toString()
                    .substring(0,info.getString("temp2").toString().length()-1));
            res.put("type",info.getString("weather").toString());
            res.put("date",new Timestamp(new Date().getTime()));
        } catch (SocketTimeoutException e) {
            System.out.println("连接超时");
        } catch (FileNotFoundException e) {
            System.out.println("加载文件出错");
        }

        return res;

    }

    public static void main(String[] args) {
        try {
            JSONObject res = getTodayWeather("101020200");
            System.out.println(res);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}