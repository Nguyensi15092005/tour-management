// Slider swiperjs tour detail
var swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
// End Slider swiperjs tour detail

// Carts
const cart = localStorage.getItem("cart");
console.log(cart)
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}
// thêm tour vào cart
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (e) => {
    e.preventDefault();
    const quantity = parseInt(e.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
    console.log(quantity, tourId);
    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      
      const isExitTour = cart.findIndex(item => item.tourId == tourId);
      if (isExitTour == -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity
        })
      }
      else {
        cart[isExitTour].quantity = cart[isExitTour].quantity + quantity
      }

      localStorage.setItem("cart", JSON.stringify(cart))
      console.log(cart)
    }
  })
}
// End Carts

