/**
 * Heart API Service
 * 
 * Service for fetching problem data from Marc Conrad's UOB Heart API
 * Provides a reusable interface for external API calls
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import axios from 'axios';

/**
 * Fetch data from the external Heart API
 * @async
 * @function getHeartData
 * @param {Object} queryParams - Query parameters to forward to Heart API
 * @returns {Promise<Object>} Heart API response data
 * @throws {Error} If API request fails
 */
export const getHeartData = async (queryParams = {}) => {
    try {
        // 5 second timeout to prevent hanging requests
        const response = await axios.get('https://marcconrad.com/uob/heart/api.php', {
            params: queryParams,
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        throw new Error(`Heart API request failed: ${error.message}`);
    }
};

export default getHeartData;
