<script>
    import {
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels
    } from '@rgossiaux/svelte-headlessui';
    import InfiniteLoading from 'svelte-infinite-loading';
    import Loading from '$lib/components/Loading.svelte';
    import UserCard from '$lib/components/UserCard.svelte';
    import UserUpdate from '$lib/components/UserUpdate.svelte';
    import WatchedItems from '$lib/components/WatchedItems.svelte';

    export let data;


    const { avatar } = data?.user;

    // Updates
    let updates = [];
    let updatesPage = 1;
    let listenUpdates = true;

    const fetchUpdates = async ({ detail: { loaded, complete } }) => {
        const response = await fetch(`/api/about/updates?page=${updatesPage}`);
        const data = await response.json();

        updatesPage += 1;
        updates = [...updates, ...data.items];

        if ((data.page + 1) <= data.totalPages) {
            loaded();
        } else {
            complete();
            listenUpdates = false;
        }
    }

    // Watching
    let watchedItems = '';
    let watchedLoading = true;
    const fetchWatchedItems = async () => {
        const response = await fetch('/api/about/jellyfin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        watchedItems = await response.json();
        watchedLoading = false;
    }
</script>

<svelte:head>
    <title>About • Gene Marks</title>
    <meta name="description" content="About Gene Marks, admin of genemarks.net" />
</svelte:head>

<UserCard {data} />

<TabGroup class="mt-6 min-h-full">
    <div class="flex justify-center">
        <TabList class="flex rounded-md bg-primary-400 md:text-base">
            <Tab class="{({selected}) => selected ? 'flex items-center px-8 h-10 rounded-l-md text-sm bg-primary-300' : 'flex items-center px-8 h-10 rounded-l-md text-sm hover:text-white'}">Updates</Tab>
            <Tab on:focus|once={fetchWatchedItems} class="{({selected}) => selected ? 'flex items-center px-8 h-10 rounded-r-md text-sm bg-primary-300' : 'flex items-center px-8 h-10 rounded-r-md text-sm hover:text-white'}">Watching</Tab>
        </TabList>
    </div>
    <TabPanels class="mt-10 mx-6 min-h-[50vh]">
        <TabPanel class="user-updates">
            <ul>
                {#each updates as update}
                    <UserUpdate {update} {avatar} />
                {/each}
            </ul>

            {#if listenUpdates}
                <InfiniteLoading on:infinite={fetchUpdates}>
                    <Loading slot="spinner" />
                </InfiniteLoading>
            {:else}
                <div class="mt-10">End of updates :)</div>
            {/if}
        </TabPanel>
        <TabPanel>
            <WatchedItems {watchedItems} {watchedLoading} />
        </TabPanel>
    </TabPanels>
</TabGroup>