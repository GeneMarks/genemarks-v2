<script>
    import { searchActive } from '../../stores/search';
    import { Icon, MagnifyingGlass } from 'svelte-hero-icons';
</script>

<button on:click={() => (searchActive.set(true))} title="Search" class="p-2.5 text-secondary-200 rounded-full bg-primary-300 hover:bg-primary-200 md:p-3">
    <Icon src="{MagnifyingGlass}" mini class="w-6 h-6" />
</button>