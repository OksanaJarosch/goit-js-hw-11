import axios from "axios";
import Notiflix from 'notiflix';
import throttle  from "lodash.throttle";

const API_KEY = "39616729-48f7c3a0adac5813f5f0e61de";
const BASE_URL = "https://pixabay.com/api/";
let query = "";
let page = 1;

const selectors = {
    form: document.querySelector(".search-form"),
    card: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
}

selectors.form.addEventListener("input", throttle(handleInput, 500));
selectors.form.addEventListener("submit", onSearch);

//* Save input query
function handleInput(evt) {
query = evt.target.value;
}

//* Search photo and make card
function onSearch(evt) {
    evt.preventDefault();
    selectors.card.innerHTML = "";
    page = 1;
    selectors.loadMoreBtn.hidden = true;

    getPhoto(query)
    // .then(({data}) => console.log(data))
    .then(({data: {hits}}) => {
        if (hits.length === 0 || query.trim() === "") {
        console.log("Sorry, there are no images matching your search query. Please try again.");
        //! Для повідомлень використовуй бібліотеку notiflix.
        selectors.card.innerHTML = "";
        } else {
            makeCardMarkup(hits);
            selectors.loadMoreBtn.hidden = false;
        }
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
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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

selectors.card.insertAdjacentHTML("beforeend", markup)
}

