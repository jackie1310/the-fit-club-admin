import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinners from "./Spinners";

export default function VideoForm ({
    _id, 
    name: existingName,
    link: existingLink,
    desc: existingDesc,
    category: existingCategory
}) {
    const [name, setName] = useState(existingName || "");
    const [video, setVideo] = useState();
    const [desc, setDesc] = useState(existingDesc || "");
    const [category, setCategory] = useState(existingCategory || "");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleFileChange(e) {
        const files = e.target?.files;
        if (files.length > 0) {
            setIsLoading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data)
            setVideo(res.data.links[0]);
            setIsLoading(false);
        }
    };

    async function saveVideo (ev) {
        ev.preventDefault();
        const data = {name, video, desc, category};
        if (_id) {
            axios.put('/api/videos', {...data, _id}).then(response => {
                if (response.status === 200) {
                    router.push('/videos');
                }
                else if (response.status === 202) {
                    alert(response.data);
                }
            })
        }
        else {
            axios.post('/api/videos', data).then(response => {
                if (response.status === 200) {
                    router.push('/videos');
                }
                else if (response.status === 202) {
                    alert(response.data)
                }
            })
        }
    };

    return (
        <form onSubmit={saveVideo}>
            <label>Video Name</label>
            <input 
                type="text"
                placeholder="video name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            {isLoading && (
                <div className="h-24 flex items-center">
                    <Spinners/>
                </div>
            )}
            <label>Video file</label>
            <input 
                type="file"
                onChange={handleFileChange}
            />
            <label>Description</label>
            <input
                type="text"
                placeholder="description"
                value={desc}
                onChange={e => setDesc(e.target.value)}
            />
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value>No category</option>
                <option value="upper body">Upper Body</option>
                <option value="lower body">Lower Body</option>
                <option value="abs">Abs</option>
                <option value="cardio">Cardio</option>
            </select>
            <button
                type="submit"
                className="btn-primary"
                >Save
            </button>
        </form>
    )
}