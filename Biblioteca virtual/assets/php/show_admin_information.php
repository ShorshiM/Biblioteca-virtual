<?php
    require_once("database.php");

    session_start();

    // ------------------------OK SESSION--------------------- //
    if(!empty($_SESSION['id'])){
        $json = [];
        $id_user = $_SESSION['id'];

        if(isset($_POST['method'])){
            $method = $_POST['method'];
            // -------------------------method GET-----------------------
            if($method == "GET"){
                $query = "SELECT * FROM usuario WHERE id_rol = '$id_user'";
    
                $result = $connection->query($query);
    
                if(!$result){
                    die('Query'. mysqli_error($connection));
                }
    
                if($result->num_rows > 0){
                    while($row = $result->fetch_assoc()){
                        $json[] = $row;
                    }
    
                    echo json_encode($json);
                }
    
            // -------------------------method PUT-----------------------
            } else if($method == "PUT"){
                $password = $_POST['new-password'];
    
                $query = "UPDATE usuario SET contrasenia = '$password' WHERE id_usuario = '$id_user'";
    
                $result = $connection->query($query);
    
                if(!$result){
                    die('Query'. mysqli_error($connection));
                }else{
                    $json = ['success' => true];
                    echo json_encode($json);
                }
            }
        }
    }else{
        $json = ['success' => false];
        echo json_encode($json);
    }
    