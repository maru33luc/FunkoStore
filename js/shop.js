const customSelect = document.querySelector('.custom-select');

const before = customSelect.firstChild;

const select = customSelect.firstChild.nextSibling;

customSelect.addEventListener('change', function () {
    const selectedOption = select.options[select.selectedIndex];
    console.log(selectedOption);
    if (selectedOption.value) {
        customSelect.classList.add('option-selected');
        console.log("d");
    } else {
        customSelect.classList.remove('option-selected');
    }
});

const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');

minPriceInput.addEventListener('change', function() {
    validarYFormatearPrecios(minPriceInput);
  });
maxPriceInput.addEventListener('change', function() {
    validarYFormatearPrecios(maxPriceInput);
  });

function validarYFormatearPrecios(input) {

    if (isNaN(input.value)) {
        alert('Por favor, ingrese valores numéricos válidos para los precios.');
        return;
    }
    if(input.value < 0){
        alert('Por favor, ingrese valores numéricos positivos para los precios.');
        return;
    }
    const minPriceValue = parseFloat(input.value);
    const minPriceFormatted = minPriceValue.toFixed(2);
    input.value = minPriceFormatted;
   
}