import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function UserForm ({
    _id, 
    name: existingName,
    email: existingEmail,
    password: existingPassword,
    basic, premium, pro
}) {
    const [name, setName] = useState(existingName || "");
    const [email, setEmail] = useState(existingEmail || "");
    const [password, setPassword] = useState(existingPassword || "");
    const [pack, setPack] = useState("none");
    const router = useRouter();

    useEffect(() => {
        if (basic) setPack("basic");
        else if (premium) setPack("premium");
        else if (pro) setPack("pro");
    }, [_id]);

    async function saveUser(ev) {
        ev.preventDefault();
        const data = {name, email, password, pack};
        if (_id) 
        {
            axios.put('/api/users', {...data, _id}).then(response => {
                if (response.status === 200) {
                    router.push('/users');
                }
                else if (response.status === 202) {
                    alert(response.data)
                }
            });
        } 
        else 
        {
            axios.post('/api/users', data).then(response => {
                if (response.status === 200) {
                    router.push('/users');
                }
                else if (response.status === 202) {
                    alert(response.data)
                }
            })
        }
    };
    return (
        <form onSubmit={saveUser}>
            <label>Username</label>
            <input 
                type="text"
                placeholder="user name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <label>User Email</label>
            <input
                type="email"
                placeholder="user email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            {existingPassword 
                ? (
                    <input 
                        type="password"
                        placeholder="password"
                        value={password}
                        disabled
                    />
                ) 
                : (
                    <input 
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                )
            }
            
            <select value={pack} onChange={e => setPack(e.target.value)}>
                <option value="none">None</option>
                <option value="basic">Basic Plan</option>
                <option value="premium">Premium Plan</option>
                <option value="pro">Pro Plan</option>
            </select>
            <button
                type="submit"
                className="btn-primary"
                >Save
            </button>
        </form>
    )
}