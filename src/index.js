import axios from "axios";
import Notiflix from 'notiflix';
import throttle  from "lodash.throttle";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// import { scrollWindow } from "./helpers/scroll";
import { btnUp } from "./helpers/scroll";

var lightbox = new SimpleLightbox('.gallery a');
const API_KEY = "39616729-48f7c3a0adac5813f5f0e61de";
const BASE_URL = "https://pixabay.com/api/";
let query = "";
let page = 1;

const selectors = {
    form: document.querySelector(".search-form"),
    card: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
    lastPageMessage: document.querySelector(".last-page"),
    btnUp: document.querySelector(".go-up"),

}

selectors.form.addEventListener("input", throttle(handleInput, 500));
selectors.form.addEventListener("submit", onSearch);
selectors.loadMoreBtn.addEventListener("click", onLoad);

//* Save input query
function handleInput(evt) {
query = evt.target.value;
}

//* Search photo and make card
function onSearch(evt) {
    evt.preventDefault();
    page = 1;
    selectors.card.innerHTML = "";
    selectors.lastPageMessage.hidden = true;
    selectors.loadMoreBtn.hidden = true;
    selectors.btnUp.hidden = true;
    Notiflix.Loading.circle("Loading...");

    getPhoto(query)
    .then(({data: {hits, totalHits}}) => {
        if (hits.length === 0 || query.trim() === "") {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        selectors.card.innerHTML = "";
        Notiflix.Loading.remove();
        } else {
            makeCardMarkup(hits);
            const totalPages = Math.ceil(totalHits/40);
            if (page === totalPages) {
              selectors.loadMoreBtn.hidden = true;
              selectors.lastPageMessage.hidden = false;
            } else {
            selectors.loadMoreBtn.hidden = false;
            }
            Notiflix.Loading.remove();
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
}
    )
    .catch(error =>
        console.log(error));
}

//* Button "Load more"
function onLoad() {
  page += 1;
  selectors.loadMoreBtn.hidden = true;
  Notiflix.Loading.circle("Loading...");

  getPhoto(query)
    .then(({data: {hits, totalHits}}) => {
            makeCardMarkup(hits);
            const totalPages = Math.ceil(totalHits/40);
            if (page === totalPages) {
              selectors.loadMoreBtn.hidden = true;
              selectors.lastPageMessage.hidden = false;
            } else {
            selectors.loadMoreBtn.hidden = false;
            }
            Notiflix.Loading.remove();
        }
      )
    .catch(error =>
        console.log(error));
}

//* fetch info with axios
async function getPhoto(query) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 40,
    })
    // console.log(params.toString());
    const response = await axios.get(`${BASE_URL}?${params}`);
    console.log(response);
return response;
}

//* Another fetch (without axios)
// function getPhoto() {
// return fetch(`${BASE_URL}?${params}`)
//     .then(response => {
//         console.log(response);
//         if(!response.ok){
//         throw new Error (response.statusText)
//         }
//         return response.json()})
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => new Error(err))
// }

//* Card markup
// {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
function makeCardMarkup(arr) {
    const markup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
        <div class="photo-container">
        <a class="gallery__link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    </div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`
}).join("");

selectors.card.insertAdjacentHTML("beforeend", markup);

lightbox.refresh();
selectors.btnUp.hidden = false;
btnUp;
}


