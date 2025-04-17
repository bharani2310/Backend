import Gallery from "../Model/Gallery.js";

// export const galleryImages = async (req, res) => {
//     try {
//         const { genre } = req.params;
//         console.log("Genre:", req.params);
        
//         const gImages = await Gallery.find({ genre });
//         console.log('Retrieved images:', gImages);
        
//         res.status(200).json({ success: true, message: "Retrieved Successfully", data: gImages });
//     } catch (error) {
//         console.error('Error fetching images:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

export const getSingleGalleryImages=async(req,res)=>{
    const id=req.params.id;
    try{
        const tour=await Gallery.findById(id);

        res.status(200).json({
            success:true,
            message:'Success',
            data:tour,
        });
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:'Not Found getSingleGalleryImages',
        });
    }

}

export const GalleryImages = async (req, res) => {
    const { genre } = req.query;
    // console.log(genre)
    try {
        const gImages = await Gallery.find({ genre });
        const count = gImages.length; // Count of retrieved images
        if (count === 0) {
            return res.status(404).json({ success: false, message: 'No images found for the specified genre' });
        }
        return res.status(200).json({ success: true, message: 'Retrieved Successfully', count, data: gImages });
    } catch (error) {
        // console.error('Error fetching images:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};





export const postgalleryImages=async(req,res)=>{
    const newImage = new Gallery(req.body)
    try {
        const savedImage = await newImage.save()
        res.status(200).json({success:true,message:'The Image is Uploaded',data:savedImage})
    } catch (err) {
        res.status(500).json({success:false,message:'internal server error',data:err})
    }
}

export const putgalleryImages=async(req,res)=>{
    const id=req.params.id
    try{
        const updatedTour=await Gallery.findByIdAndUpdate(id,{
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
}

export const getGalleryCount = async(req,res)=>{
    try {
        const galleryCount=await Gallery.countDocuments()
        res.status(200).json({success:true,data:galleryCount})
    } catch (error) {
        res.status(500).json({success:false,message:'Failed to fetch'})
    }
}

export const getAllGallery=async(req,res)=>{

    const page = parseInt(req.query.page);
    // console.log("page:",page);


    try{
        const gallery=await Gallery.find({}).skip(page*8).limit(8);

        res.status(200).json({
            success:true,
            count:gallery.length,
            message:'Success',
            data:gallery
        });
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:'Not Found getAllGallery',
        });
    }
}

export const deleteGallery=async(req,res)=>{
    const id=req.params.id
    try{
        // console.log("id:",id);
        await Gallery.findByIdAndDelete(id);

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