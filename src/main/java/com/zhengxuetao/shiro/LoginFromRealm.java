/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zhengxuetao.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;

/**
 *
 * @author zhengxt
 */
public class LoginFromRealm implements Realm {

    public void testLogin(String account, String pwd) {
        //1、获取 SecurityManager 工厂，此处使用realm Ini 配置文件初始化 SecurityManager
        Factory<SecurityManager> factory
                = new IniSecurityManagerFactory("classpath:shiro_realm.ini");
        //2、得到 SecurityManager 实例 并绑定给 SecurityUtils
        SecurityManager securityManager = factory.getInstance();
        SecurityUtils.setSecurityManager(securityManager);
        //3、得到 Subject 及创建用户名/密码身份验证 Token（即用户身份/凭证）
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(account, pwd);

        try {
            //4、登录，即身份验证
            subject.login(token);
        } catch (AuthenticationException e) {
            //5、身份验证失败
            System.out.println(account + "登录失败;" + e.getMessage());
            throw e;
        }
        if (subject.isAuthenticated()) { //断言用户已经登录
            System.out.println(account + "登录成功");
        }
        //6、退出
        subject.logout();
    }

    @Override
    public String getName() {
        return "testRealm";
    }

    @Override
    public boolean supports(AuthenticationToken token) {
        //仅支持UsernamePasswordToken类型的Token
        return token instanceof UsernamePasswordToken;
    }

    @Override
    public AuthenticationInfo getAuthenticationInfo(AuthenticationToken at) throws AuthenticationException {
        String username = (String) at.getPrincipal();  //获取用户名
        String password = new String((char[]) at.getCredentials()); //得到密码

        if (!"zhang".equals(username)) {
            throw new UnknownAccountException();   //找不到改用户名抛出不知道的帐号异常
        }
        if (!"123".equals(password)) {
            throw new IncorrectCredentialsException(); //密码错误抛出异常
        }
        //验证通过时，返回一个AuthenticationInfo登录成功信息。
        return new SimpleAuthenticationInfo(username, password, getName());
    }

}
