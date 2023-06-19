<script>
    import Logo from '$lib/components/Logo.svelte';
    import SearchButton from '$lib/components/SearchButton.svelte';
</script>

<div class="flex justify-between items-center mx-auto px-6 max-w-default h-[4.5rem] sm:h-[5rem] md:h-[6rem]">
    <div class="hidden w-[48px] sm:block"></div>

    <Logo />
    
    <SearchButton />
</div>