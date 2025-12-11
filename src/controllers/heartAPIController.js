/**
 * Heart API Controller
 * 
 * Controller for proxying external Heart API requests
 * Fetches problem data from Marc Conrad's UOB Heart API
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import getHeartData from '../services/heartAPI.js';

/**
 * Fetch data from the external Heart API
 * Acts as a proxy to avoid CORS issues and add timeout protection
 * @async
 * @function getHeartDataController
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters to forward to Heart API
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with Heart API data or error
 */
export const getHeartDataController = async (req, res) => {
    try {
        const heartData = await getHeartData(req.query);
        res.status(200).json(heartData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Export with original name for backward compatibility
export { getHeartDataController as getHeartData };