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
public class TestUserAction {

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
                post("/User/Login")
                        .param("username","testuser2")
                        .param("password","testuser2"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        Assert.assertEquals(responseString,"[\"20002\",\"testuser2\"," +
                "\"58dd024d49e1d1b83a5d307f09f32734\",\"12345678902\",\"testuser2@233.com\"]\n");
    }

    @Test
    public void testLoginErrorPwd() throws Exception{
        String responseString = mockMvc.perform(
                post("/User/Login")
                        .param("username","testuser2")
                        .param("password","testuser"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        Assert.assertEquals(responseString,"[\"0\"]\n");
    }

    @Test
    public void testLoginErrorName() throws Exception{
        String responseString = mockMvc.perform(
                post("/User/Login")
                        .param("username","testuser")
                        .param("password","testuser2"))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn().getResponse().getContentAsString();
        Assert.assertEquals(responseString,"[\"-1\"]\n");
    }


}
