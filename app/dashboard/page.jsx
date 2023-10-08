'use client'

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default  function Dashboard () {
    const {data:Session} = useSession()
    return (
        <div className="grid place-items-center h-screen">
            <div className="flex flex-col items-start shadow-xl rounded-md gap-6 p-6 border-2 border-teal-500">
                <div className="flex flex-col">
                    <p>Name : <span>{Session?.user?.name}</span></p>
                    <p>Email : <span>{Session?.user?.email}</span></p>
                </div>
                <button onClick={() => signOut()} className="bg-red-400 w-full text-white rounded-md p-2 ">Log out</button>
            </div>
        </div>
    )
}