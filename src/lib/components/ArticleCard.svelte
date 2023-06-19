<script>
    import tip from '$lib/tippy';
    import NewBadge from '$lib/components/NewBadge.svelte';

    export let article;
</script>

<article class="group relative flex flex-col gap-6 p-6 rounded-md sm:flex-row md:hover:bg-primary-300 sm:rounded-none sm:p-10 md:p-12 even:bg-primary-400 odd:bg-primary-600">
    <div class="self-center flex-shrink-0 sm:self-auto sm:basis-28 md:basis-32">
        <img
            src="{article.thumb}"
            alt="{article.title}"
            class="min-w-[4rem] max-h-32">
    </div>

    <div class="flex flex-col gap-2">
        <aside class="flex items-center gap-3 flex-wrap w-fit z-10 text-xs sm:text-sm">
            <a
                href="/blog?tag={article.tag}"
                class="relative py-1.5 px-2.5 rounded-md capitalize text-primary-100 bg-primary-300 md:group-hover:bg-primary-200">
                {article.tag}
            </a>
            <div class="flex gap-2 items-center">
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <span
                    use:tip={{ content: article.datetime }}
                    tabindex="0"
                    class="relative">
                    {article.age}
                </span>

                {#if article.daysOld <= 7}
                    <NewBadge />
                {/if}
            </div>
        </aside>

        <div>
            <h2>
                <a
                    href="/blog/{article.slug}"
                    title="{article.title}"
                    class="after:absolute after:inset-0">
                    <span class="relative w-fit text-lg text-white font-semibold before:absolute before:-bottom-1 before:w-full before:bg-secondary-200 sm:text-xl md:text-2xl md:group-hover:before:h-1">
                        {article.title}
                    </span>
                </a>
            </h2>
            <p class="mt-4 text-primary-100/60 line-clamp-2 md:w-2/3">
                {article.excerpt}
            </p>
        </div>
    </div>
</article>