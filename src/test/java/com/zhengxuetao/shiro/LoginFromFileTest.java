/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zhengxuetao.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.util.ThreadContext;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 *
 * @author zhengxt
 */
public class LoginFromFileTest {

    public LoginFromFileTest() {
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() throws Exception {
        ThreadContext.unbindSubject();//退出时请解除绑定Subject到线程 否则对下次测试造成影响
        //SecurityUtils.getSubject().logout();
    }

    /**
     * Test of testLogin method, of class Login.
     */
    @Test(expected = AuthenticationException.class)
    public void testTestLogin() {
        System.out.println("testLogin");
        LoginFromFile instance = new LoginFromFile();
        instance.testLogin("test", "test001");
        instance.testLogin("zheng", "13");
    }

}
