<script>
    export let currentTag;
    export let usedTags;
</script>

<ul class="flex flex-wrap gap-1.5 text-sm capitalize">
    <li>
        <a
            href="/blog"
            class="block py-1.5 px-2.5 rounded-md bg-primary-300 hover:bg-primary-200"
            class:active={!currentTag}>
            All Posts
        </a>
    </li>

    {#each usedTags as tag}
        <li>
            <a
                href="/blog?tag={tag}"
                class="block py-1.5 px-2.5 rounded-md text-primary-100 bg-primary-300 hover:bg-primary-200"
                class:active={currentTag === tag}>
                {tag}
            </a>
        </li>
    {/each}
</ul>

<style lang="postcss">
    .active {
        @apply text-secondary-100;
    }
</style>