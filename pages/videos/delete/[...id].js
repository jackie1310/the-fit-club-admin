import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteVideoPage() {
    const router = useRouter();
    const [videoInfo, setVideoInfo] = useState();
    const {id} = router.query;

    useEffect(() => {
        axios.get('/api/videos?id=' + id).then(response => (setVideoInfo(response.data)))
    }, [id]);

    function goBack() {
        router.push('/videos');
    }

    async function deleteVideo() {
        await axios.delete('/api/videos?id=' + id);
        goBack();
    }

    return (
        <Layout>
            <h1 className="text-center">Do you really want to delete {videoInfo?.name}?</h1>
            <div className="flex gap-2 justify-center">
                <button 
                    className="btn-red"
                    onClick={deleteVideo}>
                    Yes
                </button>
                <button 
                    className="btn-default"
                    onClick={goBack}>
                    No
                </button>
            </div>
        </Layout>
    )
}