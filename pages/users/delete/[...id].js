import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteUserPage() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState();
    const {id} = router.query;
    function goBack() {
        router.push('/users');
    }
    useEffect(() => {
        axios.get('/api/users?id=' + id).then(response => setUserInfo(response.data));
    }, [id]);
    async function deleteUser() {
        await axios.delete('/api/users?id=' + id);
        goBack();
    }

    return (
        <Layout>
            <h1 className="text-center">Do you really want to delete {userInfo?.name}?</h1>
            <div className="flex gap-2 justify-center">
                <button 
                    className="btn-red"
                    onClick={deleteUser}>
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