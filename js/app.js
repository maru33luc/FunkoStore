const menu = document.querySelector(".navbar__menu")

const iconoHamb = document.querySelector(".menu-icon")

iconoHamb.addEventListener("click", () => {
    menu.classList.toggle("navbar__menu")
    menu.classList.toggle("navbar__menu-toogle")
})

