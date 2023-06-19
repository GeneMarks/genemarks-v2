<script>
    import { Icon, ChevronRight } from 'svelte-hero-icons';

    export let href = '/reviews';
    export let swiper = false;
    export { classNames as class };


    let classNames = '';
</script>

<div
    class="flex flex-col gap-2 border-primary-600 md:flex-row
    {classNames}
    {swiper ? 'mx-6 lg:mx-0' : ''}">
    <a {href}>
        <h1 class="relative w-fit text-xl text-white font-semibold before:absolute before:-bottom-1 before:w-full before:h-1 before:bg-secondary-200 sm:text-2xl">
            <slot />    
        </h1>
    </a>
    <aside class="flex flex-1 items-end md:justify-end">
        <a
            {href}
            class="flex items-center text-sm hover:text-secondary-200
            {swiper ? 'md:hidden 2xl:flex' : ''}">
            <span class="font-medium">View all</span>
            <Icon src="{ChevronRight}" mini class="w-6 h-6" />
        </a>
    </aside>
</div>