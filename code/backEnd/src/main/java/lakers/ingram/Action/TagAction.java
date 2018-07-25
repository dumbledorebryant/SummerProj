package lakers.ingram.Action;

import lakers.ingram.ModelEntity.TagEntity;
import lakers.ingram.service.AppService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping(value = "/Tag")
public class TagAction {
    @Autowired
    private AppService appService;

    @RequestMapping(value = "/ShowTags")
    private void showTags(HttpServletResponse response)
            throws Exception {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        List<TagEntity> list=appService.getAllTags();
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(list);
        out.print(jsonArray);
    }
}
