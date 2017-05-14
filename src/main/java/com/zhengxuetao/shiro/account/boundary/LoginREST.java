/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zhengxuetao.shiro.account.boundary;

import com.zhengxuetao.shiro.account.entity.Users;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;

/**
 *
 * @author ThinkPad
 */
@Path("account")
public class LoginREST {

    @PersistenceContext(unitName = "com.zhengxuetao.shiro")
    private EntityManager em;

    @POST
    @Path("login")
    @Consumes({"application/x-www-form-urlencoded"})
    @Produces({"application/json"})
    public Response login(@Context HttpServletRequest request,
            @Context HttpServletResponse response,
            @FormParam("username") String username,
            @FormParam("password") String password,
            @FormParam("remember_me") Boolean rememberMe) {

        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        if (rememberMe != null) {
            token.setRememberMe(rememberMe);
        }

        try {
            //4、登录，即身份验证
            subject.login(token);
            return Response.ok().build();
        } catch (AuthenticationException e) {
            //5、身份验证失败
            e.printStackTrace();
            System.out.println("登录失败");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
    }

    @GET
    @Path("logout")
    public Response logout() {
        SecurityUtils.getSubject().logout();
        return Response.ok().entity(Response.Status.OK).build();
    }

    @GET
    @Path("current_user")
    @Produces({"application/json"})
    public Users getCurrentUserInfo() {
        Subject sub = SecurityUtils.getSubject();
        System.out.println(sub.getPrincipal());
        return null;
    }
}
