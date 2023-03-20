const productContainers = [...document.querySelectorAll('.productContainer')];
const nextBtn = [...document.querySelectorAll('.nextBtn')];
const preBtn = [...document.querySelectorAll('.preBtn')];


productContainers.forEach((item, i) => {
    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    nextBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })
    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})






