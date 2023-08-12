<script>
    import { fly } from 'svelte/transition';
    import Loading from "$lib/components/Loading.svelte";

    export let watchedItems;
    export let watchedLoading;
</script>

<div class="relative flex mx-auto w-fit mb-3">
    <span class="text-xs px-2 py-1.5 bg-green-500/20 rounded-md text-green-400">Live Updates</span>
    <div class="absolute -top-1 -right-1 flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </div>
</div>

{#if watchedLoading}
    <Loading />
{:else}
    <ul in:fly={{ y: -20, duration: 200 }} class="flex flex-col">
        {#each watchedItems as item}
            <li class="flex gap-4 p-5 even:bg-primary-400 odd:bg-primary-600 sm:p-8">
                <div>
                    <img src="{item?.thumb}" alt="{item?.title}" onerror="this.style.display='none'" class="aspect-video object-cover rounded-sm max-w-[6rem] sm:max-w-[12rem]" />
                </div>
                <div>
                    <h3 class="line-clamp-2">{item?.title}</h3>
                    <div class="text-sm text-primary-100/60">
                        {#if item?.series}
                            <p>{item?.series}</p>
                        {/if}
                        <p>Watched on {item?.datetime}</p>
                        <p class="inline-block mt-3 px-2 py-1 text-xs rounded-md bg-primary-300">{item?.plays} Play{item?.plays > 1 ? 's' : ''}</p>
                    </div>
                </div>
            </li>
        {/each}
    </ul>
{/if}