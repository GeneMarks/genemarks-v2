<script>
    import { fly, fade } from 'svelte/transition';

    export let review;


    let previewVisible;
    let previewTimeout;
    
    const showPreview = (bool) => {
        clearTimeout(previewTimeout);
    
        if (bool) {
            previewTimeout = setTimeout(() => {
                previewVisible = true;
            }, 400);
        } else {
            previewVisible = false;
        }
    };
</script>

<article
    in:fly={{ y: -20, duration: 200 }}
    class="transition-transform duration-150 ease-in-out scale-100 active:scale-95">
    <a href="{`/reviews/${review.slug}`}">
        <div
            on:mouseenter="{() => showPreview(true)}"
            on:mouseleave="{() => showPreview(false)}"
            class="relative">
            <img src="{review.thumb}" alt="{review.title}" loading="lazy" class="w-full aspect-[25/14] bg-primary-600">
            {#if review.animated_preview && previewVisible}
                <div
                    transition:fade|local={{ duration: 250 }}
                    style="background-image: url({review.animated_preview});"
                    class="absolute top-0 w-full aspect-[25/14] bg-cover bg-center bg-secondary-200 bg-blend-multiply"></div>
            {/if}
        </div>
    </a>
    <div class="p-3 bg-primary-300">
        <h2>
            <a href="{`/reviews/${review.slug}`}" title="{review.title}" class="w-fit line-clamp-1 hover:text-white">
                {review.title}
            </a>
        </h2>
        <aside class="flex items-center justify-between gap-4 flex-wrap mt-1.5 leading-none md:mt-2">
            <div class="flex text-sm divide-x divide-primary-200">
                <span class="pr-2 font-bold">{review.release_year}</span>
                <span class="pl-2">{review.type === 'movie' ? 'Movie' : 'TV'}</span>
            </div>
            <div class="hidden gap-2 text-xs md:flex">
                {#each review.genres as genre}
                    <a href="/reviews?genre={genre}" class="px-3 py-1 rounded-full bg-primary-200 hover:bg-primary-200/60">
                        {genre}
                    </a>
                {/each}
            </div>
        </aside>
    </div>
</article>