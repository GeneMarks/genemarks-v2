<script>
    export let href = '/';
</script>

<aside class="mt-6">
    <a {href} class="group flex justify-center items-center px-4 py-6 rounded-lg bg-primary-400 hover:text-white hover:bg-primary-600">
        <span class="relative before:absolute before:-bottom-1 before:w-full before:bg-secondary-200 group-hover:before:h-1">
            <slot />
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 rotate-90 ease-out duration-300 group-hover:translate-x-1">
            <path class="fill-current" fill-rule="evenodd" d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"/>
        </svg>
    </a>
</aside>