import Tour from "../Model/Tour.js"
import Review from '../Model/Review.js'

export const createReview = async(req,res)=>{
    const id = req.params.id
    const newReview = new Review({...req.body})
    try {
        const savedReview = await newReview.save()
        console.log("Review ",savedReview)
        // after creating a new review now update the reviews array of the tour
        await Tour.findByIdAndUpdate(id,{
            $push: {reviews: savedReview._id}
        })
        res.status(200).json({success:true,message:'Review Submitted',data:savedReview})
    } catch (error) {
        res.status(200).json({success:false,message:'Review not Submitted',error})
        
    }
}

//get review count
export const getReviewCount = async(req,res)=>{
    try {
        const count = await Review.countDocuments();
        res.json({ count });
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch Review count' });
      }
}