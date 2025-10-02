import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
    user: {type: String, ref: 'User', required: true },
    content: {type: String },
    media_url: {type: String },
    media_type: {type: String, enum: ['text', 'image', 'video']},
    views_count: [{type: String, ref: 'User'}],
    background_color: { type: String  },
}, {timestamps: true, minimize: false})

const Story = mongoose.model('Story', storySchema)

export default Story;