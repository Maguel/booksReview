<?php
if(isset($_POST['title'],$_POST['author'],$_POST['review'],$_POST['stars'],$_POST['id'],$_POST['edit'])){
  if ($xml = simplexml_load_file('../../src/data/resegnas.xml')) {
    $titulo = removeSpecialChars($_POST['title']);
    $autor = removeSpecialChars($_POST['author']);
    $review = removeSpecialChars($_POST['review']);
    $estrellas = $_POST['stars'];
    $id = $_POST['id'];
    $edit = $_POST['edit'];
    if ($edit === "true" || $edit === "1" || $edit === 1) {
      $id--;
      // Utiliza XPath para encontrar el nodo resegna con el atributo id
      $resegna = $xml->xpath('//resegna[@id="'.$id.'"]');

      // Verifica si encontró el nodo
      if ($resegna) {
          $resegna = $resegna[0]; // XPath retorna un array, así que toma el primer elemento
          // Edita los campos
          $resegna->titulo = $titulo;
          $resegna->autor = $autor;
          $resegna->contenido = $review;
          $resegna->puntuacion = $estrellas;
      } else {
          echo "No se encontró el nodo con id=$id.";
      }
    }else {
      // Crea una nueva <resegna>
      $newResegna = $xml->addChild('resegna');

      // Agrega los elementos hijos y sus valores a la nueva <resegna>
      $newResegna->addAttribute('id',$id);
      $newResegna->addChild('titulo', $titulo);
      $newResegna->addChild('autor', $autor);
      $newResegna->addChild('contenido', $review);
      $newResegna->addChild('puntuacion', $estrellas);
      // Guarda el XML reformateado
    }
     
    $dom = new DOMDocument('1.0');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $dom->loadXML($xml->asXML());
    $dom->save('../data/resegnas.xml');
    echo json_encode(['respuesta'=>"$edit"]);
  } else {
    echo json_encode(["respuesta"=>"Error al cargar el archivo"]);
  }
}
function removeSpecialChars($string) {
  return str_replace(['<', '>', '"'], '', $string);
}
?>