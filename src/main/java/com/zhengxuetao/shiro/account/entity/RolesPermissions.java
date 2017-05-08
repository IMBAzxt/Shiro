/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.zhengxuetao.shiro.account.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ThinkPad
 */
@Entity
@Table(name = "roles_permissions")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "RolesPermissions.findAll", query = "SELECT r FROM RolesPermissions r"),
    @NamedQuery(name = "RolesPermissions.findById", query = "SELECT r FROM RolesPermissions r WHERE r.id = :id"),
    @NamedQuery(name = "RolesPermissions.findByRoleName", query = "SELECT r FROM RolesPermissions r WHERE r.roleName = :roleName"),
    @NamedQuery(name = "RolesPermissions.findByPermission", query = "SELECT r FROM RolesPermissions r WHERE r.permission = :permission")})
public class RolesPermissions implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Size(max = 100)
    @Column(name = "role_name")
    private String roleName;
    @Size(max = 100)
    @Column(name = "permission")
    private String permission;

    public RolesPermissions() {
    }

    public RolesPermissions(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof RolesPermissions)) {
            return false;
        }
        RolesPermissions other = (RolesPermissions) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.zhengxuetao.shiro.login.RolesPermissions[ id=" + id + " ]";
    }

}
