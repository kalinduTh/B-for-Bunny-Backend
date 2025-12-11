/**
 * DiceBear API Service
 * 
 * Provides functions to generate avatar URLs using the DiceBear API
 * Generates gender-specific avatars with customized styles
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

/**
 * Generate a random seed for unique avatar generation
 * @returns {string} Random alphanumeric seed
 */
const getRandomSeed = () => Math.random().toString(36).substring(2, 10);

/**
 * Generate a male avatar URL using DiceBear API
 * Uses adventurer style with male-specific hair styles and colors
 * @returns {string} DiceBear API URL for male avatar
 */
export const generateMaleAvatar = () => {
    const seed = getRandomSeed();
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundRotation=360&eyes=variant26,variant21,variant10,variant01&features=blush,birthmark,freckles&featuresProbability=0&glasses[]&glassesProbability=0&hair=short14,short11,short10,short07&hairColor=e5d7a3,transparent,0e0e0e&mouth=variant24,variant25,variant26,variant27,variant28,variant29,variant30&skinColor=ecad80,f2d3b1&backgroundColor=b6e3f4,ffdfbf`;
};

/**
 * Generate a female avatar URL using DiceBear API
 * Uses adventurer style with female-specific hair styles and colors
 * @returns {string} DiceBear API URL for female avatar
 */
export const generateFemaleAvatar = () => {
    const seed = getRandomSeed();
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundRotation=360&eyes=variant26,variant21,variant10,variant01&features=blush,birthmark,freckles&featuresProbability=0&glasses[]&glassesProbability=0&hair=long03,long18,long08&hairColor=e5d7a3,transparent,0e0e0e&mouth=variant24,variant25,variant26,variant27,variant28,variant29,variant30&skinColor=ecad80,f2d3b1&backgroundColor=c0aede,ffd5dc,d1d4f9`;
};

/**
 * Generate an avatar URL based on gender
 * @param {string} gender - Gender of the child ('Male' or 'Female')
 * @returns {string} DiceBear API URL for gender-appropriate avatar
 */
export const generateAvatarByGender = (gender) => {
    return gender === 'Male' ? generateMaleAvatar() : generateFemaleAvatar();
};
