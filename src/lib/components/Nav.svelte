<script>
	import NavLink from '$lib/components/NavLink.svelte';
    import RandomPostButton from '$lib/components/RandomPostButton.svelte';
</script>

<div class="flex h-12 text-sm text-primary-100 bg-primary-300/60 sm:h-14">
    <div class="flex gap-6 justify-center items-center w-default max-w-full mx-auto px-6 md:justify-between">
        <div class="flex overflow-x-auto divide-x divide-primary-200">
            <div class="lg:pr-6">
                <nav aria-label="primary navigation">
                    <ul class="flex items-center gap-6">
                        <li><NavLink href="/" title="Home" /></li>
                        <li><NavLink href="/reviews" title="Reviews" /></li>
                        <li><NavLink href="/blog" title="Blog" /></li>
                        <li><NavLink href="/about" title="About" /></li>
                    </ul>
                </nav>
            </div>

            <div class="hidden pl-6 lg:flex">
                <RandomPostButton />
            </div>

        </div>
        <nav class="hidden md:block" aria-label="socials navigation">
            <ul class="flex gap-4">
                <li>
                    <a target="_blank" href="https://www.linkedin.com/in/eugenemarks" class="flex items-center gap-2 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                            <path class="fill-current" d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"/>
                        </svg>
                        <span>Linkedin</span>
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://vimeo.com/genemarks" class="flex items-center gap-2 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                            <path class="fill-current" d="M476.9 114c-5-23.39-17.51-38.78-40.61-46.27s-64.92-4.5-94.12 16.79c-26.79 19.51-46.26 54.42-54 78.28a4 4 0 005.13 5c10.77-3.8 21.72-7.1 34-6.45 15 .8 24.51 12 24.91 25.29.3 9.79-.2 18.69-3.6 27.68-10.74 28.68-27.61 56.46-47.55 80.75a72.49 72.49 0 01-10 9.89c-10.21 8.29-18.81 6.1-25.41-5.2-5.4-9.29-9-18.88-12.2-29.08-12.4-39.67-16.81-80.84-23.81-121.52-3.3-19.48-7-39.77-18-56.86-11.6-17.79-28.61-24.58-50-22-14.7 1.8-36.91 17.49-47.81 26.39 0 0-56 46.87-81.82 71.35l21.2 27s17.91-12.49 27.51-18.29c5.7-3.39 12.4-4.09 17.2.2 4.51 3.9 9.61 9 12.31 14.1 5.7 10.69 11.2 21.88 14.7 33.37 13.2 44.27 25.51 88.64 37.81 133.22 6.3 22.78 13.9 44.17 28 63.55 19.31 26.59 39.61 32.68 70.92 21.49 25.41-9.09 46.61-26.18 66-43.87 33.11-30.18 59.12-65.36 85.52-101.14 20.41-27.67 37.31-55.67 51.41-86.95C478.5 179.74 484 147.26 476.9 114z"/>
                        </svg>
                        <span>Vimeo</span>
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://github.com/GeneMarks" class="flex items-center gap-2 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 512 512">
                            <path class="fill-current" d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"/>
                        </svg>
                        <span>GitHub</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>