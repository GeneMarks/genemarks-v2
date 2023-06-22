<script>
    import { page } from '$app/stores';

    export let href;
    export let title;


    $: active = href === '/' && $page.url.pathname === '/'
        || $page.url.pathname.includes(href) && href !== '/';
</script>

<a
    {href}
    class:active
    class="hover:text-white">{title}</a>

<style lang="postcss">
    a.active {
        @apply text-secondary-200;
    }
</style>