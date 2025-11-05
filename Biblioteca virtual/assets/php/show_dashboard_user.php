<?php
    require_once("database.php");

    session_start();

    // ------------------------OK SESSION--------------------- //
    if(!empty($_SESSION['id'])){
        $id_user = $_SESSION['id'];

        // ------------------------METHOD GET--------------------- //
        if(true){
            $query = "SELECT u.user, CONCAT(u.nombres, ' ', u.apellidos) as Nombres, u.cedula, u.correo, u.telefono, r.tipo_usuario as rol, c.carrera as carrera FROM usuario as u
            join rol as r on u.id_rol = r.id_rol
            join carrera as c on u.id_carrera = c.id_carrera";
        
            $result = $connection->query($query);
        
            if(!$result){
                die('Query'. mysqli_error($connection));
            }

            $json = [];
            $allJson = [];
        
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $json[] = $row;
                }
                $allJson['usuarios'] = $json;
            }else{
                $allJson['usuarios'] = "error";
            }
            
            $query = "SELECT * FROM usuario WHERE id_rol = 2";
        
            $result = $connection->query($query);
        
            if(!$result){
                die('Query'. mysqli_error($connection));
            }
        
            $json = [];
        
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $json[] = $row;
                }
                $allJson['asistentes'] = $json;
            }else{
                $allJson['asistentes'] = "error";
            }
        
            $query = "SELECT COUNT(u.id_usuario) as Datos , r.tipo_usuario FROM usuario as u
            join rol as r on u.id_rol = r.id_rol
            GROUP BY r.tipo_usuario
            UNION ALL
            SELECT COUNT(id_libro), ('Libros') FROM libros";
        
            $result = $connection->query($query);
        
            if(!$result){
                die('Query'. mysqli_error($connection));
            }
        
            $json = [];
        
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $json[] = $row;
                }
                $allJson['informacion'] = $json;
            }
            
            echo json_encode($allJson);

        // ------------------------METHOD GET--------------------- //
        } else if(false){

        }
    }else{
        $json = ['success' => false];
        echo json_encode($json);
    }
