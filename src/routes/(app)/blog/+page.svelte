<script>
    import { page } from '$app/stores';
    import { getParam } from '$lib/utils';
    import ArticlesTags from '$lib/components/ArticlesTags.svelte';
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    export let data;


    $: ({
        items: articles,
        page: currentPage,
        totalPages } = data?.articles);

    $: ({ usedTags } = data);

    $: currentParams = {
        currentTag: getParam('tag', $page.url)
    };

    $: ({ currentTag } = currentParams);
</script>

<svelte:head>
    <title>Blog • Gene Marks</title>
    <meta name="description" content="Articles covering a variety of topics like tutorials, technology, and opinions." />
</svelte:head>

<div class="mx-6 mt-8 md:mt-0">
    <h1 class="relative w-fit mb-6 text-xl text-white capitalize font-semibold before:absolute before:-bottom-1 before:w-full before:h-1 before:bg-secondary-200 sm:text-2xl">
        {currentTag ?? 'All Posts'}
    </h1>

    <ArticlesTags {usedTags} {currentTag} />

    <div class="flex flex-col gap-4 mt-8 sm:gap-0">
        {#each articles as article}
            <ArticleCard class="odd:bg-primary-600" {article} />
        {/each}
    </div>

    <Pagination {currentPage} {totalPages} />
</div>

