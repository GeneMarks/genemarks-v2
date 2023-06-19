import JSConfetti from 'js-confetti';

export default () => {
    const jsConfetti = new JSConfetti();
    const firstEmojis = ['🎬', '🎥', '🍿', '📼'];
    const secondEmojis = ['😎', '🤩', '💥', '🔥', '💫', '✨', '🚀', '❤️‍🔥'];
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    return jsConfetti.addConfetti({
        emojis: [rand(firstEmojis), rand(secondEmojis)]
    });
};