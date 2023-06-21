<script>
    import tip from '$lib/tippy';
    import NewBadge from '$lib/components/NewBadge.svelte';
    import LikeButton from '$lib/components/LikeButton.svelte';
    import CopyToClipboard from '$lib/components/CopyToClipboard.svelte';
    import '../../../../styles/markdown.postcss';
    
    export let data;


    $: ({
        id,
        collectionName,
        title,
        tag,
        thumb,
        thumb_width,
        thumb_height,
        body,
        excerpt,
        datetime,
        age,
        isNew,
        likes, } = data?.article );

    $: likeData = {
        id,
        collectionName,
        likes
    };
</script>

<svelte:head>
    <title>{title} • Blog • Gene Marks</title>
    <meta name="description" content="{excerpt}" />
</svelte:head>

<div class="mx-6 mt-8">
    <article class="mx-auto max-w-[46rem]">
        <img
            src="{thumb}"
            alt="{title}"
            width={thumb_width}
            height={thumb_height}
            class="mx-auto max-h-80 object-cover" />

        <div class="mt-12">
            <div class="flex gap-x-4 gap-y-1 flex-wrap items-center mb-4 text-sm sm:text-base">
                <a href="{`/blog?tag=${tag}`}" class="py-1 px-3 rounded-md capitalize text-primary-100 bg-primary-300 hover:bg-primary-200">
                    {tag}
                </a>

                <div class="flex gap-2 items-center">
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <span
                        use:tip={{ content: datetime }}
                        tabindex="0">
                        {age}
                    </span>

                    {#if isNew}
                        <NewBadge />
                    {/if}
                </div>
            </div>

            <h1 class="text-3xl leading-normal text-white font-bold md:text-4xl md:leading-normal">
                {title}
            </h1>
        </div>

        <div class="markdown">
            {@html body}
        </div>

        <aside class="flex items-center flex-wrap justify-center gap-3 mt-14">
            <LikeButton {likeData} />
            <CopyToClipboard />
        </aside>
    </article>
</div>