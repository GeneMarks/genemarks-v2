<script>
    import { fly, fade } from 'svelte/transition';

    export let review;


    let previewVisible = false;
    let isLoaded = false;
    let previewTimeout;
    
    const loadImage = (src) => new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            isLoaded = true;
            resolve(img);
        };
        img.onerror = reject;

        img.src = src;
    });

    const loadPreview = async () => {
        if (!isLoaded) {
            await loadImage(review.animated_preview);
        }
        previewVisible = true;
    };

    const hidePreview = () => previewVisible = false;
    
    const showPreview = async (bool) => {
        if (!review.animated_preview) return;

        clearTimeout(previewTimeout);
    
        if (bool) {
            previewTimeout = setTimeout(loadPreview, 400);
        } else {
            hidePreview();
        }
    };
</script>

<article
    in:fly={{ y: -20, duration: 200 }}
    class="transition-transform duration-150 ease-in-out scale-100 lg:active:scale-95">
    
    <a href="{`/reviews/${review.slug}`}">
        <div
            on:mouseenter="{() => showPreview(true)}"
            on:mouseleave="{() => showPreview(false)}"
            class="relative">
            <img
                src="{review.thumb}"
                alt="{review.title}"
                loading="lazy"
                class="w-full aspect-[25/14] bg-primary-600">
            
            {#if previewVisible}
                <div
                    transition:fade|local={{ duration: 250 }}
                    class="absolute top-0">
                    <div class="relative after:absolute after:inset-0 after:bg-secondary-200 after:mix-blend-multiply">
                        <img
                            src="{review.animated_preview}"
                            alt="{review.title}"
                            class="w-full aspect-[25/14] object-cover object-center" />
                    </div>
                </div>
            {/if}
        </div>
    </a>
    <div class="p-3 bg-primary-300">
        <h2>
            <a href="{`/reviews/${review.slug}`}" title="{review.title}" class="w-fit line-clamp-1 hover:text-white">
                {review.title}
            </a>
        </h2>
        <aside class="flex items-start justify-between gap-4 flex-wrap mt-2">
            <div class="flex text-sm divide-x divide-primary-200 leading-none">
                <span class="pr-2 font-bold">{review.release_year}</span>
                <span class="pl-2">{review.type === 'movie' ? 'Movie' : 'TV'}</span>
            </div>
            <div class="hidden gap-2 text-xs leading-none xl:flex">
                {#each review.genres as genre}
                    <a href="/reviews?genre={genre}" class="px-3 py-1.5 rounded-full bg-primary-200 hover:bg-primary-200/60">
                        {genre}
                    </a>
                {/each}
            </div>
        </aside>
    </div>
</article>