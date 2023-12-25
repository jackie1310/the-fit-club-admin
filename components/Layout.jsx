import { signIn, useSession } from "next-auth/react";
import Nav from "./Nav";

export default function Layout({children}) {
    const {data: session} = useSession();
    if (!session) {
        return (
            <div className="bg-bgGray w-screen h-screen flex items-center">
                <div className="text-center w-full">
                    <button onClick={() => signIn('google')} className="bg-blue-200 p-2 px-4 rounded-lg">Login With Google</button>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-bgGray min-h-screen">
            <div className="flex">
                <Nav/>
                <div className="flex-grow p-4 w-3/4">{children}</div>
            </div>
        </div>
    )
}