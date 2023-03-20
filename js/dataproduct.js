function add_to_cart (e) {

    console.log ("work", e.target);

    let son = e.target;
    let dad = son.parentNode;
    let granpa = dad.parentNode;


    let productName = granpa.querySelector (".productName").textContent;
    let productPrice = granpa.querySelector (".price").textContent;
    let productDiscount = dad.querySelector (".discountTag").textContent;
    let productImage = dad.querySelector (".productThumb").src;


    let product = {
        Nombre: productName,
        Precio: productPrice,
        Promo: productDiscount,
        Imagen: productImage,
    };
}


let compraBtn = document.querySelectorAll(".compraBtn")

console.log (compraBtn)

for (let button of compraBtn) {
    button.addEventListener("click", add_to_cart)


}