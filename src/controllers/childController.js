import Parent from "../models/parentModel.js";


//get all children of a parent
export const getChildren = async (req, res) => {
    try{
        const {parentId} = req.params;

        const parent = await Parent.findById(parentId);

        if(!parent){
            return res.status(404).json({message: "No parent found"});
        }

        res.status(200).json(parent.children);

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//get a Child by ID
export const getChildById = async (req, res) => {
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

        res.status(200).json(child);

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}


//add a new child to a parent
export const addChild = async (req, res) => {
    try{
        const {parentId} = req.params;
        const childData = req.body;

        const parent = await Parent.findById(parentId);

        if(!parent){
            return res.status(404).json({message: "No parent found"});
        }

        parent.children.push(childData);
        await parent.save();
        res.status(201).json({ message: "Child added successfully", child: parent.children[parent.children.length - 1] });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}