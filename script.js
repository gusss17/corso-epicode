const swiper = new Swiper('.swiper', {
    loop: true,  // Looping del carousel
    slidesPerView: 1,  // Visualizza un solo "set" di immagini per volta
    spaceBetween: 10,  // Spazio tra le immagini (se le immagini sono in un solo slide)
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
});