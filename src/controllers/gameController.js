import Parent from "../models/parentModel.js";

//get the current game session
export const getCurrentGameSession = async (req, res) => {
    try{
        const {parentId, childId} = req.params;
        const parent = await Parent.findById(parentId);
        if(!parent){
            return res.status(404).json({message: "No parent found"});
        }
        const child = parent.children.id(childId);
        if(!child){
            return res.status(404).json({message: "No child found"});
        }
        const currentGameSession = child.game;

        if(!currentGameSession.isActive){
            return res.status(404).json({message: "No active game session found"});
        }

        res.status(200).json(currentGameSession);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//start a new game session
export const createGameSession = async (req, res) => {
    try{
        const {parentId, childId} = req.params;

        let msg = "";            
        const parent = await Parent.findById(parentId);
        if(!parent){
            return res.status(404).json({message: "No parent found"});
        }
        const child = parent.children.id(childId);
        if(!child){
            return res.status(404).json({message: "No child found"});
        }
        if(child.game.isActive){
            if(child.highScore >= child.game.score){
                child.game.isActive = false;
            } else{
                child.highScore = child.game.score;
                child.game.isActive = false;
            }
            msg = "Current game session ended successfully & ";
        }

        child.game.gameLevel = 0;
        child.game.score = 0;
        child.game.startedAt = new Date();
        child.game.isActive = true;
        child.game.lastUpdated = new Date();
        await parent.save();
        res.status(201).json({message: msg+"Game session started successfully"});

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//end game session
export const endGameSession = async (req, res) => {
    try{
        const {parentId, childId} = req.params;
        const parent = await Parent.findById(parentId);
        if(!parent){
            return res.status(404).json({message: "No parent found"});
        }
        const child = parent.children.id(childId);
        if(!child){
            return res.status(404).json({message: "No child found"});
        }
        if(!child.game.isActive){
            return res.status(400).json({message: "No active game session found"});
        }

        if(child.highScore < child.game.score){
            child.highScore = child.game.score;
        }

        child.game.isActive = false;
        child.game.lastUpdated = new Date();
        await parent.save();
        res.status(200).json({message: "Game session ended successfully"});

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//update current game
export const updateCurrentGame = async (req, res) => {
    try{
        const {parentId, childId} = req.params;
        const gameUpdateData = req.body;

        const parent = await Parent.findById(parentId);
        if(!parent){
            return res.status(404).json({message: "No parent found"});
        }
        const child = parent.children.id(childId);
        if(!child){
            return res.status(404).json({message: "No child found"});
        }
        if(!child.game.isActive){
            return res.status(400).json({message: "No active game session found"});
        }

        Object.assign(child.game, gameUpdateData);
        child.game.lastUpdated = new Date();

        await parent.save();
        res.status(200).json({message: "Game session updated successfully"});

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}