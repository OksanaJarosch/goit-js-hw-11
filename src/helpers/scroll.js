//* Scroll to input
// export function scrollWindow() {
//     if (window.scrollY != 0) {
//       setTimeout(function () {
//         window.scrollTo(0, window.scrollY - 50);
//         scrollWindow();
//       }, 10);
//     }
//   }


export const btnUp = document.querySelector('.go-up');
btnUp.addEventListener('click', () => {
   window.scrollTo(0, 0);
});

// export const btnScroll = document.querySelector('.go-up');
// window.onscroll = () => {
//    if (window.scrollY > 700) {
//       btnScroll.classList.remove('btn-hidden');
//    } else if (window.scrollY < 700) {
//       btnScroll.classList.add('btn-hidden');
//    }
// }