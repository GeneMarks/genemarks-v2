<script>
    import { fly } from 'svelte/transition';
    import { Icon, ArrowSmallUp } from 'svelte-hero-icons';

    export let showOnPx = 400;

    let active = false;

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleOnScroll = () => {
        if (document.documentElement.scrollTop > showOnPx) {
            active = true;
        } else {
            active = false;
        }
    }
</script>

<svelte:window on:scroll={handleOnScroll} />

{#if active}
    <button on:click={goTop} transition:fly="{{ y: 20, duration: 150 }}" class="fixed bottom-4 right-4 p-2 rounded-full bg-primary-300/60 hover:text-secondary-200 xl:bg-primary-300 xl:bottom-5 xl:right-5">
        <Icon src="{ArrowSmallUp}" mini class="w-5 h-5 xl:w-6 xl:h-6" />
    </button>
{/if}
