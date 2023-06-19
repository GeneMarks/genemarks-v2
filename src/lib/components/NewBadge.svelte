<script>
    import { Icon, Sparkles } from 'svelte-hero-icons';
    import tip from '$lib/tippy';
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
    use:tip={{ content: 'New!', theme: 'new' }}
    tabindex="0"
    class="relative w-5 text-yellow-400">
    <Icon src={Sparkles} mini class="w-5 h-5" />
</div>
