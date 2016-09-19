/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zhengxuetao.shiro;

import java.util.Arrays;
import org.apache.shiro.authz.UnauthorizedException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ThreadContext;
import org.junit.After;
import org.junit.Assert;
import org.junit.Test;

/**
 *
 * @author tao
 */
public class LoginTest {

    @After
    public void tearDown() throws Exception {
        ThreadContext.unbindSubject();//退出时请解除绑定Subject到线程 否则对下次测试造成影响
    }

    /**
     * 测试角色
     */
    @Test
    public void testRole() {
        System.out.println("testRole");
        String configPath = "classpath:shiro_role.ini";
        String account = "zhang";
        String pwd = "123";
        Login instance = new Login();
        instance.login(configPath, account, pwd);
        Assert.assertTrue(instance.subject().hasRole("role1"));
        Assert.assertFalse(instance.subject().hasRole("role3"));
        Assert.assertTrue(instance.subject().hasAllRoles(Arrays.asList("role1", "role2")));
    }

    /**
     * 测试角色权限
     */
    @Test(expected = UnauthorizedException.class)
    public void testRoleException() {
        System.out.println("testRoleException");
        String configPath = "classpath:shiro_role.ini";
        String account = "zhang";
        String pwd = "123";
        Login instance = new Login();
        instance.login(configPath, account, pwd);
        instance.subject().checkRole("role3");
    }

    /**
     * 测试权限
     */
    @Test
    public void testIsPermitted() {
        System.out.println("testIsPermitted");
        String configPath = "classpath:shiro_role.ini";
        String account = "zhang";
        String pwd = "123";
        Login instance = new Login();
        instance.login(configPath, account, pwd);
        Subject subject = instance.subject();
        Assert.assertTrue(subject.isPermitted("user:create"));
        Assert.assertFalse(subject.isPermitted("user:view"));
    }

    /**
     * 测试权限异常
     */
    @Test(expected = UnauthorizedException.class)
    public void testIsPermittedException() {
        System.out.println("testIsPermittedException");
        String configPath = "classpath:shiro_role.ini";
        String account = "zhang";
        String pwd = "123";
        Login instance = new Login();
        instance.login(configPath, account, pwd);
        instance.subject().checkPermission("user:view");
    }

    /**
     * 测试通配符权限
     */
    @Test
    public void testAllIsPermitted() {
        System.out.println("testAllIsPermitted");
        String configPath = "classpath:shiro_role.ini";
        String account = "wang";
        String pwd = "123";
        Login instance = new Login();
        instance.login(configPath, account, pwd);
        Subject subject = instance.subject();
        Assert.assertTrue(subject.isPermitted("user:create"));
        Assert.assertTrue(subject.isPermitted("user:view"));
    }
}
