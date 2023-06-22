<script>
    import FeaturedCard from '$lib/components/FeaturedCard.svelte';
    import { onMount } from 'svelte';

    export let reviews;
    export let name;


    let swiperLoaded;    
    onMount(() => {
        const swiperEl = document.querySelector(`.${name} swiper-container`);

        const swiperParams = {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            autoplay: {
                delay: 8000,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: `.${name} .swiper-next`,
                prevEl: `.${name} .swiper-prev`,
            },
            on: {
                init: function() {
                    swiperLoaded = true;
                },
            },
        };

        Object.assign(swiperEl, swiperParams);
        swiperEl.initialize();
    });
</script>

<div class="{name} relative">
    <swiper-container init="false" class:invisible={!swiperLoaded}>
        {#each reviews as review}
            <swiper-slide class="swiper-slide relative flex flex-col bg-primary-400">
                <FeaturedCard {review} />
            </swiper-slide>
        {/each}
    </swiper-container>
        
    <div class="swiper-nav hidden items-center gap-3 absolute bottom-8 right-8 z-50 md:flex">
        <button type="button" class="swiper-prev p-2 bg-secondary-200 text-primary-500 rounded-full hover:bg-primary-200 hover:text-secondary-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 -rotate-90">
                <path class="fill-current" fill-rule="evenodd" d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"/>
            </svg>
        </button>
        <button type="button" class="swiper-next p-2 bg-secondary-200 text-primary-500 rounded-full hover:bg-primary-200 hover:text-secondary-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 rotate-90">
                <path class="fill-current" fill-rule="evenodd" d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"/>
            </svg>
        </button>
    </div>
</div>