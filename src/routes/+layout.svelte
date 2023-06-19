<script>
    import { navigating, page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
    import NavHeader from '$lib/components/NavHeader.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import SearchModal from '$lib/components/SearchModal.svelte';
    import ScrollToTop from '$lib/components/ScrollToTop.svelte';
    import { Toaster } from 'svelte-french-toast';
    import NProgress from 'nprogress';
    import '../styles/app.postcss';
    import '../styles/nprogress.postcss';

    NProgress.configure({
        minimum: 0.18,
        showSpinner: false,
    });

    $: {
        if ($navigating && ($navigating.to.url.pathname !== $page.url.pathname)) {
            NProgress.start();
        }

        if (!$navigating) {
            NProgress.done();
        }
    };
</script>

<header>
    <Nav />
    <NavHeader />
</header>

<main class="mx-auto max-w-default">
    <slot />
    <Footer />
</main>

<ScrollToTop />
<SearchModal />
<Toaster />