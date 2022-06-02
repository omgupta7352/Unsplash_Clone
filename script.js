let searchParam = location.search.split('=').pop();
const access_key='titMn05TTm-g2V9duADnSUkHWnxbStkoyS4BssKx268';
const random_photo_url=`https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`
const search_photo_url=`https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`
const gallery=document.querySelector('.gallery');
let allImages;
const getImages=()=>{
    fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        makeImages(allImages);
    });
}

const searchImages=()=>{
    fetch(search_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        makeImages(allImages);
    });
}

const makeImages = (data) =>{
    data.forEach((item,index) => {
        console.log(item);
        let img=document.createElement('img');
        img.src=item.urls.regular;
        img.className='galler';
        gallery.appendChild(img);

        //popup

        img.addEventListener('click',() => {
            current=index;
            showPopup(item);
        })
    })
}
const showPopup = (item) =>{
    let popup= document.querySelector('.image-popup');
    const downloatBtn = document.querySelector('.download-btn');
    const closeBtn = document.querySelector('.close-btn');
    const image = document.querySelector('.large-image');
    popup.classList.remove('hide');
    downloatBtn.href= item.links.html;
    image.src= item.urls.regular;

    closeBtn.addEventListener('click', () => {
        popup.classList.add('hide');
    })
}
if(searchParam == ''){
    getImages();
}
else{
    searchImages();
}

const preBtns= document.querySelector('.pre');
const nxtBtns= document.querySelector('.next');
preBtns.addEventListener('click', () => {
    if(current>0){
        current--;
        showPopup(allImages[current]);
    }
})
nxtBtns.addEventListener('click', () => {
    if(current< allImages.length-1){
        current++;
        showPopup(allImages[current]);
    }
})