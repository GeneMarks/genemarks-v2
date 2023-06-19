<script>
    import { page } from '$app/stores';
	import { goto } from '$app/navigation';
    import { randomToast } from '$lib/toast';


    const fetchRandURL = async () => {
        const response = await fetch('/api/actions/random-post');

        if (response.ok) {
            const data = await response.json();

            if (data.url === $page.url.pathname) {
                await fetchRandURL();
            } else {
                goto(data.url);
                randomToast.success();
            }
        } else {
            randomToast.fail();
        }
    };
</script>

<button
    on:click={fetchRandURL}
    class="flex items-center gap-1.5 flex-shrink-0 hover:text-white">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 512 512">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M400 304l48 48-48 48M400 112l48 48-48 48M64 352h85.19a80 80 0 0066.56-35.62L256 256"/>
        <path d="M64 160h85.19a80 80 0 0166.56 35.62l80.5 120.76A80 80 0 00362.81 352H416M416 160h-53.19a80 80 0 00-66.56 35.62L288 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
    </svg>
    <span>Random Post</span>
</button>