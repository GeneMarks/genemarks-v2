<script>
    import { page } from '$app/stores';
    import {
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
    } from '@rgossiaux/svelte-headlessui';
    import { offset, flip, shift } from 'svelte-floating-ui/dom';
    import { createFloatingActions } from 'svelte-floating-ui';
    import { fade } from 'svelte/transition';

    export let seasons;


    const [ floatingRef, floatingContent ] = createFloatingActions({
        strategy: "absolute",
        placement: "bottom",
        middleware: [
            offset(12),
            flip(),
            shift(),
        ]
    });
</script>

<Menu let:open class="z-50">
    <MenuButton
        use={[floatingRef]}
        class="px-4 h-9 leading-0 text-sm rounded-md hover:bg-primary-200 sm:h-8 sm:text-xs
        {open ? 'bg-primary-200 outline outline-2 outline-offset-2 outline-primary-300' : 'bg-primary-300'}">
        View Seasons
    </MenuButton>

    {#if open}
        <div transition:fade={{ duration: 100 }}>
            <MenuItems
                static
                use={[floatingContent]}
                class="flex flex-col w-max min-w-[9rem] p-1.5 leading-none text-sm rounded-lg bg-primary-200 drop-shadow-lg">
                {#each seasons as season}
                    <MenuItem
                        let:active
                        href="{`${$page.url}/${season.slug}`}">
                        <div
                            class:active
                            class="flex items-center gap-1.5 px-4 h-10 rounded-lg">
                            {season.title}
                        </div>
                    </MenuItem>
                {/each}
            </MenuItems>
        </div>
    {/if}
</Menu>

<style lang="postcss">
    .active {
        @apply bg-primary-300 text-secondary-200;
    }
</style>