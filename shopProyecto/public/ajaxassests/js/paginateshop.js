/*global fetch*/
(() => {

    const urlBase = document.querySelector('meta[name="url-base"]')['content'] + '/';
    let carrito = [];

    let llamadaAjax = (url, procesarRespuesta) => {
        fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
            procesarRespuesta(data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    let generarTextoProducto = (producto) => {
         return `
        
                                    <div class="col-lg-3 col-md-6 col-6" data-aos="fade-up" data-aos-duration="700">
                                        <div class="product-card">
                                            <div class="product-card-img">
                                                <a class="hover-switch" href="collection-left-sidebar.html">
                                                    <img src="data:imagen/jpeg;base64,${producto.cover}">
                                                </a>
                                                <div class="product-card-action product-card-action-2 justify-content-center">
                                                    <a href="#quickview-modal" class="action-card action-quickview" data-bs-toggle="modal">
                                                        <svg width="26" height="26" viewbox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 0C15.5117 0 20 4.48828 20 10C20 12.3945 19.1602 14.5898 17.75 16.3125L25.7188 24.2812L24.2812 25.7188L16.3125 17.75C14.5898 19.1602 12.3945 20 10 20C4.48828 20 0 15.5117 0 10C0 4.48828 4.48828 0 10 0ZM10 2C5.57031 2 2 5.57031 2 10C2 14.4297 5.57031 18 10 18C14.4297 18 18 14.4297 18 10C18 5.57031 14.4297 2 10 2ZM11 6V9H14V11H11V14H9V11H6V9H9V6H11Z" fill="#00234D"></path>
                                                        </svg>
                                                    </a>

                                                    <a href="#" class="action-card action-wishlist">
                                                        <svg class="icon icon-wishlist" width="26" height="22" viewbox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.96429 0.000183105C3.12305 0.000183105 0 3.10686 0 6.84843C0 8.15388 0.602121 9.28455 1.16071 10.1014C1.71931 10.9181 2.29241 11.4425 2.29241 11.4425L12.3326 21.3439L13 22.0002L13.6674 21.3439L23.7076 11.4425C23.7076 11.4425 26 9.45576 26 6.84843C26 3.10686 22.877 0.000183105 19.0357 0.000183105C15.8474 0.000183105 13.7944 1.88702 13 2.68241C12.2056 1.88702 10.1526 0.000183105 6.96429 0.000183105ZM6.96429 1.82638C9.73912 1.82638 12.3036 4.48008 12.3036 4.48008L13 5.25051L13.6964 4.48008C13.6964 4.48008 16.2609 1.82638 19.0357 1.82638C21.8613 1.82638 24.1429 4.10557 24.1429 6.84843C24.1429 8.25732 22.4018 10.1584 22.4018 10.1584L13 19.4036L3.59821 10.1584C3.59821 10.1584 3.14844 9.73397 2.69866 9.07411C2.24888 8.41426 1.85714 7.55466 1.85714 6.84843C1.85714 4.10557 4.13867 1.82638 6.96429 1.82638Z" fill="#00234D"></path>
                                                        </svg>
                                                    </a>

                                                    <a href="#" class="action-card action-addtocart" id="btnChart" data-id="${producto.id}">
                                                        <svg data-id="${producto.id}" class="icon icon-cart" width="24" height="26" viewbox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 0.000183105C9.25391 0.000183105 7 2.25409 7 5.00018V6.00018H2.0625L2 6.93768L1 24.9377L0.9375 26.0002H23.0625L23 24.9377L22 6.93768L21.9375 6.00018H17V5.00018C17 2.25409 14.7461 0.000183105 12 0.000183105ZM12 2.00018C13.6562 2.00018 15 3.34393 15 5.00018V6.00018H9V5.00018C9 3.34393 10.3438 2.00018 12 2.00018ZM3.9375 8.00018H7V11.0002H9V8.00018H15V11.0002H17V8.00018H20.0625L20.9375 24.0002H3.0625L3.9375 8.00018Z" fill="#00234D"></path>
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="product-card-details">
                                                <h3 class="product-card-title">
                                                    <a href="collection-left-sidebar.html">${producto.nombre}</a>
                                                </h3>
                                                <div class="product-card-price">
                                                    <span class="card-price-regular">${producto.precio} €</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        `;
    };

    let agregarEventoAddChart = (data) => {
        let addChartButtons = document.querySelectorAll('#btnChart');
        addChartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                let idProducto = event.target.dataset.id;
                let producto = data.productos.data.find(p => p.id == idProducto);
                if (producto) {
                    carrito.push(producto);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    generarCarrito();
                }
            });
        });
    };

    let generarContenidoAjax = (data) => {
        let todo = '';
        data.productos.data.forEach(producto => {
            todo += generarTextoProducto(producto);
        });
        let contenidoAjax = document.getElementById('contenidoAjax');
        contenidoAjax.innerHTML = todo;
    };

    let generarEnlacePagina = (link, index) => {
       return ` 
        <li class="page-item"><a id="pagina-${index}" class="page-link"
          href="//">${link.label}</a>
        </li>`;
    };

    let agregarEventosPaginacion = (data) => {
      data.productos.links.forEach((link, index) => {
        let botonPagina = document.getElementById(`pagina-${index}`);
        botonPagina.addEventListener('click', function(event) {
          event.preventDefault(); // Evita que el enlace cambie de página
          shopProducto(link.url);
        });
      });
    };

    let generarPaginacionAjax = (data) => {
        let todo = '';
        data.productos.links.forEach((link, index) => {
            todo += generarEnlacePagina(link, index);
        });
        let paginacionAjax = document.getElementById('paginacionAjax');
        paginacionAjax.innerHTML = todo;
        agregarEventosPaginacion(data);
        agregarEventoAddChart(data);
    };

    let shopProducto = (url) => {
        llamadaAjax(url, (data) => {
            console.log(data);
            generarContenidoAjax(data);
            generarPaginacionAjax(data);
            generarCarrito();
        });
    }

    let generarCarrito = () => {
        let carritoElement = document.getElementById('offcanvas-body');
        carritoElement.innerHTML = '';

        carrito.forEach(producto => {
             let productoElement = document.createElement('div');
             productoElement.classList.add('minicart-item', 'd-flex');
             productoElement.innerHTML = `
                        <div class="mini-img-wrapper">
                            <img  class="mini-img" src="data:imagen/jpeg;base64,${producto.cover}">
                        </div>
                        <div class="product-info">
                            <h2 class="product-title"><a href="#">${producto.nombre}</a></h2>
                            <p class="product-vendor">${producto.descripcion}</p>
                            <div class="misc d-flex align-items-end justify-content-between">
                                <div class="product-remove-area d-flex flex-column align-items-end">
                                    <div class="product-price">${producto.precio} €</div>
                                </div>
                                <div>
                                    <a href="#" class="product-remove" id="btnDelete">Remove</a>
                                </div>
                            </div>
                        </div>
                    `;
            // Agrega un evento de clic al enlace "Remove"
        let enlaceEliminar = productoElement.querySelector('.product-remove');
        enlaceEliminar.addEventListener('click', (event) => {
            console.log('Hola');
            let idProducto = event.target.dataset.id;
            carrito.splice(idProducto, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            generarCarrito();
        });

        // Agrega el elemento del producto al carrito
        carritoElement.appendChild(productoElement);
        });
    };
    
    document.addEventListener('DOMContentLoaded', function(event) {
      let url = urlBase + 'shop?page=1';
      shopProducto(url);
      let carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            generarCarrito();
        }
    });

})();