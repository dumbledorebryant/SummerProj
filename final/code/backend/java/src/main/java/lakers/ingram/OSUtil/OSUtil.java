package lakers.ingram.OSUtil;

public class OSUtil {

    public static String getOS(){
        return System.getProperties().getProperty("os.name");
    }
}
