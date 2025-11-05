create database biblioteca;

use biblioteca;
create table carrera(
    id_carrera int primary key auto_increment,
    carrera varchar(200) not null,
    imagen_carrera varchar(400) not null
);

use biblioteca;
create table categoria(
    id_categoria int primary key auto_increment,
    clasificacion_dewey varchar(200) not null
);

use biblioteca;
create table rol(
    id_rol int primary key auto_increment,
    tipo_usuario varchar (200)
);

use biblioteca;
create table libros(
    id_libro int primary key auto_increment,
    autor varchar (500) not null,
    anio int not null,
    titulo varchar (200) not null, 
    ciudad varchar (100) not null,
    pais varchar (100) not null,
    editorial varchar (100) not null, 
    edicion varchar (50) not null,
    isbn varchar(400),
    doi varchar(400),
    link varchar (500) not null,
    imagen varchar (500) not null
);

use biblioteca;
create table usuario(
    id_usuario int primary key auto_increment not null,
    user varchar(10) not null,
    nombres varchar(100) not null,
    apellidos varchar(100) not null,
    cedula varchar (10) not null,
    correo varchar (100) not null,
    contrasenia varchar (12) not null,
    -- carrera varchar (100) not null,
    telefono varchar(10) not null,
    id_rol int,
    id_carrera int,
    foreign key (id_rol) references rol (id_rol),
    foreign key (id_carrera) references carrera (id_carrera)
);

use biblioteca;
create table libro_carrera(
    id_libro_carrera int primary key auto_increment,
    id_libro int,
    id_carrera int,
    foreign key (id_carrera) references carrera (id_carrera),
    foreign key (id_libro) references libros (id_libro)
);

use biblioteca;
create table cla_categoria(
    id_cla_categoria int primary key auto_increment,
    id_libro int,
    id_categoria int,
    foreign key (id_libro) references libros (id_libro),
    foreign key (id_categoria) references categoria (id_categoria)
);

use biblioteca;
create table reporte(
    id_reporte int primary key auto_increment,
    usuario varchar(204) not null,
    libro varchar(200) not null,
    fecha date not null, #format YYYY-MM-DD,
    rol varchar(30) not null
);

use biblioteca;
drop table reporte;

-- Querys de prueba

use biblioteca;

SELECT c.carrera as carrera, c.imagen_carrera as imagen_carrera, COUNT(lc.id_carrera) as Libros FROM libro_carrera as lc
right join carrera as c on lc.id_carrera = c.id_carrera GROUP BY c.carrera;

use biblioteca;

SELECT COUNT(u.id_usuario) as Datos , r.tipo_usuario FROM usuario as u
join rol as r on u.id_rol = r.id_rol
GROUP BY r.tipo_usuario
UNION ALL
SELECT COUNT(id_libro), ("Libros") FROM libros;

use biblioteca;
SELECT u.user, CONCAT(u.nombres, ' ', u.apellidos) as Nombres, u.cedula, u.correo, u.telefono, r.tipo_usuario as rol, c.carrera as carrera FROM usuario as u
    join rol as r on u.id_rol = r.id_rol
    join carrera as c on u.id_carrera = c.id_carrera;

use biblioteca;
    SELECT u.nombres as nombre, u.apellidos as apellido, u.cedula as cedula, u.correo as correo, u.contrasenia as password, u.telefono as telefono, r.tipo_usuario as rol, c.carrera as carrera FROM usuario as u
            join rol as r on u.id_rol = r.id_rol
            join carrera as c on u.id_carrera = c.id_carrera
            WHERE u.cedula = "1764859786";

use biblioteca;
UPDATE usuario SET user = "1764859786", nombres = "María José", apellidos = "Gaona Moromenacho", cedula = "1764859786", correo = "gaona.moromenacho@hotmail.com", contrasenia = "Gaona-", telefono = "0965432785", id_rol = "3", id_carrera = 3 WHERE cedula = "1764859786";

use biblioteca;

SELECT ca.clasificacion_dewey as categoria, l.id_libro as libro FROM cla_categoria as c
    join categoria as ca on c.id_categoria = ca.id_categoria
    join libros as l on c.id_libro = l.id_libro
    WHERE l.isbn = "dsd";

use biblioteca;

SELECT c.carrera as carrera, li.id_libro as libro FROM libro_carrera as l
    join carrera as c on l.id_carrera = c.id_carrera
    join libros as li on l.id_libro = li.id_libro
    WHERE li.isbn = "dsd";