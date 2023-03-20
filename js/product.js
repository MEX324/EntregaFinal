const productImages = document.querySelectorAll (".productImages img");
const productImageSlide = document.querySelector (".mainImage");
const versionRadioBtn = document.querySelector (".versionRadioBtn");

let activeImageSlide = 0;

productImages.forEach ((item,i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlide].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlide = i;
    })
})


