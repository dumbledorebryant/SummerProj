package lakers.ingram.TestAction;

import lakers.ingram.IngramApplication;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = IngramApplication.class)
@WebAppConfiguration
public class TestUserTagAction {

    protected MockMvc mockMvc;

    @Autowired
    protected WebApplicationContext wac;

    @Before()
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    public void testSearchEmptySavedTag() throws Exception{
        String responseString = mockMvc.perform(
                post("/UserCenter/SearchSavedTag")
                        .param("userID","6"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        Assert.assertEquals(responseString,"[]");
    }

    @Test
    public void testSearchNewAddTag() throws Exception{
        String responseString = mockMvc.perform(
                post("/UserCenter/SearchNewAddTag")
                        .param("tagName","cucumber"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        Assert.assertEquals(responseString,"{\"tagId\":28," +
                "\"tagName\":\"cucumber\",\"tagType\":\"food\"}");
    }
}
