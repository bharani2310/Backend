import uploadSchema from '../../models/portfolio_models/uploadSchema.js'
import skillSchema from '../../models/portfolio_models/skillSchema.js'
import projectSchema from '../../models/portfolio_models/projectSchema.js'

export const uploadImage = async (req, res) => {
    const { name, image } = req.body;

    try {
        // Check if an image with the given name already exists
        const existingImage = await uploadSchema.findOne({ name });

        if (existingImage) {
            // If image with the given name exists, update it
            existingImage.image = image;
            const updatedImage = await existingImage.save();
            return res.status(200).json({
                success: true,
                message: 'The Image is Updated',
                data: updatedImage,
            });
        } else {
            // If image with the given name does not exist, create a new one
            const newImage = new uploadSchema({
                name,
                image,
            });
            const savedImage = await newImage.save();
            return res.status(200).json({
                success: true,
                message: 'The Image is Uploaded',
                data: savedImage,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: err,
        });
    }
};


export const getImage=async(req,res)=>{
    const {name}=req.query
    try {
        const result=await uploadSchema.findOne({name})

        if (!result) {
            return res.status(404).json({
              success: false,
              message: "Image not found",
            });
          }

        res.status(200).json({
            success:true,
            message:"Retrieved Successfully",
            data:result
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Retrieval failed",
            data:error.message
        })
    }

}


export const createSkill = async (req, res) => {
    const {pic,company,role,description,start,end} = req.body;

    console.log(company,role,description,start,end)

    try {
        const newSkill = new skillSchema({
            pic,company,role,description,start,end
        });
        const savedSkill = await newSkill.save();
        return res.status(200).json({
            success: true,
            message: 'The Skill is Uploaded',
            data: savedSkill,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: err,
        });
    }
};


export const createProject = async (req, res) => {
    const {pic,project,description,url} = req.body;

    console.log(pic,project,description,url)

    try {
        const newSkill = new projectSchema({
            pic,project,description,url
        });
        const savedProject = await newSkill.save();
        return res.status(200).json({
            success: true,
            message: 'The Project is Uploaded',
            data: savedProject,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: err,
        });
    }
};


export const getSkill=async(req,res)=>{
    try {
        const result=await skillSchema.find({})
        if (!result) {
            return res.status(404).json({
              success: false,
              message: "Skill not found",
            });
          }

        res.status(200).json({
            success:true,
            message:"Retrieved Successfully",
            data:result
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Retrieval failed",
            data:error.message
        })
    }

}


export const getProject=async(req,res)=>{
    try {
        const result=await projectSchema.find({})

        if (!result) {
            return res.status(404).json({
              success: false,
              message: "Project not found",
            });
          }

        res.status(200).json({
            success:true,
            message:"Retrieved Successfully",
            data:result
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Retrieval failed",
            data:error.message
        })
    }

}



export const updateSkill = async (req, res) => {

    const id=req.params.id
    console.log(id)

    try{
        const updatedTour=await skillSchema.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})

        res.status(200).json({
            success:true,
            message:'Successfully updated',
            data:updatedTour,
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to update',
        });
    }
};

export const updateProject = async (req, res) => {

    const id=req.params.id
    console.log(id)

    try{
        const updatedProject=await projectSchema.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})

        res.status(200).json({
            success:true,
            message:'Successfully updated',
            data:updatedProject,
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to update',
        });
    }
};

export const deleteSkill=async(req,res)=>{
    const id=req.params.id
    try{
        await skillSchema.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:'Successfully deleted',
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to delete',
        });
    }

}

export const deleteProject=async(req,res)=>{
    const id=req.params.id
    try{
        await projectSchema.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:'Successfully deleted',
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to delete',
        });
    }

}