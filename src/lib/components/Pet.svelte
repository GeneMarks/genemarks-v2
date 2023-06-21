<script>
	import { onMount, tick } from 'svelte';
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';


    const movementSpeed = 0.4; // higher = faster
    const playSpeed = 160; // ms
    const resizeDelay = 600; // ms

    const { origin: hostURL } = $page.url;

    let petData, petImg, petActive;

    let pos = 0, endPos, orientation = 1, offsetWidth, prevWidth;

    let animationId;
    let resizeTimeout;
    
    const fetchPet = async () => {
        const response = await fetch('/api/pet');
        const data = await response.json();

        return data;
    };

    onMount(async () => {
        petData = await fetchPet();
        if (!petData) return;

        petActive = true;
        play(), move();
    });

    const play = () => {
        const { frames } = petData;
        let frameIndex = 0;

        setInterval(() => {
            petImg = `${hostURL}/${frames[frameIndex]}`;
            frameIndex = (frameIndex + 1) % frames.length;
        }, playSpeed);
    };

    const move = async () => {
        await tick();
        calculateEndPos();
        animate();
    };

    const calculateEndPos = () => {
        endPos = offsetWidth - petData.width;
        prevWidth = offsetWidth;
    };

    const animate = () => {
        if (!petActive) return;

        if (pos >= endPos) orientation = -1;
        else if (pos <= 0) orientation = 1;

        pos += orientation * movementSpeed;
        animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
        if (!petData || prevWidth === offsetWidth) return;

        petActive = false;

        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            petActive = true;
            move();
        }, resizeDelay);
    };
</script>

<svelte:window on:resize={handleResize} />

{#if petActive}
    <div
        bind:offsetWidth={offsetWidth}
        in:fade|local={{ duration: 300 }}
        out:fade|local={{ duration: 300 }}
        class="relative pointer-events-none">

        <div
            style="width: {`${petData.width}px`};
                transform: {`scaleX(${orientation})`};
                right: {`${pos}px`};
                position: absolute;
                bottom: 0px;
                z-index: 99;">
            
            <img
                src="{petImg ?? `${hostURL}/${petData.frames[0]}`}"
                alt="{petData.name}" />

        </div>
    </div>
{/if}


