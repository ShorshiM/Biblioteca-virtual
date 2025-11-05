<?php
    require_once("database.php");
    $json = [];

    // ------------------------SESSION START--------------------- //
    if(!empty($_POST['user']) && !empty($_POST['password'])){

        session_start();

        $usuario = security_word($_POST['user']);
        $password = security_word($_POST['password']);
        $query = "SELECT u.id_usuario as id, u.user as user, u.nombres as nombres, u.apellidos as apellidos, u.contrasenia as password, r.tipo_usuario as rol FROM usuario as u
        join rol as r on u.id_rol = r.id_rol
        WHERE user = '$usuario' AND contrasenia = '$password'";

        $result = $connection->query($query);

        if(!$result){
            die('Query'. mysqli_error($connection));
        }

        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                $_SESSION['id'] = $row['id'];
                $_SESSION['nombres'] = $row['nombres'];
                $_SESSION['apellidos'] = $row['apellidos'];
                $_SESSION['password'] = $row['password'];
                $_SESSION['rol'] = $row['rol'];
            }
            $json['success'] = "ok";
            $json['rol'] = $_SESSION['rol'];
            echo json_encode($json);
        } else {
            $json['success'] = "El nombre o el usuario son incorrectos";
            echo json_encode($json);
        }
    }else{
        $json['success'] = "Debe llenar todos los campos";
        echo json_encode($json);
    }
    