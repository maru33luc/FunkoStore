
if (localStorage.getItem('script') == 'scriptCargado') {
    // Obtener el botón desde la variable global
    paymentButton = window.paymentButton;
    mercadoPagoBtn = window.mercadoPagoBtn;

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

            await new Promise(resolve => setTimeout(resolve, 500)); // Esperar a que se cargue el DOM

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
                        title: 'Small Silk Plate',
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
                
            // Resto de la configuración del Brick
        } catch (error) {
            console.error('Error al iniciar el pago:', error);
        }
    }

    // Llamar a la función para iniciar el pago
    iniciarPago();
}