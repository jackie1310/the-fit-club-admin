import Layout from "@/components/Layout";
import VideoForm from "@/components/VideoForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditVideoPage() {
    const [videoInfo, setVideoInfo] = useState(null);
    const router  = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (!id) {
           return; 
        }
        axios.get('/api/videos?id=' + id).then(response => {
            if (response.status === 200) {
                setVideoInfo(response.data);
            }
            else if (response.status === 202) {
                alert(response.data);
            }
        })
    }, [id]);
    console.log(videoInfo);

    return (
        <Layout>
            <h1>Edit Video</h1>
            {videoInfo && (
                <VideoForm {...videoInfo} />
            )}
        </Layout>
    )
}