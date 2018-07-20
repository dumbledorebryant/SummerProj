package lakers.ingram.Action;


import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.lang.reflect.Array;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@RestController
@RequestMapping(value = "/UserTag")
public class UserTagAction {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/SearchSavedTag")
    private void execute(@RequestParam("userID") String userID,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        Integer userid=Integer.parseInt(userID);
        JSONArray result=appService.listUserTag(userid);
        out.print(result);
    }

    @RequestMapping(value = "/ChooseTag")
    private void processLogin(@RequestParam("tagArray") JSONArray tagArray,
                              @RequestParam("userID") Integer userID,
                              HttpServletRequest request,
                              HttpServletResponse response)
            throws Exception {
        response.setContentType("text/html;charset=utf-8");
        System.out.println("array:"+tagArray);
        PrintWriter out = response.getWriter();
        String result=appService.sendTags(userID,tagArray);
        out.print(result);
    }

    @RequestMapping(value = "/ShowTags")
    private void processLogin(
            HttpServletRequest request,
            HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        JSONArray result=appService.showTags();
        out.print(result);
    }

    @RequestMapping(value = "/SearchNewAddTag")
    private void processLogin(
            @RequestParam("tagName") String tagName,
            HttpServletRequest request,
            HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        JSONObject result=appService.showTags(tagName);
        out.print(result);
    }

    @RequestMapping(value = "/UserTagRelatedFood/search")
    private void processLogin(
            @RequestParam("userId") Integer userId,
            HttpServletRequest request,
            HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        JSONArray result=appService.searchUserTagRelatedFood(userId);
        out.print(result);
    }

    @RequestMapping(value = "/UpdateUserDislikeTag")
    private void processLogin(
            @RequestParam("userId") Integer userId,
            @RequestParam("dislikeTags") JSONArray dislikeTags,
            HttpServletRequest request,
            HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        String result=appService.updateUserDislikeTag(userId,dislikeTags);
        out.print(result);
    }

    @RequestMapping(value = "/ShowFoodTags")
    private void showFoodTags(
            HttpServletRequest request,
            HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        JSONArray result=appService.allFoodTags();
        out.print(result);
    }



}

