import { mongooseConnect } from "@/lib/mongoose";
import VideoData from "@/models/VideoData";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    let alert = "Something went wrong";
    await isAdminRequest(req, res);

    if (method === 'GET') {
        if (req.query?.id) {
            try {
                res.status(200).json(await VideoData.findOne({_id:req.query.id}));
            } catch (error) {
                console.log(error);
                res.status(202).json(alert);
            }
        } else {
            try {
                res.status(200).json(await VideoData.find());
            } catch(error) {
                console.log(error);
                res.status(202).json(alert)
            }
        }
    }

    if (method === 'POST') {
        try {
            const {name, video, desc, category} = req.body;
            const videoDataDoc = VideoData.create({
                name, link: video, desc, category
            });
            res.status(200).json(videoDataDoc);
        } catch(error) {
            console.log(error);
            res.status(202).json(alert);
        }
    }

    if (method === 'PUT') {
        try {
            const {name,video, desc, category, _id} = req.body;
            await VideoData.updateOne({_id}, {name, link: video, desc, category});
            res.status(200).json("Success!");
        } catch(error) {
            console.log(error);
            res.status(202).json(alert);
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            try {
                await VideoData.deleteOne({_id: req.query?.id})
                res.status(200).json('Deleted!');
            } catch(error) {
                console.log(error);
                res.status(202).json(alert);
            }
        } 
    }
}