import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provide name"]
    },
    email: {
        type: String,
        required: [true, 'provide email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provide password"]
    },
    profile_pic: { 
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

// ✅ Prevent "Cannot overwrite model" error
export default mongoose.model('Chat_User', userSchema, "Chat_User");
