<script>
    import { fly } from 'svelte/transition';

    export let update;
    export let avatar;
</script>

<li in:fly={{ y: -20, duration: 200 }} class="flex gap-4 [&:not(:first-child)]:mt-10">
    <img src="{avatar}" alt="profile" class="w-10 h-10 rounded-full" />
    <div class="flex flex-col gap-2">
        <span class="px-6 py-4 rounded-b-xl rounded-tr-xl bg-primary-400">{update?.text}</span>
        <span class="text-xs">{update?.datetime}</span>
    </div>
</li>