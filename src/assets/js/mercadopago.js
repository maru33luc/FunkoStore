
if (localStorage.getItem('script') == 'scriptCargado') {
    // Obtener el botón desde la variable global
    paymentButton = window.paymentButton;
    mercadoPagoBtn = window.mercadoPagoBtn;

    document.addEventListener('carritoVacioEvent', () => {
        // Llamada a la función para ocultar o destruir el botón de pago
        ocultarBotonPago();
    });

    // let loadingPayment = true;
    let bricksBuilderCreado = false;
    const mp = new MercadoPago('TEST-ad2a00a3-36b2-41ec-9cff-be4ea472b2e4', { locale: 'es-AR' });
    const bricksBuilder = mp.bricks();

    async function obtenerPreferenceId(orderData) {
        try {
            const response = await fetch('http://localhost:8080/create_preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const preference = await response.json();
            return preference.preferenceId;
        } catch (error) {
            throw error;
        }
    }

    async function iniciarPago() {
        if (bricksBuilderCreado === false) {

            try {
                await new Promise(resolve => setTimeout(resolve, 500)); // Esperar a que se cargue el DOM

                // Verificar la existencia de elementos en el carrito
                const cartItems = document.querySelector('.cart-items');
                if (!cartItems || cartItems.childElementCount === 0) {
                    return;
                }

                // Mostrar el spinner de carga
                const walletContainer = document.getElementById('wallet_container');
                walletContainer.innerHTML = '<div class="spinner-container"><img class="spinner" style="display: block; margin: auto;" src="../../../../assets/img/spinner.svg" alt="Loading spinner"></div>';

                // Obtener los elementos después de que se haya actualizado el DOM
                const totalQuantity = document.getElementById('total-quantity');

                // sacarle el signo $ al precio
                const precio = document.getElementById('total-price').textContent;
                const precioSinSigno = precio.slice(1, precio.length);
                const precioSinPunto = precioSinSigno.replace('.', '');

                // Imprimir los valores después de obtener los elementos
                const totalPrice = document.getElementById('total-price');

                const orderData = {
                    items: [
                        {
                            title: 'Funkos',
                            quantity: parseInt(totalQuantity.textContent),
                            price: parseFloat(precioSinPunto),
                        },
                    ],
                };
                const preferenceId = await obtenerPreferenceId(orderData); // Esperar a que se resuelva la promesa

                bricksBuilder.create('wallet', 'wallet_container', {
                    initialization: {
                        preferenceId: preferenceId,
                    },
                    customization: {
                        texts: {
                            action: 'pay',
                            valueProp: 'security_details',
                        },
                    }

                });
                bricksBuilderCreado = true;
                // Ocultar el spinner de carga después de renderizar el botón
                // Agrega aquí la lógica para ocultar el spinner en tu HTML
                document.getElementById('wallet_container').innerHTML = '';

                // Resto de la configuración del Brick
            }
            catch (error) {
                console.error('Error al iniciar el pago:', error);
                // Manejar el error y ocultar el spinner de carga si es necesario
                // loadingPayment = false;
            }
        }
    }

    // Llamar a la función para iniciar el pago
    iniciarPago();

    // Función para ocultar o destruir el botón de pago
    function ocultarBotonPago() {
        if (paymentButton) {
            paymentButton.style.display = 'none';
        }
        if (mercadoPagoBtn) {
            mercadoPagoBtn.style.display = 'none';
        }
    }
}