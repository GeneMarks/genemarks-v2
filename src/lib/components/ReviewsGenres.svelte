<script>
    import { page } from '$app/stores';
    import { setParam } from '$lib/utils';
    import { genres } from '$lib/review-params';
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
    } from '@rgossiaux/svelte-headlessui';

    export let currentGenre;
</script>

<Disclosure let:open>
    <DisclosurePanel static>
        <ul
            class:closed={!open}
            class="flex flex-wrap gap-2 text-sm capitalize rounded-t sm:gap-y-1 sm:gap-x-0 sm:p-4 sm:bg-primary-400">
            <li class="sm:w-1/3 md:w-1/4 lg:w-1/5">
                <a href="{setParam($page.url, 'genre')}"
                    class="block py-2 px-3 rounded bg-primary-300 hover:text-white hover:bg-primary-200 sm:overflow-hidden sm:overflow-ellipsis sm:bg-transparent sm:hover:bg-primary-300"
                    class:active={!currentGenre}>
                    All Genres
                </a>
            </li>

            {#each genres as genre}
                <li class="sm:w-1/3 md:w-1/4 lg:w-1/5">
                    <a href="{setParam($page.url, 'genre', genre)}"
                        class="block py-2 px-3 rounded bg-primary-300 hover:text-white hover:bg-primary-200 sm:overflow-hidden sm:overflow-ellipsis sm:bg-transparent sm:hover:bg-primary-300"
                        class:active={currentGenre === genre}>
                        {genre}
                    </a>
                </li>
            {/each}
        </ul>
    </DisclosurePanel>

    <aside class="sm:pb-4 sm:px-4 sm:rounded-b sm:bg-primary-400">
        <DisclosureButton class="w-full mt-2 py-2.5 text-sm font-medium rounded-md bg-primary-300/40 hover:bg-primary-300 sm:mt-0">
            {open ? 'Show Less' : 'Show More'}
        </DisclosureButton>
    </aside>
</Disclosure>

<style lang="postcss">
    .active {
        @apply text-secondary-100 hover:text-secondary-100;
    }

    .closed {
        & li:nth-child(n+10) { @apply hidden md:block; }
        & li:nth-child(n+13) { @apply md:hidden lg:block; }
        & li:nth-child(n+16) { @apply lg:hidden; }
    }
</style>