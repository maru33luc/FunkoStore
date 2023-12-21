if (localStorage.getItem('script') == 'scriptCargado') {
    let paymentButton = window.paymentButton;
    let mercadoPagoBtn = window.mercadoPagoBtn;
    let bricksButtonCreated = false;

    document.addEventListener('carritoVacioEvent', () => {
        ocultarBotonPago();
    });

    document.removeEventListener('bricksButtonCreated', bricksButtonCreatedHandler);
    document.addEventListener('bricksButtonCreated', bricksButtonCreatedHandler);

    function bricksButtonCreatedHandler() {
        if (!bricksButtonCreated) {
            console.log('Evento bricksButtonCreated disparado');
            bricksButtonCreated = true;
        }
    }

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
        try {
            await new Promise(resolve => setTimeout(resolve, 60));

            const cartItems = document.querySelector('.cart-items');
            if (!cartItems || cartItems.childElementCount === 0) {
                return;
            }

            const walletContainer = document.getElementById('wallet_container');
            walletContainer.innerHTML = '<div class="spinner-container"><img class="spinner" style="display: block; margin: auto;" src="../../../../assets/img/spinner.svg" alt="Loading spinner"></div>';

            const totalQuantity = document.getElementById('total-quantity');
            const precio = document.getElementById('total-price').textContent;
            const precioSinSigno = precio.slice(1, precio.length);
            const precioSinPunto = precioSinSigno.replace('.', '');

            const orderData = {
                items: [
                    {
                        title: 'Funkos',
                        quantity: 1,
                        price: parseFloat(precioSinPunto),
                    },
                ],
            };
            const preferenceId = await obtenerPreferenceId(orderData);

            if (!bricksButtonCreated) {
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
                bricksButtonCreated = true;
            }

            const bricksButtonCreatedEvent = new Event('bricksButtonCreated');
            document.dispatchEvent(bricksButtonCreatedEvent);

            document.getElementById('wallet_container').innerHTML = '';
        } catch (error) {
            console.error('Error al iniciar el pago:', error);
        }
    }

    iniciarPago();

    function ocultarBotonPago() {
        if (paymentButton) {
            paymentButton.style.display = 'none';
        }
        if (mercadoPagoBtn) {
            mercadoPagoBtn.style.display = 'none';
        }
    }
}
