<?php
if(isset($_POST['eliminar'])){
 if($xml = simplexml_load_file('../../src/data/resegnas.xml')){
  $ide = $_POST['eliminar'];
  $resegna = $xml->xpath('//resegna[@id="' . $ide . '"]');

  // Verifica si encontró el nodo
  if ($resegna) {
      $resegna = $resegna[0];
      
      // Elimina el nodo
      unset($resegna[0]);

      // Guarda los cambios en el archivo XML
      $xml->asXML('../data/resegnas.xml');
      echo json_encode(['respuesta'=>"Se borro la review con id: $ide"]);
  } else {
      echo json_encode(['respuesta'=>"No se encontró el nodo con id=$idToDelete."]);
  }
 }
}
?>