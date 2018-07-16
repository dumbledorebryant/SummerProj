package lakers.ingram.Action;

import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@RestController
@RequestMapping(value = "/ViewHistory")
public class ViewHistoryAction {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/GetViewHistory")
    private void processLogin(
            @RequestParam("userID") Integer userId,
            HttpServletRequest request,
            HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        JSONArray result=appService.getViewHistory( userId);
        out.print(result);
    }

    @RequestMapping(value = "/UpdateViewHistory")
    private void processLogin(
            @RequestParam("userID") Integer userId,
            @RequestParam("deleteID") JSONArray deleteId,
            HttpServletRequest request,
            HttpServletResponse response)
            throws Exception {
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        String result=appService.updateViewHistory(userId,deleteId);
        out.print(result);
    }
}
