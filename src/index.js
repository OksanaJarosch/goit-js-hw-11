// * Для HTTP-запитів використана бібліотека axios.
// * Використовується синтаксис async/await.
// * Для повідомлень використана бібліотека notiflix.

import axios from "axios";
import Notiflix from 'notiflix';

// axios.get(url[, config])

const API_KEY = "39616729-48f7c3a0adac5813f5f0e61de";
const BASE_URL = "https://pixabay.com/api/";

const params = new URLSearchParams({
    key: API_KEY,
    q: "cattt",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
})

// console.log(params.toString());

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
// getPhoto();

async function getPhoto() {
    const response = await axios.get(`${BASE_URL}?${params}`);
return response;
}

getPhoto()
// .then(({data}) => console.log(data))
.then(({data: {hits}}) => {
    console.log(hits)
    if (hits.length === 0) {
    console.log("Sorry, there are no images matching your search query. Please try again.");
    //! Для повідомлень використовуй бібліотеку notiflix.
}}
)
.catch(error =>
    console.log(error));


//     webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.