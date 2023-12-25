const { Schema, model, models, default: mongoose} = require('mongoose');

const videoSchema = new Schema ({
    user: {type: mongoose.Types.ObjectId, ref: "Video"},
    videos: [String]
}, {
    timestamps: true
})

const Video = models.Video || model("Video", videoSchema);

export default Video;