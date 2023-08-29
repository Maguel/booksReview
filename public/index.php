<!DOCTYPE html>
<html lang="es-mx">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/styles.css?version=1">
  <script defer src="./js/app.js"></script>
  <title>Reseñas de libros</title>
</head>
<body>
  <header>
    <h2>Reseñas de libros</h2>
    <div class="searcher">
      <input type="text" name="search" placeholder="busqueda por titulo" id="search">
      <button id="search_by_tittle" type="button">Buscar</button>
    </div>
    <div class="adder">
      <button id="add_review" type="button">Añadir reseña</button>
    </div>
  </header>
  <div class="content">
    <table>
      <thead>
        <tr>
          <th><h3>Titulo</h3></th>
          <th><h3>Puntuación</h3></th>
          <th><h3>Reseña</h3></th>
          <th><h3>Autor</h3></th>
        </tr>
      </thead>
      <tbody class="appear" id="body-table"></tbody>
    </table>
    <div id="img-empty">
      <img title="unu" src="./images/empty.svg">
    </div>
    <div class="div-pages">
      <button id="ant" type="button">&lt;</button>
      <div id="div-num-pages"></div>
      <button id="sig" type="button">&gt;</button>
    </div>
  </div>
  <?php 
  include_once('./pages/modal-delete.php');
  include_once('./pages/add-review.php');
  ?>
  <footer>Aplicación web diseñada y desarrollada por:&nbsp;<span>Miguel Ángel Santillán Alonso</span></footer>
</body>
</html>