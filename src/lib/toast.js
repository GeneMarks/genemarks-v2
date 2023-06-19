import toast from 'svelte-french-toast';


const options = {
    style: 'background-color: #27272a; color: #fff;',
    position: 'top-right',
};

export const copyToast = {
    success: () => { toast.success('Copied!', options) },
    fail: () => { toast.error('Copy failed :(', options) }
};

export const likeToast = {
    success: () => {
        toast('Liked!', {
            ...options,
            icon: '👍'
        })
    },
    fail: () => { toast.error('Like failed :(', options) }
};

export const randomToast = {
    success: () => {
        toast('Shuffled!', {
            ...options,
            icon: '♻️'
        })
    },
    fail: () => { toast.error('Shuffle failed :(', options) }
};