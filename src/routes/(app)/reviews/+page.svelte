<script>
    import ReviewCard from '$lib/components/ReviewCard.svelte';
    import ReviewsGenres from '$lib/components/ReviewsGenres.svelte';
    import ReviewsMobileOptions from '$lib/components/ReviewsMobileOptions.svelte';
    import ReviewsOptions from '$lib/components/ReviewsOptions.svelte';
    import ReviewsFiller from '$lib/components/ReviewsFiller.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import { page } from '$app/stores';
    import { getParam, setParam } from '$lib/utils';
    import { Icon, XMark } from 'svelte-hero-icons';

    export let data;


    $: ({
        items: reviews,
        totalItems: totalReviews,
        page: currentPage,
        totalPages } = data?.reviews);

    $: currentParams = {
        currentType: getParam('type', $page.url) || 'all',
        currentSort: getParam('sort', $page.url) || 'new',
        currentGenre: getParam('genre', $page.url)
    };

    $: ({ currentType, currentGenre } = currentParams);

    let getTitle;
    $: {
        const titlesMap = {
            'all': currentGenre ? currentGenre : 'All Reviews',
            'movie': currentGenre ? `${currentGenre} Movies` : 'Movies',
            'tv': currentGenre ? `${currentGenre} Shows` : 'Shows'
        };
    
        getTitle = () => titlesMap[currentType];
    }
</script>

<svelte:head>
    <title>Reviews • Gene Marks</title>
    <meta name="description" content="Movie and TV reviews from every genre and time period, written by Gene Marks." />
</svelte:head>

<div class="mx-6 mt-8 sm:mt-0">
    <ReviewsGenres {currentGenre} />

    <div class="flex gap-4 items-center justify-between mb-6 mt-8 md:mt-12">
        {#if currentGenre}
            <div class="flex items-center gap-2">
                <h1 class="relative text-xl text-white capitalize font-semibold before:absolute before:-bottom-1 before:w-full before:h-1 before:bg-secondary-200 sm:text-2xl">
                    {getTitle()}
                </h1>
                <a href="{setParam($page.url, 'genre')}" class="p-1 rounded-full text-primary-100/60 bg-primary-400 hover:bg-primary-300 hover:text-primary-100">
                    <Icon src="{XMark}" mini class="w-4 h-4" />
                </a>
            </div>
        {:else}
            <h1 class="relative text-xl text-white font-semibold before:absolute before:-bottom-1 before:w-full before:h-1 before:bg-secondary-200 sm:text-2xl">
                {getTitle()}
            </h1>
        {/if}

        <ReviewsMobileOptions {currentParams} />
        <ReviewsOptions {currentParams} />
    </div>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
        {#each reviews as review}
            <ReviewCard {review} />
        {/each}

        {#if totalReviews === 0}
            <ReviewsFiller />
        {/if}
    </div>

    <Pagination {totalPages} {currentPage} />
</div>