const btn_add_review_modal = document.getElementById('add_review');
const btn_add_finish_review = document.getElementById('add-finish-review');
const modal = document.getElementById('myModal');
const table_title_selector = document.querySelectorAll('.title');
const modal_content = document.getElementById('modal-content');
const body_table = document.getElementById('body-table');
const btn_search = document.getElementById('search_by_tittle');
const text_by_search = document.getElementById('search');
const btn_next_page = document.getElementById('sig');
const btn_prev_page = document.getElementById('ant');
const div_num_pages = document.getElementById('div-num-pages');
const delete_modal = document.getElementById('delete-modal');
const delete_modal_content = document.getElementById('delete-modal-content');
const btn_acept_delete = document.getElementById('delete');
const btn_cancel_delete = document.getElementById('cancel-delete');
const modal_text_autor = document.getElementById('modal-text-autor');
const modal_stars = document.querySelectorAll('.modal-stars');
const modal_text_title = document.getElementById('modal-text-title');
const btn_close_modal = document.getElementById('closeModalBtn');
const modal_text_review = document.getElementById('modal-text-review');
const label_stars = document.querySelectorAll('.label-star');
const img_empty = document.getElementById('img-empty');

const stars = {
  1 : '⭐',
  2 : '⭐⭐',
  3 : '⭐⭐⭐',
  4 : '⭐⭐⭐⭐',
  5 : '⭐⭐⭐⭐⭐'
}

let actual_page = 1;
let page = 0;
let search = false;
let data;
let search_data;
let review_stars=0;
let edi=false;
let edi_id;

get_data();

btn_add_review_modal.addEventListener('click', function() {
  modal_content.classList.add('scale-in');
  modal.classList.remove('scale-out');
  setTimeout(() => {
    modal.classList.add('show');
  }, 1);
});
btn_cancel_delete.addEventListener('click',()=> {
  setTimeout(() => {
    delete_modal.classList.remove('scale-in');
  }, 1);
  setTimeout(() => {
    delete_modal.classList.add('scale-out');
  }, 1);
  setTimeout(() => {
    delete_modal.classList.remove('show');
  }, 390);
});
btn_acept_delete.addEventListener('click',async ()=> {
  let datos = new URLSearchParams();
  datos.append('eliminar',edi_id);
  const response = await fetch(
    '../src/controller/borrar.php',
    {
      method:'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:datos
    }
  );
  if(response.ok){
    const respuesta = await response.json();
    //console.log(respuesta);
  } else {
    console.log('Error en la respuesta de la solicitud.')
  }
  setTimeout(() => {
    delete_modal.classList.remove('scale-in');
  }, 1);
  setTimeout(() => {
    delete_modal.classList.add('scale-out');
  }, 1);
  setTimeout(() => {
    delete_modal.classList.remove('show');
  }, 390);
  setTimeout(() => {
    get_data();
    if(search){
      get_search_data(text_by_search.value.toLowerCase());
    }
  }, 470);
  setTimeout(()=> {
    let num_pages;
    if(search)
      num_pages =  Object.keys(search_data).length;
    else
      num_pages = Object.keys(data).length;
    if(actual_page>Math.ceil(num_pages/5)) {
      setPage(Math.ceil(num_pages/5));
      set_pages();
    }
  }, 500);
  setTimeout(() => {
    set_table();
  }, 500);
});
btn_next_page.addEventListener('click', async ()=> {
  let num_pages;
  if(search)
    num_pages = Object.keys(search_data).length;
  else
    num_pages = Object.keys(data).length;
  
  setPage(actual_page%(Math.ceil(num_pages/5))+1);
  //console.log(actual_page);
  await set_table();
  set_pages();
});
btn_prev_page.addEventListener('click',async ()=> {
  let num_pages;
  if(search)
    num_pages =  Object.keys(search_data).length;
  else
    num_pages = Object.keys(data).length;
  
  if(actual_page==1)
    setPage(Math.ceil(num_pages/5));
  else
    setPage(actual_page-1);
  //console.log(actual_page);
  await set_table();
  set_pages();
});
btn_search.addEventListener('click',()=> setSearch());
text_by_search.addEventListener('input', async (event)=> {
  const inputValue = event.target.value;
  if(inputValue==='') {
    search = false;
    actual_page=1;
    setPage(actual_page);
    await set_table();
    set_pages();
  }
});
text_by_search.addEventListener('keyup',(event)=> {
  if(event.keyCode===13){
    setSearch();
  }
});
btn_close_modal.addEventListener('click', ()=>close_modal());
btn_add_finish_review.addEventListener('click', async ()=> {
  const title = modal_text_title.value;
  const author = modal_text_autor.value;
  const modal_review = modal_text_review.value;
  let regex = /^(?=.*[a-zA-Z])|(?=.*\d)/;
  if(regex.test(title)&&regex.test(author)&&regex.test(modal_review)&&review_stars!=0){
    //console.log('Todos los campos cumplen.');
    if(!edi)
     await save_review(title,author,modal_review,review_stars,Object.keys(data)[Object.keys(data).length-1],false);
    else
     await save_review(title,author,modal_review,review_stars,edi_id,true);
    close_modal();
    setTimeout(() => {
      get_data();
      if(search){
        get_search_data(text_by_search.value.toLowerCase());
      }
    }, 480);
    setTimeout(() => {
      set_table();
    }, 500);
  }else {
    if(!regex.test(title)) {
      modal_text_title.classList.add('error-shake');
      setTimeout(() => {
        modal_text_title.classList.remove('error-shake');
      }, 610);
    }
    if(!regex.test(author)){
      modal_text_autor.classList.add('error-shake');
      setTimeout(()=>{
        modal_text_autor.classList.remove('error-shake');
      }, 610);
    }
    if(!regex.test(modal_review)){
      modal_text_review.classList.add('error-shake');
      setTimeout(()=>{
        modal_text_review.classList.remove('error-shake');
      }, 610);
    }
    if(review_stars==0){
      //console.log('Seleccione las estrellas');
      label_stars.forEach((star)=>{
        setTimeout(()=>{
          star.classList.add('see-me');
        },1);
        setTimeout(()=>{
          star.classList.remove('see-me');
        },600);
      });
    }
  }
});

async function setSearch(){
  let palabra = text_by_search.value;
  let regex = /^(?=.*[a-zA-Z])|(?=.*\d)/;
  if(regex.test(palabra)) {
    actual_page = 1;
    setPage(actual_page);
    search = true;
    await get_search_data(palabra.toLowerCase());
    await set_table();
    set_pages();
  }
}
function setPage(actual) {
  actual_page=actual;
  page = actual*5;
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
async function get_search_data(palabra) {
  let datos = new URLSearchParams();
  datos.append('busqueda',palabra);
  const response = await fetch(
    '../src/controller/buscar.php',{
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: datos,
    });
    if (response.ok) {
    search_data = await response.json();
    //console.log(search_data);
  } else {
    console.log('Error en la respuesta de la solicitud.')
  }
}
async function get_data() {
  const response = await fetch(
    '../src/controller/leer.php', {
      method: "GET"
    });
    if (response.ok) {
    data = await response.json();
    //console.log(data);
    setPage(actual_page);
    await set_table();
    set_pages();
  } else {
    console.log('Error en la respuesta de la solicitud.')
  }
}
async function set_table() {
  let body_table_str = `<tbody>`;
  let aux = 0;
  let data_aux;
  if(search)
    data_aux = search_data;
  else
    data_aux = data;
  body_table.classList.remove('appear');
  setTimeout(() => {
    body_table.classList.add('appear');
  }, 1);
  Object.entries(data_aux).forEach(([key, value]) => {
    if(aux>=page-5&&aux<=page-1) {
      //console.log(aux+':'+page);
      body_table_str+=`
      <tr>
        <td class="title">${toTitleCase(value[0])}</td>
        <td class="stars">${stars[value[1]]}</td>
        <td class="review">
          <p>${capitalizeFirstLetter(value[2])}</p>
          <div class="table-div-buttons">
            <button class="button-edit" onClick="edit(this)" value="${value[4]}" type="button"><img src="./images/edit-ivory.svg" alt="Editar" title="Editar"></button>
            <button class="button-delete" onClick="del(this)" value="${value[4]}" type="button"><img src="./images/delete-ivory.svg" alt="Borrar" title="Borrar"></button>
          </div>
        </td>
        <td class="autor">${toTitleCase(value[3])}</td>
      </tr>`;
    }
    aux++;
  });
  body_table_str+=`</tbody>`;
  body_table.innerHTML =  body_table_str;
}
async function set_pages() {
  let num_pages;
  if(search)
    num_pages = Object.keys(search_data).length;
  else
    num_pages = Object.keys(data).length;
  img_empty.classList.remove('show');
  //console.log(num_pages);
  let string_span = ``;
  if(actual_page>=5) {
    string_span+=`<span onclick="actualice_table(this)">1...</span>`
    for(let i = actual_page-3;i<(actual_page==Math.ceil(num_pages/5)?actual_page:(actual_page==Math.ceil(num_pages/5)-1?actual_page+1:actual_page+2));i++) {
      if(actual_page==i+1)
        string_span+=`<span onclick="actualice_table(this)" class="actual">${actual_page}</span>`
      else
        string_span+=`<span onclick="actualice_table(this)">${i+1}</span>`;
    }
  }else {
    for(let i = 0;i<(5<Math.ceil(num_pages)/5?5:Math.ceil(num_pages/5));i++) {
      if(actual_page==i+1)
        string_span+=`<span onclick="actualice_table(this)" class="actual">${actual_page}</span>`
      else
        string_span+=`<span onclick="actualice_table(this)">${i+1}</span>`;
    }
  }
  if(num_pages==0){
    string_span+=`<span class="actual">0</span>`;
    img_empty.classList.add('show');
  }
  div_num_pages.innerHTML = string_span;
}
async function actualice_table(item) {
  let value = item.textContent || item.innerText;
  if(value=='1...')
    value = 1;
  setPage(Number(value));
  await set_table();
  set_pages();
}
function edit(element) {
  edi = true;
  edi_id = element.value;
  modal_content.classList.add('scale-in');
  modal.classList.remove('scale-out');
  setTimeout(() => {
    modal.classList.add('show');
  }, 1);
  let data_aux;
  if(search)
    data_aux = search_data;
  else
    data_aux = data;
  Object.entries(data_aux).forEach(([key, value]) => {
    if(value[4]==element.value){
      set_modal(value[0],value[3],value[1], value[2]);
    }
  });
  
}
function del(element) {
  edi_id = element.value;
  delete_modal_content.classList.add('scale-in');
  delete_modal.classList.remove('scale-out');
  setTimeout(() => {
    delete_modal.classList.add('show');
  }, 1);
}
function set_stars(element){
  review_stars = element.value;
}
async function close_modal(){
  setTimeout(() => {
    edi = false
    modal_stars.forEach(star => {
      star.checked = false;
    });
    modal_text_title.value = '';
    modal_text_review.value = '';
    modal_text_autor.value = '';
    review_stars = 0;
  }, 490)
  setTimeout(() => {
    modal.classList.remove('scale-in');
  }, 1);
  setTimeout(() => {
    modal.classList.add('scale-out');
  }, 1);
  setTimeout(() => {
    modal.classList.remove('show');
  }, 390);
}
async function save_review(title, author, review, stars, id, edit){
  let datos = new URLSearchParams();
  datos.append('title',title);
  datos.append('author',author);
  datos.append('review',review);
  datos.append('stars',stars);
  datos.append('id', Number(id)+1);
  datos.append('edit', Boolean(edit));
  const response = await fetch(
    '../src/controller/guardar.php',
    {
      method:'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:datos
    }
  );
  if(response.ok){
    const respuesta = await response.json();
    //console.log(respuesta);
  } else {
    console.log('Error en la respuesta de la solicitud.')
  }
  setTimeout(()=>{
    edi = false;
  },600);
}
async function set_modal(title, author, stars, review){
  modal_text_title.value = title;
  modal_text_autor.value = author;
  modal_text_review.value = review;
  review_stars = stars;
  modal_stars.forEach(star => {
    if(star.value==stars)
      star.checked = true;
  });
}
