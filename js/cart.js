

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        pintarProductos(data)
        detectarBotones(data)
    } catch (error) {
        console.log(error)
    }
}

const contendorProductos = document.querySelector('.productContainer')
const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    data.forEach(producto => {
        template.querySelector('.productThumb').setAttribute('src', producto.imagen)
        template.querySelector('.productName').textContent = producto.nombre
        template.querySelector('.productBrand').textContent = producto.Juego
        template.querySelector('.discountTag').textContent = producto.descuento
        template.querySelector('.price').textContent = producto.precio
        template.querySelector('.actualPrice').textContent = producto.precioAnterior
        template.querySelector('.compraBtn').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contendorProductos.appendChild(fragment)
}

let carrito = {}

const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.compraBtn')

    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            Toastify({

                text: "Producto Agregado al Carrito",
                
                duration: 3000
                
                }).showToast();
            carrito[producto.id] = { ...producto }
            pintarCarrito()
        })
    })
}

const items = document.querySelector('#itemsCarrito')

const pintarCarrito = () => {
    items.innerHTML = ''

    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()

    Object.values(carrito).forEach(producto => {

        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.nombre
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad
    
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()
    accionBotones()

}

//JQUERY para esconter carrito

$("#btnCart").click(function(){
    $(".containter").show();
})

$("#cartOut").click(function(){
    $(".containter").hide();
})

const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)


    const vaciar = document.querySelector('#vaciar-carrito')
    vaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
    const comprar = document.querySelector('#finalizar-compra')
    comprar.addEventListener('click', () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La opcion de compra en linea aun no esta disponible. Te dejamos nuestro contacto de whatsapp para que hagas tu pedido. Disculpa la molestias.',
            footer: '<a href="">Pedir por Whatsapp</a>'
          })
        pintarCarrito()
    })

}

const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#itemsCarrito .btn-info')
    const botonesEliminar = document.querySelectorAll('#itemsCarrito .btn-danger')

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito()
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito()
        })
    })
}