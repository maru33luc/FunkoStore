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

minPriceInput.addEventListener('change', function () {
    validarYFormatearPrecios(minPriceInput);
});
maxPriceInput.addEventListener('change', function () {
    validarYFormatearPrecios(maxPriceInput);
});

function validarYFormatearPrecios(input) {

    if (isNaN(input.value)) {
        alert('Por favor, ingrese valores numéricos válidos para los precios.');
        return;
    }
    if (input.value < 0) {
        alert('Por favor, ingrese valores numéricos positivos para los precios.');
        return;
    }
    const minPriceValue = parseFloat(input.value);
    const minPriceFormatted = minPriceValue.toFixed(2);
    input.value = minPriceFormatted;

}

// --------------Pagination----------------

const itemsPerPage = 9;
const pageLinks = document.querySelectorAll('.page-link');
const previousPage = document.getElementById('previous-page');
const nextPage = document.getElementById('next-page');

const allItems = document.querySelectorAll('.card-item');
const totalItems = allItems.length;

let currentPage = 0; 


function showPage(pageNumber) {
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    allItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.style.position = 'relative';
            item.style.display = 'block';
        } else {
            item.style.position = 'relative';
            item.style.display = 'none';
        }
    });

    pageLinks.forEach((link, index) => {
        if (index === pageNumber) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    console.log(pageNumber);
}

function goToPage(pageNumber) {
    if (pageNumber < 0) {
        currentPage = 0; // No puede ser menor que 0
    } else if (pageNumber >= Math.ceil(totalItems / itemsPerPage)) {
        currentPage = Math.ceil(totalItems / itemsPerPage) - 1; // No puede ser mayor que el último índice de página
    } else {
        currentPage = pageNumber;
    }

    showPage(currentPage);
   
}

showPage(currentPage);

pageLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(index);
        
    });
});

previousPage.addEventListener('click', (e) => {
    e.preventDefault();
    goToPage(currentPage - 1);
});

nextPage.addEventListener('click', (e) => {
    e.preventDefault();
    goToPage(currentPage + 1);
});
