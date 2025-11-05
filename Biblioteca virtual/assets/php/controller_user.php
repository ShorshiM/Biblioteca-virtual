<?php
    require_once("database.php");

    session_start();

    // ------------------------OK SESSION--------------------- //
    if(!empty($_SESSION['id'])){
        $id_user = $_SESSION['id'];

        if(isset($_POST['method'])){
            $permiso = $_POST['method'];
            // ---------------Method GET------------------ //
            if($permiso == "GET"){
    
                $query = "SELECT CONCAT(u.nombres, ' ', u.apellidos) as Usuario, u.cedula as cedula, u.correo as correo, u.telefono as telefono, r.tipo_usuario as rol, c.carrera as carrera FROM usuario as u
                join rol as r on u.id_rol = r.id_rol
                join carrera as c on u.id_carrera = c.id_carrera";
    
                $result = $connection->query($query);
    
                if(!$result){
                    die('Query'. mysqli_error($connection));
                }
    
                $json = [];
    
                if($result->num_rows > 0){
                    while($row = $result->fetch_assoc()){
                        $json[] = $row;
                    }
                }else{
                    $json = ['estado' => false];
                }
    
                echo json_encode($json);
    
            // ---------------Method POST------------------ //
            }else if($permiso == "POST"){
                $nombre = $_POST['nombre'];
                $apellido = $_POST['apellido'];
                $cedula = $_POST['cedula'];
                $correo = $_POST['correo'];
                $password = $_POST['contrasenia'];
                $telefono = $_POST['telefono'];
                $rol = $_POST['rol'];
                $carrera = $_POST['carrera'];

                $query = "INSERT INTO usuario (user, nombres, apellidos, cedula, correo, contrasenia, telefono, id_rol, id_carrera) VALUES ('$cedula', '$nombre', '$apellido', '$cedula', '$correo', '$password', '$telefono', '$rol', '$carrera')";

                $result = $connection->query($query);

                if(!$result){
                    die('Query'. mysqli_error($connection));
                }else{
                    $json = ['success' => true];
                    echo json_encode($json);
                }
            // ---------------Method PUT------------------ //
            }else if($permiso == "PUT"){
                $nombre = $_POST['nombre'];
                $apellido = $_POST['apellido'];
                $cedula = $_POST['cedula'];
                $correo = $_POST['correo'];
                $password = $_POST['contrasenia'];
                $telefono = $_POST['telefono'];
                $rol = $_POST['rol'];
                $carrera = $_POST['carrera'];
                $oldCi = $_POST['oldCedula'];

                $query = "UPDATE usuario SET user = '$cedula', nombres = '$nombre', apellidos = '$apellido', cedula = '$cedula', correo = '$correo', contrasenia = '$password', telefono = '$telefono', id_rol = '$rol', id_carrera = '$carrera' WHERE cedula = '$oldCi'";

                $result = $connection->query($query);

                if(!$result){
                    die('Query'. mysqli_error($connection));
                }else{
                    $json = ['success' => true];
                    echo json_encode($json);
                }
            }else{
            // ---------------Method DELETE------------------ //
                $cedula = $_POST['cedula'];
                $query = "DELETE FROM usuario WHERE cedula = '$cedula'";

                $result = $connection->query($query);

                if(!$result){
                    die('Query'. mysqli_error($connection));
                }else{
                    $json = ['success' => true];
                    echo json_encode($json);
                }
            }
        }else {
        // ---------------Mostrar datos------------------ //
            if(isset($_POST['cedula'])){
                $cedula = $_POST['cedula'];
                $query = "SELECT u.nombres as nombre, u.apellidos as apellido, u.cedula as cedula, u.correo as correo, u.contrasenia as password, u.telefono as telefono, r.tipo_usuario as rol, c.carrera as carrera FROM usuario as u
                join rol as r on u.id_rol = r.id_rol
                join carrera as c on u.id_carrera = c.id_carrera
                WHERE u.cedula = $cedula";

                $result = $connection->query($query);

                if(!$result){
                    die('Query'. mysqli_error($connection));
                }

                $json = [];

                if($result->num_rows > 0){
                    while($row = $result->fetch_assoc()){
                        $json[] = $row;
                    }
                }

                echo json_encode($json);
            // ---------------Validar cedula------------------ //
            } else if (isset($_POST['valueCi'])){
                $cedula = $_POST['valueCi'];
                if(empty($cedula)){
                    $cedula = "2";
                }

                $query = "SELECT cedula FROM usuario WHERE cedula = $cedula";

                $result = $connection->query($query);

                if(!$result){
                    die('Query'. mysqli_error($connection));
                }

                $json = [];

                if($result->num_rows > 0){
                    $json = ['success' => true];
                    echo json_encode($json);
                } else {
                    $json = ['success' => false];
                    $json['valor'] = $cedula;
                    echo json_encode($json);
                }
            // ---------------Validar telefono------------------ //
            } else if (isset($_POST['valueNumber'])){
                $telefono = $_POST['valueNumber'];
                if(empty($telefono)){
                    $telefono = "2";
                }
                $query = "SELECT cedula, nombres FROM usuario WHERE telefono = $telefono";

                $result = $connection->query($query);

                if(!$result){
                    die('Query'. mysqli_error($connection));
                }

                $json = [];

                if($result->num_rows > 0){
                    $json = ['success' => true];
                    echo json_encode($json);
                } else {
                    $json = ['success' => false];
                    $json['valor'] = $telefono;
                    echo json_encode($json);
                }
            } else if (isset($_POST['word'])){
                $word = $_POST['word'];

                $query = "SELECT CONCAT(u.nombres, ' ', u.apellidos) as Usuario, u.cedula as cedula, u.correo as correo, u.telefono as telefono, r.tipo_usuario as rol, c.carrera as carrera FROM usuario as u
                join rol as r on u.id_rol = r.id_rol
                join carrera as c on u.id_carrera = c.id_carrera
                WHERE u.nombres LIKE '%$word%' OR u.apellidos LIKE '%$word%' OR u.cedula LIKE '%$word%' OR r.tipo_usuario LIKE '%$word%' OR c.carrera LIKE '%$word%'";
                
                echo json_encode(methodGet($query, $connection));
            }
        }
    }else{
        $json = ['success' => false];
        echo json_encode($json);
    }
    