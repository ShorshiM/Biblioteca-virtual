<?php
    require_once("database.php");

    session_start();

    // ------------------------OK SESSION--------------------- //
    if(!empty($_SESSION['id'])){
        $json_data = [];
        $json_data['nombres'] = $_SESSION['nombres'];
        $json_data['apellidos'] = $_SESSION['apellidos'];
        $json_data['rol'] = $_SESSION['rol'];
        echo json_encode($json_data);
    }else{
        $json = ['success' => false];
        echo json_encode($json);
    }