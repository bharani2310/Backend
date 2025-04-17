import Booking from '../Model/Booking.js'

// create new booking
export const createBooking = async(req,res)=>{
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({success:true,message:'Your tour is booked',data:savedBooking})
    } catch (err) {
        res.status(500).json({success:false,message:'internal server error'})
    }
}


// Get single booking
export const getBooking = async(req,res)=>{
    const id = req.params.id

    try {
        const book = await Booking.find({ userId: id })
        // console.log('NUMBER OF BOOKING ',book)
        res.status(200).json({success:true,message:'Success',data:book})
    } catch (err) {
        res.status(404).json({success:false,message:'not found'})
    }
}

// Get All booking
export const getAllBooking = async(req,res)=>{

    try {
        const books = await Booking.find()
        res.status(200).json({success:true,message:'Success',data:books})
    } catch (err) {
        res.status(500).json({success:false,message:'Internal server error'})
    }
}

//delete booking
export const handleCancel=async(req,res)=>{
    const id=req.params.id
    try{
        await Booking.findByIdAndDelete(id);

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

//update booking
export const handleUpdate = async(req,res)=>{
    const { id } = req.params;
    const updates = req.body;
    // console.log(updates)
    try {
        const booking = await Booking.findByIdAndUpdate(id, updates, { new: true });
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, message: 'Booking updated successfully', data: booking });
    } catch (error) {
        // console.error('Error updating booking:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//get booking count
export const getBookingsCount = async(req,res)=>{
    try {
        const count = await Booking.countDocuments();
        res.json({ count });
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch Booking count' });
      }
}


  