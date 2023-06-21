import { json } from '@sveltejs/kit';
import pets from '$lib/server/pets.json';
import probe from 'probe-image-size';


const birthday = '12/09';
const typeOdds = {
    'normal': 80,
    'seasonal': 20
};
const rarityOdds = {
    'common': 54,
    'rare': 26,
    'epic': 14,
    'legendary': 5.6,
    'mythic': 0.4,
};

const roulette = (options) => { // Options must add up to 100
    const randNum = Math.random() * 100;
    let sum = 0;

    const chosen = Object.keys(options).find(key => {
        sum += options[key];
        return randNum <= sum;
    });

    return chosen;
};

const randPet = (key, val) => {
    const filteredPets = pets.filter(item => item[key] === val);
    const rand = Math.floor(Math.random() * filteredPets.length);
        
    return filteredPets[rand];
};

const getMaxWidth = async (frames, url) => {
    const widths = await Promise.all(
        frames.map(frame => probe(`${url.host}/images/pets${frame}`))
    );

    return Math.max(...widths.map(meta => meta.width));
};


export const GET = async ({ url }) => {
    
    const getPet = async () => {
        const date = new Date();
        const formattedDate = date.toLocaleString('en-US', { month: '2-digit', day: '2-digit' });
        const season = date.toLocaleString('en-US', { month: 'long' }).toLowerCase();
        const birthdayDate = new Date(birthday).toLocaleString('en-US', { month: '2-digit', day: '2-digit' });
        
        const chosenRarity = roulette(rarityOdds);
        const seasonalPets = pets.filter(item => item.season === season);

        let pet;

        if (formattedDate === birthdayDate) {
            pet = randPet('season', 'birthday');
        } else if (seasonalPets.length > 0) {
            const petType = roulette(typeOdds);
            const randKey = petType === 'normal' ? 'rarity' : 'season';
            const randVal = petType === 'normal' ? chosenRarity : season;

            pet = randPet(randKey, randVal);
        } else {
            pet = randPet('rarity', chosenRarity);
        }


        return {
            ...pet,
            frames: pet.frames.map(frame => `/images/pets${frame}`),
            width: await getMaxWidth(pet.frames, url)
        };
    };

    const response = await getPet();
    return json(response);
};
