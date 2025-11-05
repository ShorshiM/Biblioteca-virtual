<?php

require('./fpdf.php');
require("../assets/php/database.php");

class PDF extends FPDF
{

   // Cabecera de página
   function Header()
   {
      //include '../../recursos/Recurso_conexion_bd.php';//llamamos a la conexion BD

      //$consulta_info = $conexion->query(" select *from hotel ");//traemos datos de la empresa desde BD
      //$dato_info = $consulta_info->fetch_object();
      $this->Image('http://181.211.10.246/pluginfile.php/1/theme_klass/footerlogo/1701456290/LogoSucreUniversitarioC.png', 150, 5, 50); //logo de la empresa,moverDerecha,moverAbajo,tamañoIMG
      $this->SetFont('Arial', 'B', 19); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->Ln(17); // Salto de línea
      $this->Cell(45); // Movernos a la derecha
      $this->SetTextColor(0, 0, 0); //color
      //creamos una celda o fila
      $this->Cell(110, 15, utf8_decode('INSTITUTO SUPERIOR UNIVERSITARIO SUCRE'), 0, 1, 'C', 0); // AnchoCelda,AltoCelda,titulo,borde(1-0),saltoLinea(1-0),posicion(L-C-R),ColorFondo(1-0)
      $this->Ln(3); // Salto de línea
      $this->SetTextColor(103); //color

      /* UBICACION */
      // $this->Cell(110);  // mover a la derecha
      // $this->SetFont('Arial', 'B', 10);
      // $this->Cell(96, 10, utf8_decode("Ubicación : "), 0, 0, '', 0);
      // $this->Ln(5);

      /* TELEFONO */
      $this->Cell(110);  // mover a la derecha
      $this->SetFont('Arial', 'B', 10);
      $this->Cell(59, 10, utf8_decode("Teléfono : 02 2547-356"), 0, 0, '', 0);
      $this->Ln(5);

      /* COREEO */
      $this->Cell(110);  // mover a la derecha
      $this->SetFont('Arial', 'B', 10);
      $this->Cell(85, 10, utf8_decode("Correo : secretaria@tecnologicosucre.edu.ec"), 0, 0, '', 0);
      $this->Ln(10);

      /* TELEFONO */
      // $this->Cell(110);  // mover a la derecha
      // $this->SetFont('Arial', 'B', 10);
      // $this->Cell(85, 10, utf8_decode("Sucursal : "), 0, 0, '', 0);
      // $this->Ln(10);

      /* TITULO DE LA TABLA */
      //color
      $this->SetTextColor(228, 100, 0);
      $this->Cell(50); // mover a la derecha
      $this->SetFont('Arial', 'B', 15);
      $this->Cell(100, 10, utf8_decode("REPORTE DE USUARIOS "), 0, 1, 'C', 0);
      $this->Ln(7);

      /* CAMPOS DE LA TABLA */
      //color
      // $this->Cell(2);
      $this->SetFillColor(23, 112, 181); //colorFondo
      $this->SetTextColor(255, 255, 255); //colorTexto
      $this->SetDrawColor(163, 163, 163); //colorBorde
      $this->SetFont('Arial', 'B', 11);
      $this->Cell(7, 10, utf8_decode('N°'), 1, 0, 'C', 1);
      $this->Cell(58, 10, utf8_decode('USUARIO'), 1, 0, 'C', 1);
      $this->Cell(88, 10, utf8_decode('LIBRO'), 1, 0, 'C', 1);
      $this->Cell(20, 10, utf8_decode('ROL'), 1, 0, 'C', 1);
      $this->Cell(18, 10, utf8_decode('FECHA'), 1, 1, 'C', 1);
      // $this->Cell(25, 10, utf8_decode('ESTADO'), 1, 1, 'C', 1);
   }

   // Pie de página
   function Footer()
   {
      $this->SetY(-15); // Posición: a 1,5 cm del final
      $this->SetFont('Arial', 'I', 8); //tipo fuente, negrita(B-I-U-BIU), tamañoTexto
      $this->Cell(0, 10, utf8_decode('Página ') . $this->PageNo() . '/{nb}', 0, 0, 'C'); //pie de pagina(numero de pagina)

      $this->SetY(-15); // Posición: a 1,5 cm del final
      $this->SetFont('Arial', 'I', 8); //tipo fuente, cursiva, tamañoTexto
      $hoy = date('d/m/Y');
      $this->Cell(355, 10, utf8_decode($hoy), 0, 0, 'C'); // pie de pagina(fecha de pagina)
   }
}


// require '../../funciones/CortarCadena.php';
/* CONSULTA INFORMACION DEL HOSPEDAJE */
// $consulta_info = $conexion->query("SELECT * FROM reporte");
// $dato_info = $consulta_info->fetch_object();

$pdf = new PDF();
$pdf->AddPage(); /* aqui entran dos para parametros (horientazion,tamaño)V->portrait H->landscape tamaño (A3.A4.A5.letter.legal) */
$pdf->AliasNbPages(); //muestra la pagina / y total de paginas

$i = 0;
$pdf->SetFont('Arial', '', 8);
$pdf->SetDrawColor(163, 163, 163); //colorBorde

$consulta_reporte_alquiler = $connection->query("SELECT * FROM reporte");

if($consulta_reporte_alquiler->num_rows > 0){
   while ($datos_reporte = $consulta_reporte_alquiler->fetch_object()) {      
      $i = $i + 1;
      /* TABLA */
      // $pdf->Cell(5);
      $pdf->Cell(7, 15, utf8_decode($i), 1, 0, 'C', 0);
      $pdf->Cell(58, 15, utf8_decode($datos_reporte->usuario), 1, 0, 'C', 0);
      $pdf->Cell(88, 15, utf8_decode($datos_reporte->libro), 1, 0, 'L', 0);
      $pdf->Cell(20, 15, utf8_decode($datos_reporte->rol), 1, 0, 'C', 0);
      $pdf->Cell(18, 15, utf8_decode($datos_reporte->fecha), 1, 1, 'C', 0);
      // $pdf->Cell(25, 10, utf8_decode("total"), 1, 1, 'C', 0);
   }

   $pdf->Output('Reporte_de_visitas.pdf', 'I');//nombreDescarga, Visor(I->visualizar - D->descargar)

   $query = "DELETE FROM reporte";

   $result = methodDELETE($query, $connection);
} else {
   echo "<script languaje='javascript' 
   type='text/javascript'>window.close();
   alert('No hay registros nuevos actualmente');
   </script>";
}



