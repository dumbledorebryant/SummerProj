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
public class TestWorkerAction {
    protected MockMvc mockMvc;

    @Autowired
    protected WebApplicationContext wac;

    @Before()
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    public void testLoginSuccess() throws Exception {
        String responseString = mockMvc.perform(
                post("/Worker/Login")
                        .param("id","1")
                        .param("password","123"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        Assert.assertEquals(responseString,"you are from window 1\n");
    }

    @Test
    public void testLoginErrorPwd() throws Exception {
        String responseString = mockMvc.perform(
                post("/Worker/Login")
                        .param("id","1")
                        .param("password","124"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        Assert.assertEquals(responseString,"fail\n");
    }

    @Test
    public void testLoginErrorId() throws Exception {
        String responseString = mockMvc.perform(
                post("/Worker/Login")
                        .param("id","111111")
                        .param("password","123"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        Assert.assertEquals(responseString,"fail\n");
    }

}
