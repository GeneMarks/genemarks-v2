<script>
    import tip from '$lib/tippy';

    export let userdata;

    const {
        username,
        username_color,
        username_is_verified,
        username_has_sparkles,
        username_has_glow
    } = userdata;
</script>

<div class="name inline-flex gap-[.1em] leading-[1em] text-3xl font-semibold
    {username_color}
    {username_has_sparkles ? 'sparkles' : ''}
    {username_has_glow ? 'glow' : ''}
    {username_is_verified ? 'verified' : ''}">
    
    <span>{username}</span>

    {#if username_is_verified}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <svg use:tip={{ content: 'Verified User', theme: 'rainbow' }} tabindex="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-[1em] verified">
            <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
    {/if}
</div>

<style lang="postcss">
    .name {
        --color-name-blue: #77c0ff;
        --color-name-blue-glow: #377eff;
        --color-name-green: #89ff58;
        --color-name-green-glow: #1bff00;
        --color-name-orange: #ff972c;
        --color-name-orange-glow: #ff6b15;
        --color-name-purple: #a599ff;
        --color-name-purple-glow: #8d25ff;
        --color-name-red: #ff4141;
        --color-name-red-glow: #ff0a0a;
        --color-name-white: #fff;
        --color-name-white-glow: #fff;
        --color-name-yellow: #ffdd34;
        --color-name-yellow-glow: #ffbc00;
    }

    .blue {
        color: var(--color-name-blue);

        &.glow {
            text-shadow: 0 0 .4rem var(--color-name-blue-glow);
        }

        &.sparkles {
            background-image: url(/images/sparkles/sparkle_blue.webp);
        }

        & .verified {
            filter: drop-shadow(0 0 .3rem var(--color-name-blue-glow));
        }
    }

    .green {
        color: var(--color-name-green);

        &.glow {
            text-shadow: 0 0 .3rem var(--color-name-green-glow);
        }

        &.sparkles {
            background-image: url(/images/sparkles/sparkle_green.webp);
        }

        & .verified {
            filter: drop-shadow(0 0 .3rem var(--color-name-green-glow));
        }
    }

    .orange {
        color: var(--color-name-orange);

        &.glow {
            text-shadow: 0 0 .3rem var(--color-name-orange-glow);
        }

        &.sparkles {
            background-image: url(/images/sparkles/sparkle_orange.webp);
        }

        & .verified {
            filter: drop-shadow(0 0 .3rem var(--color-name-orange-glow));
        }
    }

    .purple {
        color: var(--color-name-purple);

        &.glow {
            text-shadow: 0 0 .3rem var(--color-name-purple-glow);
        }

        &.sparkles {
            background-image: url(/images/sparkles/sparkle_purple.webp);
        }

        & .verified {
            filter: drop-shadow(0 0 .3rem var(--color-name-purple-glow));
        }
    }

    .red {
        color: var(--color-name-red);

        &.glow {
            text-shadow: 0 0 .3rem var(--color-name-red-glow);
        }

        &.sparkles {
            background-image: url(/images/sparkles/sparkle_red.webp);
        }

        & .verified {
            filter: drop-shadow(0 0 .3rem var(--color-name-red-glow));
        }
    }

    .white {
        color: var(--color-name-white);

        &.glow {
            text-shadow: 0 0 .3rem var(--color-name-white-glow);
        }

        &.sparkles {
            background-image: url(/images/sparkles/sparkle_white.webp);
        }

        & .verified {
            filter: drop-shadow(0 0 .3rem var(--color-name-white-glow));
        }
    }

    .yellow {
        color: var(--color-name-yellow);

        &.glow {
            text-shadow: 0 0 .3rem var(--color-name-yellow-glow);
        }

        &.sparkles {
            background-image: url(/images/sparkles/sparkle_yellow.webp);
        }

        & .verified {
            filter: drop-shadow(0 0 .3rem var(--color-name-yellow-glow));
        }
    }
</style>