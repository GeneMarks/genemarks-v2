<script>
    import { page } from '$app/stores';
    import { getParam } from '$lib/utils';
    import ArticlesTags from '$lib/components/ArticlesTags.svelte';
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    export let data;


    $: ({
        items: articles,
        totalItems: totalArticles,
        page: currentPage,
        totalPages,
        usedTags } = data?.articles);

    $: currentParams = {
        currentTag: getParam('tag', $page.url)
    };

    $: ({ currentTag } = currentParams);
</script>

<div class="mx-6 mt-8">
    <header class="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 class="relative w-fit text-xl text-white capitalize font-semibold before:absolute before:-bottom-1 before:w-full before:h-1 before:bg-secondary-200 sm:text-2xl">
            {currentTag || 'All Posts'}
        </h1>
        <span class="text-sm rounded-md border-primary-200 md:px-2 md:py-1 md:border">
            Total Posts: {totalArticles}
        </span>
    </header>

    <ArticlesTags {usedTags} {currentTag} />

    <section class="articles grid gap-4 mt-8 sm:gap-0 md:mt-12">
        {#each articles as article}
            <ArticleCard {article} />
        {/each}
    </section>

    <Pagination {currentPage} {totalPages} />
</div>

