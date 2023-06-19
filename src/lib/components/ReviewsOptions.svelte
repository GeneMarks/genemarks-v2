<script>
    import { page } from '$app/stores';
    import { setParam } from '$lib/utils';
    import { typeOptions, sortOptions } from '$lib/review-options';
    import { Icon } from 'svelte-hero-icons';
    import {
        Menu,
        MenuButton,
        MenuItems,
        MenuItem,
    } from '@rgossiaux/svelte-headlessui';
    import { offset, flip, shift } from 'svelte-floating-ui/dom';
    import { createFloatingActions } from 'svelte-floating-ui';
    import { fade } from 'svelte/transition';

    export let currentParams;


    $: ({ currentType, currentSort } = currentParams);

    const getSortOption = (value) => sortOptions.find(option => option.value === value);


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

<div class="hidden items-center gap-4 md:flex">
    <ul class="flex p-1.5 text-sm bg-primary-300 rounded-full">
        {#each typeOptions as type}
            <li>
                <a
                    href="{type.value === 'all'
                    ? setParam($page.url, 'type')
                    : setParam($page.url, 'type', type.value)}"
                    class:selected="{currentType === type.value}"
                    class="flex px-4 py-1 rounded-full hover:text-white">
                    {type.label}
                </a>
            </li>
        {/each}
    </ul>

    <Menu let:open class="z-50">
        <MenuButton
            use={[floatingRef]}
            class="flex items-center gap-1.5 px-4 h-10 leading-0 text-sm rounded-lg hover:bg-primary-200
            {open ? 'bg-primary-200 outline outline-2 outline-offset-2 outline-primary-300' : 'bg-primary-300'}">
            <Icon src={getSortOption(currentSort).icon} mini class="w-4 h-4" />
            {getSortOption(currentSort).label}
        </MenuButton>

        {#if open}
            <div transition:fade={{ duration: 100 }}>
                <MenuItems
                    static
                    use={[floatingContent]}
                    class="p-1.5 leading-none text-sm rounded-lg bg-primary-200 drop-shadow-lg">
                    {#each sortOptions as sort}
                        <MenuItem
                            let:active
                            href="{sort.value === 'new'
                            ? setParam($page.url, 'sort')
                            : setParam($page.url, 'sort', sort.value)}">
                            <div
                                class:active
                                class="flex items-center gap-1.5 px-4 h-10 rounded-lg">
                                <Icon src={sort.icon} mini class="w-4 h-4" />
                                {sort.label}
                            </div>
                        </MenuItem>
                    {/each}
                </MenuItems>
            </div>
        {/if}
    </Menu>
</div>

<style lang="postcss">
    .selected {
        @apply bg-primary-200;
    }

    .active {
        @apply bg-primary-300 text-secondary-200;
    }
</style>