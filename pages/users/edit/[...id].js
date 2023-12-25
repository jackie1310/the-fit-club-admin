import Layout from "@/components/Layout";
import UserForm from "@/components/UserForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditUserPage() {
    const [userInfo, setUserInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('/api/users?id=' + id).then(response => {
            if (response.status === 200) {
                setUserInfo(response.data);
            }
            else if (response.status === 202) {
                alert(response.data);
            }
        })
    }, [id]);

    return (
        <Layout>
            <h1>Edit User</h1>
            {userInfo && (
                <UserForm {...userInfo}/>
            )}
        </Layout>
    )
}