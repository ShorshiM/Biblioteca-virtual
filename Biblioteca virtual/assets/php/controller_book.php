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
                if($option == 1){
                    $query = "SELECT autor, anio, titulo, ciudad, pais, editorial, edicion, isbn, doi, link, imagen FROM libros";

                    echo json_encode(methodGet($query, $connection));
                } else if($option == 2){
                    $allJson = [];
                    $isbn = $_POST["ISBN"];
                    $query = "SELECT id_libro as id, autor, anio, titulo, ciudad, pais, editorial, edicion, isbn, doi, link, imagen FROM libros WHERE isbn = '$isbn'";

                    $allJson["Book"] = methodGet($query, $connection);
                    $query = "SELECT ca.clasificacion_dewey as categoria, l.id_libro as libro, ca.id_categoria as id FROM cla_categoria as c
                    join categoria as ca on c.id_categoria = ca.id_categoria
                    join libros as l on c.id_libro = l.id_libro
                    WHERE l.isbn = '$isbn'";

                    $allJson["Categoria"] = methodGet($query, $connection);
                    $query = "SELECT c.carrera as carrera, li.id_libro as libro, c.id_carrera as id FROM libro_carrera as l
                    join carrera as c on l.id_carrera = c.id_carrera
                    join libros as li on l.id_libro = li.id_libro
                    WHERE li.isbn = '$isbn'";

                    $allJson["Carrera"] = methodGet($query, $connection);

                    echo json_encode($allJson);
                } else if ($option == 3){
                    $isbn = $_POST['valISBN'];
                    $query = "SELECT isbn FROM libros WHERE isbn = '$isbn'";
                    echo json_encode(methodGet($query, $connection)); 
                } else if ($option == 4){
                    $word = $_POST['word'];
                    $query = "SELECT autor, anio, titulo, ciudad, pais, editorial, edicion, isbn, doi FROM libros WHERE autor LIKE '%$word$' OR titulo LIKE '%$word%' OR isbn LIKE '%$word%'";
                    echo json_encode(methodGet($query, $connection));
                }
                
                
    
            //#green ---------------Method POST------------------ //#
            }else if($permiso == "POST"){
                $option = $_POST['query'];
                if ($option == 1){
                    $autor = $_POST['autor'];
                    $anio = $_POST['anio'];
                    $titulo = $_POST['titulo'];
                    $editorial = $_POST['editorial'];
                    $ciudad = $_POST['ciudad'];
                    $pais = $_POST['pais'];
                    $edicion = $_POST['edicion'];
                    $isbn = $_POST['isbn'];
                    $doi = $_POST['doi'];
                    $link = $_POST['link'];
                    $imagen = $_POST['imagen'];
                    $allJson = [];
                    $arrayCategoria = explode(",", $_POST['categoria']);
                    $arrayCarrera = explode(",", $_POST['carrera']);
                    $categoria =[];
                    $carrera =[];
                    array_unshift($categoria, "id_categoria", "id_libro");
                    array_unshift($carrera, "id_carrera", "id_libro");
                    $query = "INSERT INTO libros (autor, anio, titulo, ciudad, pais, editorial, edicion, isbn, doi, link, imagen) VALUES ('$autor', '$anio', '$titulo', '$ciudad', '$pais', '$editorial', '$edicion', '$isbn', '$doi', '$link', '$imagen')";
                    $allJson["book"] = methodPOST($query, $connection);
                    $allJson["categoria"] = methodPOSTArray($arrayCategoria, $connection, "cla_categoria", $isbn, $categoria);
                    $allJson["carrera"] = methodPOSTArray($arrayCarrera, $connection, "libro_carrera", $isbn, $carrera);
                    echo json_encode($allJson);
                }
            //#green ---------------Method PUT------------------ //#
            }else if($permiso == "PUT"){
                $option = $_POST['query'];
                if($option == 1){
                    $old_isbn = $_POST['old_isbn'];
                    $autor = $_POST['autor'];
                    $anio = $_POST['anio'];
                    $titulo = $_POST['titulo'];
                    $editorial = $_POST['editorial'];
                    $ciudad = $_POST['ciudad'];
                    $pais = $_POST['pais'];
                    $edicion = $_POST['edicion'];
                    $isbn = $_POST['isbn'];
                    $doi = $_POST['doi'];
                    $link = $_POST['link'];
                    $imagen = $_POST['imagen'];
                    $id = $_POST['id'];
                    $arrayCategoria = explode(",", $_POST['categoria']);
                    $arrayCarrera = explode(",", $_POST['carrera']);
                    $query = "UPDATE libros SET autor = '$autor', anio = '$anio', titulo = '$titulo', ciudad = '$ciudad', pais = '$pais', editorial = '$editorial', edicion = '$edicion', isbn = '$isbn', doi = '$doi', link = '$link', imagen = '$imagen' WHERE isbn = '$old_isbn'";
                    $allJson = [];
                    $categoria =[];
                    $carrera =[];
                    array_unshift($categoria, "id_categoria", "id_libro");
                    array_unshift($carrera, "id_carrera", "id_libro");
                    $allJson['book'] = methodPUT($query, $connection);
                    $allJson['categoria'] = methodPUTArray($arrayCategoria, $connection, "cla_categoria", $id, $categoria);
                    $allJson['carrera'] = methodPUTArray($arrayCarrera, $connection, "libro_carrera", $id, $carrera);
                    echo json_encode($allJson);
                }
            //#green ---------------Method DELETE------------------ //#
            }else{
                $isbn = $_POST['isbn'];

                $allJson = [];

                $allJson['categoria'] = methodDELETEArray($connection, "cla_categoria", $isbn);
                $allJson['carrera'] = methodDELETEArray($connection, "libro_carrera", $isbn);
                $query = "DELETE FROM libros WHERE isbn = '$isbn'";
                $allJson['book'] = methodDELETE($query, $connection);

                echo json_encode($allJson);
            }
        } 

    }else{
        $json = ['success' => false];
        echo json_encode($json);
    }
    