<script>
    import tip from '$lib/tippy';

    export let review;
</script>

<a
    use:tip={{ content: 'Featured Review', theme: 'rainbow', followCursor: true }}
    href="{`/reviews/${review.slug}`}"
    class="flex justify-end relative h-[400px] overflow-hidden bg-primary-400">
    <div class="flex relative w-full after:absolute after:w-full after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-primary-500 after:bg-primary-500/80 md:w-3/4 md:after:bg-primary-500/70 md:after:to-primary-400 md:after:bg-gradient-to-l lg:after:bg-transparent">
        <img src="{review.cover}" alt="{review.title}" class="self-center w-full min-h-full object-cover">
    </div>
</a>

<div class="absolute flex flex-col self-center items-center md:self-start md:items-start top-1/2 -translate-y-1/2 mt-0 p-8 md:max-w-[75%] md:p-16 lg:max-w-[50%]">
    <a href="{`/reviews/${review.slug}`}" class="flex items-end max-w-[12rem] h-32 md:h-24">
        <img src="{review.logo}" alt="{review.title}" class="max-w-full max-h-full drop-shadow-md">
    </a>

    <div class="hidden gap-2 flex-wrap mt-4 text-xs md:flex">
        {#each review.genres as genre}
            <a href="/reviews?genre={genre}" class="px-3 py-1 rounded-full bg-primary-300 hover:bg-primary-200">
                {genre}
            </a>
        {/each}
    </div>

    <p class="text-white mt-4 text-sm line-clamp-2 text-center md:text-left">
        {review.excerpt}
    </p>
    
    <div class="flex flex-col items-center justify-center gap-4 mt-8 text-sm font-medium sm:flex-row md:justify-start">
        <a href="{`/reviews/${review.slug}`}" class="flex items-center h-10 px-4 py-2 rounded-full bg-secondary-200 text-primary-500">
            Read Now
        </a>
        <a href="/reviews" class="group flex items-center h-10 px-4 py-2 rounded-full text-primary-100 bg-primary-300 hover:bg-primary-200">
            <span>All Reviews</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 rotate-90 ease-out duration-300 group-hover:translate-x-1">
                <path class="fill-current" fill-rule="evenodd" d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"/>
            </svg>
        </a>
    </div>
</div>