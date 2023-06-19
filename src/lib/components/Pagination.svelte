<script>
    import { page } from '$app/stores';
    import { changePage, setParam } from '$lib/utils';
    import {
        Icon,
        ChevronLeft,
        ChevronRight,
        ChevronDoubleLeft,
        ChevronDoubleRight
    } from 'svelte-hero-icons';

    export let currentPage;
    export let totalPages;


    $: startPage = Math.max(Math.min(currentPage - 2, totalPages - 4), 1);
    $: endPage = Math.min(startPage + 4, totalPages);
    $: pageNumbers = Array(endPage - startPage + 1).fill(0).map((_, i) => i + startPage);
</script>

{#if totalPages >= 1}
    <nav aria-label="pagination" class="flex justify-center mt-14">
        <ul class="flex gap-2 flex-wrap justify-center">
            <li>
                <a
                    href="{setParam($page.url, 'page')}"
                    class:disabled="{currentPage === 1}">
                    <Icon src="{ChevronDoubleLeft}" mini class="w-6 h-6" />
                </a>
            </li>
            <li>
                <a
                    href="{currentPage === 1
                    ? setParam($page.url, 'page')
                    : changePage($page.url, currentPage - 1)}"
                    class:disabled="{currentPage === 1}">
                    <Icon src="{ChevronLeft}" mini class="w-6 h-6" />
                </a>
            </li>
            {#each pageNumbers as number}
                <li>
                    <a
                        href="{number === 1
                        ? setParam($page.url, 'page')
                        : changePage($page.url, number)}"
                        class:active="{currentPage === number}">
                        {number}
                    </a>
                </li>
            {/each}
            <li>
                <a
                    href="{currentPage === totalPages
                    ? changePage($page.url, currentPage)
                    : changePage($page.url, currentPage + 1)}"
                    class:disabled="{currentPage === totalPages}">
                    <Icon src="{ChevronRight}" mini class="w-6 h-6" />
                </a>
            </li>
            <li>
                <a
                    href="{changePage($page.url, totalPages)}"
                    class:disabled="{currentPage === totalPages}">
                    <Icon src="{ChevronDoubleRight}" mini class="w-6 h-6" />
                </a>
            </li>
        </ul>
    </nav>
{/if}

<style lang="postcss">
    a {
        @apply flex items-center justify-center w-12 h-12 bg-primary-400 rounded-md hover:bg-primary-300;

        &.active {
            @apply text-secondary-200 bg-primary-300 -mt-0.5;
        }

        &.disabled {
            @apply pointer-events-none cursor-default text-primary-200 opacity-80;
        }
    }
</style>
