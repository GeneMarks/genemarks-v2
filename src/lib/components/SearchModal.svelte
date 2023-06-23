<script>
    import { searchActive } from '../../stores/search';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import { env } from '$env/dynamic/public';
    import { MeiliSearch } from 'meilisearch';
    import { fly } from 'svelte/transition';
    import { Icon, XMark } from 'svelte-hero-icons';


    const ms = new MeiliSearch({
        host: env.PUBLIC_MEILISEARCH_URL,
        apiKey: env.PUBLIC_MEILISEARCH_API_KEY
    });

    let response;
    let hits = [];
    let hitEls = [];
    let activeHit = 0;

    const search = async (e) => {
        const q = (e.target).value;
        response = await ms.multiSearch({
            queries: [
                {
                    indexUid: 'reviews',
                    q: q,
                    limit: 3,
                    attributesToHighlight: ['excerpt', 'director', 'release_year'],
                    highlightPreTag: '<mark>',
                    highlightPostTag: '</mark>'
                },
                {
                    indexUid: 'articles',
                    q: q,
                    limit: 3,
                    attributesToHighlight: ['excerpt'],
                    highlightPreTag: '<mark>',
                    highlightPostTag: '</mark>'
                }
            ],
        });
        hits = response.results.map(result => result.hits).flat();
        activeHit = 0;
    };


    const goUp = () => {
        activeHit = activeHit <= 0 ? activeHit : activeHit - 1;
    };

    const goDown = () => {
        activeHit = activeHit >= hits.length - 1 ? activeHit : activeHit + 1;
    };

    const handleSearchKeys = (e) => {
        if (e.key === 'ArrowUp') {
            goUp();

            if (activeHit < 2) {
                hitEls[activeHit].scrollIntoView({ behavior: 'smooth' });
            }
        }

        if (e.key === 'ArrowDown') {
            goDown();

            if (activeHit > 2) {
                hitEls[activeHit].scrollIntoView({ behavior: 'smooth' });
            }
        }

        if (e.key === 'Enter') {
            if (hits[activeHit]) {
                const url = hits[activeHit].collectionName === 'reviews'
                ? `/reviews/${hits[activeHit].slug}`
                : `/blog/${hits[activeHit].slug}`;

                goto(url);
                searchActive.set(false);
            }
        }

        if (e.key === 'Escape') {
            searchActive.set(false);
        }
    };

    const handleInputKeys = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }
    };

    let input;
    
    $: if (input) {
        input.focus();
    }

    // Lock body scrolling
    let overflow;
    let paddingRight;

    $: if (browser) {
        const scrollbarWidth = window.innerWidth - document.body.clientWidth;

        if ($searchActive) {
            overflow = document.body.style.overflow;
            paddingRight = document.body.style.paddingRight;

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = overflow;
            document.body.style.paddingRight = paddingRight;
        }
    }
</script>

{#if $searchActive}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        on:keydown={handleSearchKeys}
        on:click|self={() => searchActive.set(false)}
        in:fly|local={{ y: -4, duration: 200 }}
        role="dialog"
        aria-modal="true"
        aria-label="search box"
        class="fixed inset-0 z-[105] flex flex-col items-center px-4 bg-[#0a0a0ae6]">

        <div class="z-[115] flex flex-col fixed inset-0 bg-primary-300 rounded-md drop-shadow-2xl md:relative md:inset-auto md:mt-12 md:px-10 md:pt-10 md:max-w-full md:w-[60rem]">
            <div class="relative">
                <input
                    bind:this={input}
                    on:input={search}
                    on:keydown={handleInputKeys}
                    name="search"
                    type="text"
                    placeholder="Search"
                    maxlength="40"
                    class="w-full pr-20 p-6 text-lg bg-primary-400 border-b-4 border-secondary-200 md:p-3" />
                
                <div class="block absolute top-1/2 -translate-y-1/2 right-5 md:hidden">
                    <button
                        on:click={() => searchActive.set(false)}
                        class="-mt-1 p-1.5 rounded-full bg-primary-300">
                        <Icon src="{XMark}" mini class="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div class="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary-200 md:max-h-[68vh]">
                {#if !hits.length}
                    <p class="mt-4 mb-20 text-center text-sm">
                        No results yet.
                    </p>
                {/if}

                <div class="flex flex-col gap-2 mt-4 last:mb-6 last:md:mb-10">
                    {#each hits as hit, i}
                        <a
                            bind:this={hitEls[i]}
                            on:mouseover={() => (activeHit = i)}
                            on:focus={() => (activeHit = i)}
                            on:click={() => searchActive.set(false)}
                            href="{hit.collectionName === 'reviews'
                            ? `/reviews/${hit.slug}`
                            : `/blog/${hit.slug}`}"
                            class:active={i === activeHit}
                            class="flex mx-4 gap-4 p-6 bg-primary-500 rounded-lg transition-colors duration-150 ease-in-out md:mx-0">
                            <img
                                src="{hit.poster || hit.thumb}"
                                alt="{hit.title}"
                                class="max-h-32 max-w-[6rem] self-start" />
                            <div>
                                <div class="text-lg text-white">
                                    {hit.title}
                                </div>
                                {#if hit.collectionName === 'reviews'}
                                    <div class="flex gap-2 mt-1 text-xs text-primary-100/70">
                                        <span>{@html hit._formatted.director}</span>
                                        <span>{@html hit._formatted.release_year}</span>
                                    </div>
                                {:else}
                                    <span class="mt-1 text-xs text-primary-100/70">
                                        {hit.datetime}
                                    </span>
                                {/if}
                                <p class="mt-3 text-sm line-clamp-2">
                                    {@html hit._formatted.excerpt}
                                </p>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>

            <div class="hidden gap-5 py-4 md:flex">
                <div class="flex items-center gap-2 leading-none">
                    <span class="p-1.5 rounded-md bg-primary-200 text-xs">↩</span>
                    <span class="text-sm">select</span>
                </div>
                <div class="flex items-center gap-2 leading-none">
                    <span class="p-1.5 rounded-md bg-primary-200 text-xs">↑</span>
                    <span class="p-1.5 rounded-md bg-primary-200 text-xs">↓</span>
                    <span class="text-sm">navigate</span>
                </div>
                <div class="flex items-center gap-2 leading-none">
                    <span class="p-1.5 rounded-md bg-primary-200 text-xs">esc</span>
                    <span class="text-sm">close</span>
                </div>
            </div>
        </div>
    </div>
{/if}

<style lang="postcss">
    .active {
        @apply bg-primary-400/80;
    }
</style>