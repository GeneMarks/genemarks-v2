import { Sparkles, Clock, Heart } from 'svelte-hero-icons';

export const typeOptions = [
    {
        value: 'all',
        label: 'All'
    },
    {
        value: 'movie',
        label: 'Movies'
    },
    {
        value: 'tv',
        label: 'TV'
    },
];

export const sortOptions = [
    {
        value: 'new',
        label: 'New',
        icon: Sparkles
    },
    {
        value: 'old',
        label: 'Old',
        icon: Clock
    },
    {
        value: 'likes',
        label: 'Likes',
        icon: Heart
    },
];