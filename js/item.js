const add = document.querySelector('#add');
const substract = document.querySelector('#substract');
const quantity = document.querySelector('#quantity');

if(quantity.value == "" || quantity.value == null || quantity.value == Nan){
    quantity.value = 0;
}




add.addEventListener('click', () => {
    quantity.value = parseInt(quantity.value) + 1;
});

substract.addEventListener('click', () => {
    if(quantity.value > 0){
        quantity.value = parseInt(quantity.value) - 1;
    }
});

