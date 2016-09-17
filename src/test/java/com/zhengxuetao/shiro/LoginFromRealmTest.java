/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zhengxuetao.shiro;

import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.util.ThreadContext;
import org.junit.After;
import org.junit.Test;

/**
 *
 * @author zhengxt
 */
public class LoginFromRealmTest {

    public LoginFromRealmTest() {
    }

    @After
    public void tearDown() throws Exception {
        ThreadContext.unbindSubject();//退出时请解除绑定Subject到线程 否则对下次测试造成影响
        //SecurityUtils.getSubject().logout(); 
    }

    @Test
    public void testTestLoginSuccess() {
        System.out.println("testLoginFromRealmSuccess");
        String account = "zhang";
        String pwd = "123";
        LoginFromRealm instance = new LoginFromRealm();
        instance.testLogin(account, pwd);
    }

    @Test(expected = UnknownAccountException.class)
    public void testTestLoginAccountFail() {
        System.out.println("testTestLoginAccountFail");
        String account = "zhng";
        String pwd = "123";
        LoginFromRealm instance = new LoginFromRealm();
        instance.testLogin(account, pwd);
    }

    @Test(expected = IncorrectCredentialsException.class)
    public void testTestLoginPasswordFail() {
        System.out.println("testTestLoginPasswordFail");
        String account = "zhang";
        String pwd = "13";
        LoginFromRealm instance = new LoginFromRealm();
        instance.testLogin(account, pwd);
    }
}
