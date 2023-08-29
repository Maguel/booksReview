<div id="myModal" class="modal">
  <div id="modal-content">
    <div class="close-btn">
      <img id="closeModalBtn" src="./images/close.svg" alt="Cerrar" title="Cerrar">
    </div>
    <div class="title-modal"><h3>Añadir nueva reseña</h3></div>
    <div class="div-modal-content">
      <input type="text" name="titulo" autocomplete="none" id="modal-text-title" placeholder="Titulo del libro">
      <input type="text" name="autor" autocomplete="none" id="modal-text-autor" placeholder="Autor del libro">
      <div class="modal-star-rating">
        <input onclick="set_stars(this)" class="modal-stars" type="radio" id="star5" name="rating" value="5"><label class="label-star" for="star5" title="5 estrellas">☆</label>
        <input onclick="set_stars(this)" class="modal-stars" type="radio" id="star4" name="rating" value="4"><label class="label-star" for="star4" title="4 estrellas">☆</label>
        <input onclick="set_stars(this)" class="modal-stars" type="radio" id="star3" name="rating" value="3"><label class="label-star" for="star3" title="3 estrellas">☆</label>
        <input onclick="set_stars(this)" class="modal-stars" type="radio" id="star2" name="rating" value="2"><label class="label-star" for="star2" title="2 estrellas">☆</label>
        <input onclick="set_stars(this)" class="modal-stars" type="radio" id="star1" name="rating" value="1"><label class="label-star" for="star1" title="1 estrella">☆</label>
      </div>
      <textarea type="text" name="resegna" id="modal-text-review" placeholder="Escriba su reseña"></textarea>
    </div>
    <button id="add-finish-review" type="button">Aceptar</button>
  </div>
</div>