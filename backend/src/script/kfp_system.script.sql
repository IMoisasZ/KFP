create database kfp_system;

use kfp_system;

create table unity (
	unity_id int primary key auto_increment,
	unity_tag varchar(5) not null unique,
    unity_description varchar(30) not null,
    unity_actived boolean default true,
    createdAt datetime,
    updatedAt dateTime
);

create table product (
	product_id int primary key auto_increment,
    internal_code varchar(10) not null unique,
    description varchar(200) not null unique,
    weight_per_meter numeric,
    unity_id int not null,
    minimum_amount numeric,
    actived boolean default true,
    createdAt datetime,
    updatedAt datetime
);