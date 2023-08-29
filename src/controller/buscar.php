<?php 
include_once('../../src/classes/Resegna.php');
if(isset($_POST['busqueda'])){
  if ($xml = simplexml_load_file('../../src/data/resegnas.xml')) {
    $palabra = $_POST['busqueda'];
    $values = [];
    foreach($xml->resegna as $resegna){
      if(whereLike($palabra,(string) $resegna->titulo)){
        $r = new Resegna((string)$resegna->titulo, (string)$resegna->contenido, (int)$resegna->puntuacion,(string)$resegna->autor, (int)$resegna['id']);
        array_push($values,[$r->getTitulo(), $r->getPuntuacion(), $r->getResegna(), $r->getAutor(),$r->getId()]);
      }
    }
    echo json_encode($values);
  } else {
    echo json_encode(["Respuesta"=>"Error al cargar el archivo"]);
  }
}
function whereLike(string $palabra, string $titulo): bool{
  return strpos(strtolower($titulo), $palabra) !== false;
}
?>