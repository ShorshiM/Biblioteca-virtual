create database bibliotecasucre;

use bibliotecasucre;
create table usuario(
    id int primary key auto_increment not null,
    nombres varchar(100) not null,
    apellidos varchar(100) not null,
    cedula varchar (10) not null,
    correo varchar (100) not null,
    contrasenia varchar (12) not null,
    carrera varchar (100) not null,
    rol varchar (50) not null
);

use bibliotecasucre;
create table libros(
    id int primary key auto_increment not null,
    categoria varchar (50) not null,
    autor varchar (200) not null,
    anio int not null,
    titulo varchar (200) not null, 
    ciudad varchar (100) not null,
    pais varchar (100) not null,
    editorial varchar (100) not null, 
    edicion varchar (50) not null,
    link varchar (400) not null,
    imagen varchar (400) not null 
);

use bibliotecasucre;
create table historial (
    id int primary key auto_increment not null,
    usuario_id int not null,
    foreign key (usuario_id) references usuario(id),
    libro_id int not null,
    foreign key (libro_id) references libros(id)
);
