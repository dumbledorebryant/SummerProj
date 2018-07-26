package lakers.ingram.Action;

import lakers.ingram.ImgUtil.ImgUtil;
import lakers.ingram.ModelEntity.CommentEntity;
import lakers.ingram.ModelEntity.FoodEntity;
import lakers.ingram.ModelEntity.WindowEntity;
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
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping(value = "/Comment")
public class CommentAction extends HttpServlet {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/Save")//发表评论
    private void processSaveComment(
            @RequestParam("windowId") int windowId,
            @RequestParam("commentContent") String commentContent,
            HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        response.setContentType("application/json;charset=utf-8");
        Integer userId=Integer.valueOf(request.getSession().getAttribute("userid").toString());
        CommentEntity comment = new CommentEntity();
        comment.setUserId(userId);
        comment.setWindowId(windowId);
        comment.setCommentContent(commentContent);
        comment.setValid((byte)1);
        appService.CommentSave(comment);
        PrintWriter out = response.getWriter();
        List<CommentEntity>commentList = appService.CommentListGetByWindowId(windowId,(byte)1);
        JSONArray arr = JSONArray.fromObject(commentList);
        JSONArray arr2 = CommentEntityAddHeadPic(arr);
        JSONArray arr3 = CommentEntityAddUserName(arr2);
        out.println(arr3.toString());
        System.out.println(arr3.toString());
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/DeleteComment")//删除评论
    private void processDeleteComment(   @RequestParam("commentId") int commentId,
                                         @RequestParam("windowId") int windowId,
                                       HttpServletRequest request,
                                       HttpServletResponse response)  throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        appService.CommentDelete(commentId);
        List<CommentEntity>commentList = appService.CommentListGetByWindowId(windowId,(byte)1);
        JSONArray arr = JSONArray.fromObject(commentList);
        JSONArray arr2 = CommentEntityAddHeadPic(arr);
        JSONArray arr3 = CommentEntityAddUserName(arr2);
        out.println(arr3.toString());
        System.out.println(arr3.toString());
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/ManageComment")//封禁或解封评论
    private void processManageComment(@RequestParam("commentId") int commentId,
                                       @RequestParam("valid") int valid,
                                       HttpServletRequest request,
                                       HttpServletResponse response)  throws Exception {
       appService.CommentUpdate(commentId,valid);
        PrintWriter out = response.getWriter();
        out.flush();
        out.close();
    }

    @RequestMapping(value = "/AllCommentByWindowId")//拿到所有的评论列表
    private void processAllComment( @RequestParam("windowId") int windowId,
                                      HttpServletRequest request,
                                      HttpServletResponse response)  throws Exception {
        response.setContentType("application/json;charset=utf-8");
        List<CommentEntity>commentList = appService.CommentListGetByWindowId(windowId,(byte)1);
        PrintWriter out = response.getWriter();
        JSONArray arr = JSONArray.fromObject(commentList);
        JSONArray arr2 = CommentEntityAddHeadPic(arr);
        JSONArray arr3 = CommentEntityAddUserName(arr2);
        out.println(arr3.toString());
        System.out.println(arr3.toString());
        out.flush();
        out.close();
    }


    private JSONArray CommentEntityAddHeadPic(JSONArray arr){
        JSONArray arr2 = new JSONArray();
        for(int i= 0;i<arr.size();i++){
            JSONObject comment = arr.getJSONObject(i);
            int userId = comment.getInt("userId");
            //String path = "/Users/myu/Downloads/eat/"+String.valueOf(userId)+".jpg";
            String path = "C:\\webImages\\user\\"+String.valueOf(userId)+".jpg";
            String imgBase = ImgUtil.getImgStr(path);
            if (imgBase.equals("error")){
                imgBase = "data:image/*;base64,"  +
                        "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCAAwADADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAgUDBAYAAQf/xAAXAQADAQAAAAAAAAAAAAAAAAAAAgME/9oADAMBAAIQAxAAAAG2YcjTs6DSIGnw+0c+fdLEw2UVynR2xzLVhXL4bTKZewxaE+vp6jQv/8QAIRAAAgICAgEFAAAAAAAAAAAAAQIDBAARBRITEBUkMTL/2gAIAQEAAQUCOJrO7Q2ZLLyZVvyHAcA2F/Q7+XyurPHGkkZ36L9wsFsFO93kTAk3Ev8AGIHRTrLj4ZY9e4SNV4eVZJcRcAjWZa1Vzy8QEnE1TXrnWg2gWPlmtQTR8OE6rn//xAAcEQACAgIDAAAAAAAAAAAAAAAAAQIDEBESITH/2gAIAQMBAT8BNbHiEORKlxW8V+FljfR//8QAHBEAAgICAwAAAAAAAAAAAAAAAAECAxAREjJB/9oACAECAQE/ASbaK5cliU9EdeYt7FKP/8QAKhAAAgEDAgUEAQUAAAAAAAAAAQIAAxEhEjEEEyJBYRAyUVKBQoKxwdH/2gAIAQEABj8CnntKbhGqbjSm8RKQq06h9xdMgfwZTXiaOknp1Ag58jcTzD4glM0lVmvs2200cQmnX+sZU/5Odwr0uaPeuMiAj1p6iBf5PiFG4oVRXqBgoa9gM3/qUeGbhdS1NmXsY1Nn1mm5S/5xL3z6U8KQGyG2MAINJr3HTkHwbQM70/rcKbgjvKvKUqmkXvuTc59LnaIXsFN950v+3XKfKK/XQNx+JZ[表情]prdvEGMzaUmsWCm5AjLUFRR86do2OpTa+nNuxl/mf/EABsQAAMAAwEBAAAAAAAAAAAAAAABERAhQTFh/9oACAEBAAE/IQyMEU+CorgAdUzAQFuCgDQEOgBJ1+DQLdH9AKsamPA3EACYowAQchlWYuICFFy4AEAABGqJCUpwAFAepABGs+AqPoAO2EB4AaQIYcQccBzUe4AISD//2gAMAwEAAgADAAAAEJXcsf0SfBv/xAAYEQADAQEAAAAAAAAAAAAAAAAAAREhIP/aAAgBAwEBPxA0EizlFtKE5//EABkRAAIDAQAAAAAAAAAAAAAAAAABEBExIf/aAAgBAgEBPxAzx3WEtTGnn6f/xAAdEAACAgMAAwAAAAAAAAAAAAABEQAQITFBIGFx/9oACAEBAAE/EEpYd5moBMwAaUneQCrhmePnIeQSAI9urEaaFkUE71gUL9fhiCOo1BwrdWCAkmUCCFXNqZEFCA0LEcdSBWIFcoIomAYOTp5Ur0QL4a4CheF1XNqDG8FcphlIGoER/9k=";
            }
            else {
                imgBase = "data:image/*;base64," + ImgUtil.getImgStr(path);
            }
            //   String userName= appService.getUserById((int)comment.get("userId")).getUsername();
            comment.put("HeadPic",imgBase);
            arr2.add(comment);
        }
        return arr2;
    }

    private JSONArray CommentEntityAddUserName(JSONArray arr){
        JSONArray arr2 = new JSONArray();
        for(int i= 0;i<arr.size();i++){
            JSONObject comment = arr.getJSONObject(i);
            String userName= appService.getUserById((int)comment.get("userId")).getUsername();
            comment.put("userName",userName);
            arr2.add(comment);
        }
        return arr2;
    }

}
