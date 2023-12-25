const { Schema, model, models, default: mongoose} = require('mongoose');

const videoDataSchema = new Schema ({
    name: String, 
    link: String,
    desc: String,
    category: String
}, {timestamps: true});

const VideoData = models.VideoData || model('VideoData', videoDataSchema);

export default VideoData;