<script>
    import SectionHeader from '$lib/components/SectionHeader.svelte';
    import SwiperRow from '$lib/components/SwiperRow.svelte';
    import SwiperFeatured from '$lib/components/SwiperFeatured.svelte'
    import SectionFooter from '$lib/components/SectionFooter.svelte';
    import { register } from 'swiper/element/bundle';

    export let data;

    const { items: featuredReviews } = data?.featuredReviews;
    const { items: latestReviews } = data?.latestReviews;
    const { items: likedReviews } = data?.likedReviews;

    register(); // Register swiper elements
</script>

<!-- Featured Reviews -->
{#if featuredReviews.length >= 3}
    <section class="mx-auto max-w-default">
        <div class="md:mx-6">
            <SwiperFeatured reviews={featuredReviews} name="featured-reviews" />
        </div>
    </section>
{/if}

<!-- Reviews -->
<section class="mx-auto max-w-default">
    <div class="lg:mx-6">
        <SectionHeader href="/reviews" class="mt-8 md:mt-14" swiper>Latest Reviews</SectionHeader>
        <SwiperRow reviews={latestReviews} name="latest-reviews" />

        <SectionHeader href="/reviews?sort=likes" class="mt-14" swiper>Most Likes</SectionHeader>
        <SwiperRow reviews={likedReviews} name="liked-reviews" />
    </div>
    <div class="mx-6">
        <SectionFooter href="/reviews">See more reviews</SectionFooter>
    </div>
</section>

<!-- Blog Articles -->
<section class="mx-auto max-w-default">
    <!-- <div class="mx-6">
        <? snippet('default/default/divider', ['title' => 'Latest Articles', 'url' => page('blog')->url(), 'class' => ' mt-14',]) ?>
        <div class="mt-6 flex flex-col gap-6">
            <?php foreach($articles as $article): ?>
            <? snippet('blog/blog/article', ['article' => $article]) ?>
            <?php endforeach ?>
        </div>
        <? snippet('default/default/view-more', ['url' => page('blog'), 'title' => 'See more articles']) ?>
    </div> -->
</section>