<script>
    import { page } from '$app/stores';
    import { setParam } from '$lib/utils';
    import { typeOptions, sortOptions } from '$lib/review-options';
    import { Icon, Cog6Tooth } from 'svelte-hero-icons';
    import {
        Popover,
        PopoverButton,
        PopoverPanel,
    } from '@rgossiaux/svelte-headlessui';
    import { offset, flip, shift } from 'svelte-floating-ui/dom';
    import { createFloatingActions } from 'svelte-floating-ui';
    import { fade } from 'svelte/transition';

    export let currentParams;


    $: ({ currentType, currentSort } = currentParams);
    
    
    const [ floatingRef, floatingContent ] = createFloatingActions({
        strategy: "absolute",
        placement: "bottom-end",
        middleware: [
            offset({
                mainAxis: 12,
                crossAxis: 10,
            }),
            flip(),
            shift(),
        ]
    });
</script>

<Popover let:open class="z-50 md:hidden">
    <PopoverButton
        use={[floatingRef]}
        class="p-2.5 rounded-full hover:bg-primary-200
        {open
        ? 'bg-primary-200 outline outline-2 outline-offset-2 outline-primary-300'
        : 'bg-primary-300'}">
        <Icon src="{Cog6Tooth}" mini class="w-4 h-4" />
    </PopoverButton>

    {#if open}
        <div transition:fade={{ duration: 100 }}>
            <PopoverPanel
                static
                use={[floatingContent]}
                class="flex p-2 leading-none text-sm rounded-lg bg-primary-200 drop-shadow-lg divide-x divide-primary-300/60">
        
                <ul class="flex flex-col pr-2">
                    {#each typeOptions as type}
                        <li>
                            <a
                                href="{type.value === 'all'
                                ? setParam($page.url, 'type')
                                : setParam($page.url, 'type', type.value)}"
                                class:selected="{currentType === type.value}"
                                class="flex items-center px-4 h-10 rounded-lg">
                                {type.label}
                            </a>
                        </li>
                    {/each}
                </ul>

                <ul class="flex flex-col pl-2">
                    {#each sortOptions as sort}
                        <li>
                            <a
                                href="{sort.value === 'new'
                                ? setParam($page.url, 'sort')
                                : setParam($page.url, 'sort', sort.value)}"
                                class:selected="{currentSort === sort.value}"
                                class="flex items-center gap-1.5 px-4 h-10 rounded-lg">
                                <Icon src={sort.icon} mini class="w-4 h-4" />
                                {sort.label}
                            </a>
                        </li>
                    {/each}
                </ul>
            </PopoverPanel>
        </div>
   {/if}
</Popover>


<style lang="postcss">
    .selected {
        @apply bg-primary-300 text-secondary-200;
    }
</style>