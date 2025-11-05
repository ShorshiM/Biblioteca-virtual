<?php
    require_once("database.php");

    $query = "SELECT c.id_carrera as id, c.carrera as carrera, c.imagen_carrera as imagen_carrera, COUNT(lc.id_carrera) as Libros FROM libro_carrera as lc
    right join carrera as c on lc.id_carrera = c.id_carrera GROUP BY c.carrera";

    $result = $connection->query($query);

    if(!$result){
        die('Query'. mysqli_error($connection));
    }

    $json = [];

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $json[] = $row;
        }

        echo json_encode($json);
    }