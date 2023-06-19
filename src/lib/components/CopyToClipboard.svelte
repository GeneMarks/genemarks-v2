<script>
    import { page } from '$app/stores';
    import { copy } from 'svelte-copy';
    import { Icon, Link } from 'svelte-hero-icons';
    import { copyToast } from '$lib/toast';
</script>

<button
    use:copy={$page.url.href}
    on:svelte-copy={() => copyToast.success()}
    on:svelte-copy:error={() => copyToast.fail()}
    aria-label="copy link" class="flex gap-1 items-center text-sm px-6 py-2.5 rounded-md bg-primary-300 text-secondary-200 hover:bg-primary-200">
    
    <Icon src="{Link}" mini class="w-4 h-4" />
    <span>Copy link</span>

</button>