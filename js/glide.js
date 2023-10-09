new Glide('.glide', {
    type: 'slider',
    startAt: 0,
    perView: 3,
    gap: 10,
    breakpoints: {
        1000: {
            perView: 2
        },
        712: {
            perView: 1
        }
    }
}).mount();