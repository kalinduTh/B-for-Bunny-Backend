import axios from 'axios'

export const getHeartData = async (req, res) => {
    try{
        const response = await axios.get('https://marcconrad.com/uob/heart/api.php', {params: req.query, timeout: 5000});
        const heartData = response.data;
        res.status(200).json(heartData);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}