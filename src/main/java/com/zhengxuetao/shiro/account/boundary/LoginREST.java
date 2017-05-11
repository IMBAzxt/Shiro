/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zhengxuetao.shiro.account.boundary;

import com.zhengxuetao.shiro.account.entity.Users;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 *
 * @author ThinkPad
 */
@Path("login")
public class LoginREST {
    @PersistenceContext(unitName = "com.zhengxuetao.shiro")
    private EntityManager em;

    @GET
    @Produces("text/plain")
    public String countREST() {
        return "login success";
    }
}
