<script>
    import { Icon, Heart } from 'svelte-hero-icons';
    import tip from '$lib/tippy';
    import confetti from '$lib/confetti';
    import { likeToast } from '$lib/toast';

    export let likeData;


    $: ({ likes } = likeData);

    let liked;
    let liking;
    $: {
        if (likeData) {
            liked = false;
            liking = false
        }
    }

    const format = (num) => {
        // lol you never know
        return num > 999
            ? `${(num / 1000).toFixed(3).slice(0, -2).replace('.0', '')}k`
            : num;
    };

    const handleLike = async () => {
        liking = true;

        const response = await fetch('/api/actions/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(likeData)
        });

        if (response.ok) {
            liked = true;
            likes++;
            likeToast.success();
            confetti();
        } else {
            liking = false;
            likeToast.fail();
        }
    }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<button
    on:click={handleLike}
    use:tip={{ content: `${likes.toLocaleString()} Like${likes !== 1 ? 's' : ''}` }}
    disabled={liked||liking}
    class="flex gap-1 items-center text-sm px-6 py-2.5 rounded-md
    {liked ? 'bg-green-800 text-green-400' : 'bg-primary-300 text-green-500 hover:bg-primary-200'}">

    <Icon src="{Heart}" mini class="w-4 h-4" />
    <span>{format(likes) ?? '0'}</span>
</button>