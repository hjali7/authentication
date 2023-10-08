'use client'

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')

    const router = useRouter()
    
    const handleSubmit = async e => {
        e.preventDefault()

        if(!name || !email || !password) {
            setError('Please fill all the fields')
            return
        }

        try {
            const responseUserExist = await fetch('api/userExist',{
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({email})
            })

            const {user} = await responseUserExist.json()
            if(user) {
                setError('user already exsit')
                return
            }

            const UserNameExist = await fetch('api/nameExist', {
                method : "POST" ,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ name })
            })

            const {username} = await UserNameExist.json()
            if(username) {
                setError("Username Already Exist")
                return
            }

            const response = await fetch('api/register' , {
                method : "POST" , 
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({name , email , password})
            })
            if(response.ok) {
                const form = e.target
                setName('')
                setEmail('')
                setPassword('')
                setError('')
                form.reset()
                router.push('/')
            }else {
                alert('somthing went wrong')
            }
        } catch (error) {
            console.log(`Error during procces:${error}`);
        }
    }
    
    return (
        <div className="grid place-items-center h-screen">
            <div className="flex flex-col item-start gap-6 border-2 shadow-xl border-teal-600 p-6">
                <h1 className='text-2xl font-bold'>Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 p-6">
                    <input onChange={e => setName(e.target.value)} type="text" placeholder="FullName" className="text-black p-3 rounded-2 border-2 " />
                    <input onChange={e => setEmail(e.target.value)} type="Email" placeholder="Email" className="text-black p-3 rounded-2 border-2 "/>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="text-black p-3 rounded-2 border-2 "/>
                    <button type="submit" className="text-white w-full bg-teal-600 p-2 rounded-md">Register</button>
                    {error && (<div className="bg-red-500 text-white rounded-md text-left p-1">{error}</div>)}
                    <p className="text-sm text-right">Already have an account?<Link href='/' className="underline">Login</Link></p>
                </form>
            </div>
        </div>
    )
}