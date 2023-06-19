<script>
    import Username from '$lib/components/Username.svelte';
    import tip from '$lib/tippy';

    export let data;

    const { avatar, banner, role, status, about } = data?.user;
</script>

<div class="sm:mx-6">
    <div class="p-8 bg-cover bg-center bg-primary-400"
        style={banner
            ? `background-image: url('${banner}'); box-shadow: inset 0 0 0 2000px rgb(12, 12, 12, .85);`
            : ''}>
        <div class="flex gap-1 items-center flex-col md:flex-row md:items-start md:gap-5">
            <img src="{avatar}" alt="gene marks" class="w-32 h-32 rounded-full drop-shadow-sm sm:w-40 sm:h-40" />
            <div class="flex gap-2 items-center flex-col mt-1 md:block md:mt-10">
                <Username userdata={data?.user} />

                <div class="flex gap-2 items-center flex-col md:flex-row md:mt-1.5">
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <span use:tip={{ content: 'Site Role' }} tabindex="0" class="px-2.5 py-1 rounded-full text-xs capitalize role--{role}">{role}</span>
                    
                    {#if status}
                        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                        <span use:tip={{ content: 'Status' }} tabindex="0" class="px-3 py-1.5 rounded-md text-xs text-[#6df777] bg-[#051400] sm:text-sm">{data?.user?.status}</span>
                    {/if}
                </div>
                <p class="p-4 mt-6 rounded-md backdrop-blur-lg text-white md:-ml-4 lg:max-w-[80%]">{about}</p>
                
                <ul class="flex flex-wrap gap-2 justify-center mt-6 text-sm text-secondary-200 md:justify-start">
                    <li><a target="_blank" href="https://www.linkedin.com/in/eugenemarks" class="inline-block px-3 py-1 rounded-full bg-primary-200 hover:text-white">Linkedin</a></li>
                    <li><a target="_blank" href="https://vimeo.com/genemarks" class="inline-block px-3 py-1 rounded-full bg-primary-200 hover:text-white">Vimeo</a></li>
                    <li><a target="_blank" href="https://github.com/GeneMarks" class="inline-block px-3 py-1 rounded-full bg-primary-200 hover:text-white">GitHub</a></li>
                    <li><a href="mailto:gene_marks@outlook.com" class="inline-block px-3 py-1 rounded-full bg-primary-200 hover:text-white">Email</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .role--admin {
        @apply bg-secondary-200 text-primary-600;
    }
</style>