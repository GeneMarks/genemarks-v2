<script>
    import FooterLogo from '$lib/components/FooterLogo.svelte';
</script>

<footer class="mx-6 mt-32">
    <div class="flex flex-col gap-4 items-center pb-14 text-sm">
        <FooterLogo />
        <nav aria-label="footer navigation">
            <ul class="flex justify-center gap-6 flex-wrap">
                <li class="hover:text-secondary-200"><a href="/privacy">Privacy</a></li>
                <li class="hover:text-secondary-200"><a href="/fair-use-disclaimer">Fair Use</a></li>
                <li class="hover:text-secondary-200"><a href="mailto:gene_marks@outlook.com">Contact</a></li>
                <li class="hover:text-secondary-200"><a target="_blank" href="https://github.com/GeneMarks/genemarks-v2">Source</a></li>
            </ul>
        </nav>
        <aside class="text-primary-100/60">Gene Marks &copy; {`${new Date().getFullYear()}`}.</aside>
    </div>
</footer>