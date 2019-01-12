const modal = document.getElementById('myModal');
const img = document.getElementsByClassName('gallery-img');
const modalImg = document.getElementById("img01");
const span = document.getElementById("close");
const img_gallery = document.getElementById('img-gallery');

img_gallery.addEventListener('click', (e)=>{
    if(e.target.className == 'gallery-img'){
        modal.style.display = "block";
        modalImg.src = e.target.src;
    }
});

span.addEventListener('click', ()=>{
    modal.style.display = "none";
});

modal.addEventListener('click', ()=>{
    modal.style.display = "none";
});