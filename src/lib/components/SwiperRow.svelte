<script>
    import ReviewCard from '$lib/components/ReviewCard.svelte';
    import { onMount } from 'svelte';

    export let reviews;
    export let name;

    
    let swiperLoaded;
    onMount(() => {
        const swiperEl = document.querySelector(`.${name} swiper-container`);

        const swiperParams = {
            slidesPerView: 1.2,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,     
            spaceBetween: 24,
            breakpoints: {
                640: {
                    slidesPerView: 2.2,
                    slidesOffsetBefore: 24,
                    slidesOffsetAfter: 24,
                },
                1024: {
                    slidesPerView: 3,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                }
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

<div class="{name} relative mt-6">
    <swiper-container init="false" class:invisible={!swiperLoaded}>
        {#each reviews as review}
            <swiper-slide>
                <ReviewCard {review} />
            </swiper-slide>
        {/each}
    </swiper-container>

    <div class="swiper-nav hidden 2xl:block">
        <button class="swiper-prev absolute -left-16 top-1/2 -translate-y-1/2 p-2 z-20 rounded-full bg-primary-300 text-secondary-200 hover:bg-primary-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 -rotate-90">
                <path class="fill-current" fill-rule="evenodd" d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"/>
            </svg>
        </button>
        <button class="swiper-next absolute -right-16 top-1/2 -translate-y-1/2 p-2 z-20 rounded-full bg-primary-300 text-secondary-200 hover:bg-primary-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 rotate-90">
                <path class="fill-current" fill-rule="evenodd" d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"/>
            </svg>
        </button>
    </div>
    <div class="swiper-nav-alt hidden gap-3 absolute -top-12 right-0 md:flex md:right-6 lg:right-0 2xl:hidden">
        <button class="swiper-prev p-1.5 z-20 rounded-full bg-primary-300 text-secondary-200 hover:bg-primary-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 -rotate-90">
                <path class="fill-current" fill-rule="evenodd" d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"/>
            </svg>
        </button>
        <button class="swiper-next p-1.5 z-20 rounded-full bg-primary-300 text-secondary-200 hover:bg-primary-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 rotate-90">
                <path class="fill-current" fill-rule="evenodd" d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"/>
            </svg>
        </button>
    </div>
</div>

<style lang="postcss">
    .swiper-nav button:disabled {
        @apply hidden;
    }

    .swiper-nav-alt button:disabled {
        @apply opacity-40 hover:bg-primary-300;
    }
</style>