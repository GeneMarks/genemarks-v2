<script>
	import { page } from '$app/stores';

    export let href;
    export let title;
</script>

<a {href} class:active={$page.url.pathname === href} class="hover:text-white">{title}</a>

<style lang="postcss">
    a.active {
        @apply text-secondary-200;
    }
</style>