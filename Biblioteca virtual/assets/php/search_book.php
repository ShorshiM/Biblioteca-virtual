<?php
    require_once("database.php");

    session_start();

    //#blue ------------------------OK SESSION--------------------- //#
    if(!empty($_SESSION['id'])){
        $id_user = $_SESSION['id'];

        if(isset($_POST['method'])){
            $permiso = $_POST['method'];
            //#green ---------------Method GET------------------ //#
            if($permiso == "GET"){
                $option = $_POST['query'];
                if ($option == 1){
                    $carrera = $_POST['carrera'];
                    $categoria = $_POST['categoria'];
                    $query = "SELECT l.autor as autor, l.anio as anio,l.titulo as titulo, l.link as link, l.imagen as imagen FROM cla_categoria as c
                    join libros as l on c.id_libro = l.id_libro
                    WHERE id_categoria = '$categoria'";
                    $query1 = "SELECT l.autor as autor, l.anio as anio, l.titulo as titulo, l.link as link, l.imagen as imagen FROM libro_carrera as li
                    join libros as l on li.id_libro = l.id_libro
                    WHERE li.id_carrera = '$categoria'";
                    if(isset($_POST['titulo'])){
                        $titulo = $_POST['titulo'];
                        $query .= " AND l.titulo LIKE '%$titulo%'";
                        $query1 .= " AND l.titulo LIKE '%$titulo%'";
                    }
                    if(isset($_POST['autor'])){
                        $autor = $_POST['autor'];
                        $query .= " AND l.autor LIKE '%$autor%'";
                        $query1 .= " AND l.autor LIKE '%$autor%'";
                    }
                    $allJson = [];
                    $allJson["categoria"] = methodGet($query, $connection);
                    $allJson["carrera"] = methodGet($query1, $connection);
                    echo json_encode($allJson);
                } else if ($option == 2) {
                    $query = "SELECT autor, anio, titulo, ciudad, pais, editorial, edicion, isbn, doi, link, imagen FROM libros";
                    echo json_encode(methodGet($query, $connection));
                } else {
                    $libro = $_POST['libro'];
                    $user = $_SESSION['nombres']." ".$_SESSION['apellidos'];
                    $rol = $_SESSION['rol'];
                    $fecha = date('Y-m-d');

                    $query = "INSERT INTO reporte (usuario, libro, fecha, rol) VALUES ('$user', '$libro', '$fecha', '$rol')";

                    echo json_encode(methodPOST($query, $connection));
                }
            }
        }
    }