// import Glide from '@glidejs/glide'
addEventListener('DOMContentLoaded', () => {
    new Glide('.glide', {
        type: 'carousel',
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
});

