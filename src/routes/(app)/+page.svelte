<script>
    import SectionHeader from '$lib/components/SectionHeader.svelte';
    import SwiperRow from '$lib/components/SwiperRow.svelte';
    import SwiperFeatured from '$lib/components/SwiperFeatured.svelte'
    import SectionFooter from '$lib/components/SectionFooter.svelte';
    import ArticleCard from '$lib/components/ArticleCard.svelte';
    import { register } from 'swiper/element/bundle';

    export let data;


    const { items: featuredReviews } = data?.featuredReviews;
    const { items: latestReviews }   = data?.latestReviews;
    const { items: likedReviews }    = data?.likedReviews;
    const { items: latestArticles }  = data?.latestArticles;

    register(); // Register swiper elements
</script>

<!-- Featured Reviews -->
{#if featuredReviews.length >= 3}
    <div class="mx-auto max-w-default">
        <div class="md:mx-6">
            <SwiperFeatured reviews={featuredReviews} name="featured-reviews" />
        </div>
    </div>
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
    <div class="mx-6">
        <SectionHeader href="/blog" class="mt-14">Latest Articles</SectionHeader>

        <div class="mt-6 flex flex-col gap-6">
            {#each latestArticles as article}
                <ArticleCard {article} />
            {/each}
        </div>

        <SectionFooter href="/blog">See more articles</SectionFooter>
    </div>
</section>