import uploadSchema from '../Model/uploadSchema.js'
import skillSchema from '../Model/skillSchema.js'
import projectSchema from '../Model//projectSchema.js'
import techSchema from '../Model/techSchema.js';
import userSchema from '../Model/userSchema.js';


export const verifyLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userSchema.findOne({ email });


        // If user does not exist
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare passwords (since we are not hashing)
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        return res.status(200).json({ success: true, message: 'Login successful', user });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: 'Failed to login', error });
    }
};



//Profile Image
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


//Skill
export const createSkill = async (req, res) => {
    const {pic,company,role,description,start,end} = req.body;


  
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

export const updateSkill = async (req, res) => {

    const id=req.params.id


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



//Project
export const createProject = async (req, res) => {
    const {pic,project,description,url,overview,features,frontend,backend,database,demo,challenges,deployment} = req.body;


    try {
        const newSkill = new projectSchema({
            pic,project,description,url,overview,features,frontend,backend,database,demo,challenges,deployment
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


export const getSingleProject=async(req,res)=>{
    const id=req.params.id

    try {
        const result=await projectSchema.findOne({ _id: id })

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





export const updateProject = async (req, res) => {

    const id=req.params.id


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


//Technology

export const createTech = async (req, res) => {
    const {pic,tech,category} = req.body;


  
    try {
        const newTech = new techSchema({
            pic,tech,category
        });
        const savedTech = await newTech.save();
        return res.status(200).json({
            success: true,
            message: 'The Tech is Uploaded',
            data: savedTech,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: err,
        });
    }
};

export const getTech=async(req,res)=>{
    try {
        const result=await techSchema.find({})
        if (!result) {
            return res.status(404).json({
              success: false,
              message: "Tech not found",
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

export const updateTech = async (req, res) => {

    const id=req.params.id


    try{
        const updatedTech=await techSchema.findByIdAndUpdate(id,{
            $set:req.body
        },{new:true})

        res.status(200).json({
            success:true,
            message:'Successfully updated',
            data:updatedTech,
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Failed to update',
        });
    }
};



export const deleteTech=async(req,res)=>{
    const id=req.params.id
    try{
        await techSchema.findByIdAndDelete(id);

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
