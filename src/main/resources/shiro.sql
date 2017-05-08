drop database if exists shiro;
create database shiro;
use shiro;


create table users (
  id bigserial,
  username varchar(100),
  password varchar(100),
  password_salt varchar(100),
  constraint pk_users primary key(id)
)  ;
create unique index idx_users_username on users(username);

create table user_roles(
  id bigserial,
  username varchar(100),
  role_name varchar(100),
  constraint pk_user_roles primary key(id)
)  ;
create unique index idx_user_roles on user_roles(username, role_name);

create table roles_permissions(
  id bigserial,
  role_name varchar(100),
  permission varchar(100),
  constraint pk_roles_permissions primary key(id)
)  ;
create unique index idx_roles_permissions on roles_permissions(role_name, permission);

insert into users(username,password)values('zhang','1234');