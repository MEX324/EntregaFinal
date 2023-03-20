const createNav = () => {
    let nav = document.querySelector(".navbar");

    nav.innerHTML = '  <div class="nav"> <img src="./DIBUJOS/Diseño sin título (2).png" class="brandLogo" alt=""> <div class="navItems"> <div class="search"> <input type="text" class="searchBox" placeholder="¿Que Buscas?"> <button class="searchButton">Buscar</button><a href="#"><img src="./DIBUJOS/user.png" alt=""></a><a href="#" id="btnCart"><img src="./DIBUJOS/cart.png" alt=""></a></div></div></div><ul class="linkContainer"><li class="linkItem"><a href="#" class="link">Home</a></li><li class="linkItem"><a href="#" class="link">Miniaturas</a></li><li class="linkItem"><a href="#" class="link">TCG</a></li><li class="linkItem"><a href="#" class="link">Libros</a></li></ul>';
}

createNav();