<script>
    import '../../../../styles/markdown.postcss';
    import SeasonsMenu from '$lib/components/SeasonsMenu.svelte';
    import SpoilersBadge from '$lib/components/SpoilersBadge.svelte';
    import LikeButton from '$lib/components/LikeButton.svelte';
    import CopyToClipboard from '$lib/components/CopyToClipboard.svelte';

    export let data;

    $: ({
        id,
        collectionName,
        slug: parentSlug,
        title,
        body,
        type,
        director,
        release_year,
        contains_spoilers,
        genres,
        cover,
        logo,
        likes,
        seasons } = data?.review);

    $: seasonData = {
        seasons,
        parentSlug,
    };

    $: likeData = {
        id,
        collectionName,
        likes
    };
</script>

<article>
    <div class="relative">
        <div class="relative aspect-[9/5] bg-primary-600 after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-primary-500 sm:mx-6 lg:aspect-[9/4]">
            <img src="{cover}" alt="{title}" class="w-full aspect-[9/5] object-cover lg:aspect-[9/4]">
        </div>

        <div class="relative mx-6 bottom-0 left-0 flex flex-col items-center gap-4 -mt-10 px-4 sm:absolute sm:items-start">
            <h1>
                <img src="{logo}" alt="{title}" class="relative max-w-[16rem] max-h-24">
            </h1>

            <aside class="flex flex-col-reverse gap-x-4 flex-wrap items-center justify-center sm:flex-row
                {type === 'movie' ? 'gap-y-3' : 'gap-y-4'}">
               
                {#if seasons?.length}
                    <SeasonsMenu {seasonData} />
                {:else}
                    <div class="flex gap-2 flex-wrap text-xs">
                        {#each genres as genre}
                            <a href="/reviews?genre={genre}" class="px-3 py-1 rounded-full bg-primary-300 hover:bg-primary-200">
                                {genre}
                            </a>
                        {/each}
                    </div>
                {/if}

                <div class="flex gap-4 flex-wrap text-sm text-white">
                    <span class="font-bold">{release_year}</span>
                    {director}
                </div>
            </aside>
        </div>
    </div>
    <div class="mx-6">
        <div class="relative max-w-[46rem] mx-auto mt-16 sm:mt-24">
            {#if contains_spoilers}
                <SpoilersBadge />
            {/if}

            <div class="markdown markdown--review">
                {@html body}
            </div>

            <aside class="flex items-center flex-wrap justify-center gap-3 mt-14">
                <LikeButton {likeData} />
                <CopyToClipboard />
            </aside>
        </div>
    </div>
</article>