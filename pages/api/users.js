import { decode } from "@/helpers/decode";
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/Users";
import Video from "@/models/Videos";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req, res);
    const alert = "Something went wrong";

    if (method === 'GET') {
        if (req.query?.id) {
            try {
                res.status(200).json(await User.findOne({_id:req.query.id}));
            } catch(error) {
                console.log(error);
                res.status(202).json(alert)
            }
        } else {
            try {
                res.status(200).json(await User.find());
            } catch(error) {
                console.log(error);
                res.status(202).json(alert)
            }
        }    
    }

    if (method === 'POST') {
        try {
            const {name, email, password, pack} = req.body;
            const decodePass = decode(password);
            const userDoc = await User.create({
                name, email, password: decodePass, 
                basic: pack === "basic" ? true : false,
                premium: pack === "premium" ? true : false,
                pro: pack === "pro" ? true : false,
            })
            await Video.create({user: userDoc._id, videos: []})
            res.status(200).json(userDoc);
        } catch(error) {
            console.log(error);
            res.status(202).json(alert);
        }
    }

    if (method === "PUT") {
        try {
            const {name, email, password, pack, _id} = req.body;
            await User.updateOne({_id}, {name, email, password, 
                basic: pack === "basic" ? true : false,
                premium: pack === "premium" ? true : false,
                pro: pack === "pro" ? true : false,
            })
            res.status(200).json("Success!");
        }
        catch(error) {
            console.log(error);
            res.status(202).json(alert);
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            try {
                await User.deleteOne({_id: req.query?.id});
                await Video.deleteOne({user: req.query?.id});
                res.status(200).json("Updated!");
            } catch (error) {
                console.log(error);
                res.status(202).json(alert);
            }
        }
    }
}