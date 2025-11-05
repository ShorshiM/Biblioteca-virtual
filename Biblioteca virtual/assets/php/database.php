<?php

    $server = 'localhost';
    $root = 'root';
    $password = '';
    $database = 'biblioteca';
    $connection = new mysqli($server, $root, $password, $database);

    if($connection->connect_error){
        die("Error de conexión". $connection->connect_error);
    }

    function security_word($cadena){
        $palabras=["<script>","</script>","<script src","<script type=","SELECT * FROM","SELECT "," SELECT ","DELETE FROM","INSERT INTO","DROP TABLE","DROP DATABASE","TRUNCATE TABLE","SHOW TABLES","SHOW DATABASES","<?php","?>","--","^","<",">","==","=",";","::"];

			$cadena=trim($cadena);
			$cadena=stripslashes($cadena);

			foreach($palabras as $palabra){
				$cadena=str_ireplace($palabra, "", $cadena);
			}

			$cadena=trim($cadena);
			$cadena=stripslashes($cadena);

			return $cadena;
    }

    function verificationData($filtro,$cadena){
        if(preg_match("/^".$filtro."$/", $cadena)){
            return false;
        }else{
            return true;
        }
    }

    function methodGet($query, $connection){
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
            $json = ['success' => false];
        }

        return $json;
    }

    function methodPOST($query, $connection){
        $result = $connection->query($query);

        if(!$result){
            die('Query'. mysqli_error($connection));
        } else {
            $json = ['success' => true];
        }

        return $json;
    }

    function methodPUT($query, $connection){
        $result = $connection->query($query);

        if(!$result){
            die('Query'. mysqli_error($connection));
        } else {
            $json = ['success' => true];
        }

        return $json;
    }

    function methodPUTArray($array, $connection, $table, $id, $infoTable){
        $option = true;
        if(array_key_exists(0, $array)){
            $query = "DELETE FROM $table WHERE id_libro = '$id'";
            if(methodDELETE($query, $connection)['success']){
                foreach ($array as $indice => $valor){
                    $query = "INSERT INTO $table ($infoTable[1], $infoTable[0]) VALUES ('$id', '$valor')";
                    if(!methodPOST($query, $connection)['success']){
                    $option = false;
                    }
                }
            } else {
                $option = false;
            }
            return $json = ['success' => $option];
        } else {
            $option = false;
            return $json = ['success' => $option];
        }
    }

    function methodPOSTArray($array, $connection, $table, $isbn, $infoTable){
        $option = true;
        if(array_key_exists(0, $array)){
            $query = "SELECT id_libro as id FROM libros WHERE isbn = '$isbn'";
            $isbn = methodGet($query, $connection);
            if(!isset($isbn['success'])){
                $id = $isbn[0]['id'];
                foreach ($array as $indice => $valor){
                    $query = "INSERT INTO $table ($infoTable[1], $infoTable[0]) VALUES ('$id', '$valor')";
                    if(!methodPOST($query, $connection)['success']){
                        $option = false;
                    }
                }
            } else {
                $option = false;
            }
            return $json = ['success' => $option];
        } else {
            $option = false;
            return $json = ['success' => $option];
        }
    }

    function methodDELETE($query, $connection){
        $result = $connection->query($query);

        if(!$result){
            die('Query'. mysqli_error($connection));
        } else {
            $json = ['success' => true];
        }

        return $json;
    }

    function methodDELETEArray($connection, $table, $isbn){
        $option = true;
        $query = "SELECT id_libro as id FROM libros WHERE isbn = '$isbn'";
        $val = methodGet($query, $connection);
        if(!isset($val['success'])){
            $id = $val[0]['id'];
            $query = "DELETE FROM $table WHERE id_libro = '$id'";
            $delete = methodDELETE($query, $connection);
            if(!$delete['success']){
                $option = false;
            }
        } else {
            $option = false;
        }
        return $json = ['success' => $option];

    }