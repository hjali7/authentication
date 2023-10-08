'use client'
import Link from "next/link";
import { useState } from "react";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";


export default  function LoginForm () {
    const router = useRouter()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')
    
    const handleSubmit = async e => {
        e.preventDefault()
        if(!email || !password) {
            setError('please fill the field')
            return
        }
        try {
            const response = await signIn('credentials',{
                email , 
                password,
                redirect : false,
            })
            if(response.error) {
                setError('check your email or password')
                return
            }

            router.replace('dashboard')
            
        } catch (error) {
            alert('sometime went wrong ... please try again')
        }

    }

    return (
        <div className="grid place-items-center h-screen ">
            <div className="flex flex-col gap-6 border-2 p-10 rounded-md border-teal-400 shadow-xl">
                <h1 className="font-bold text-2xl">Enter the details</h1>
                <form className="flex flex-col  items-start gap-4 " onSubmit={handleSubmit}>
                    <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"  className="border-2 p-3"/>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="border-2 p-3" />
                    <button type="submit" className="text-white bg-teal-600 text-center w-full mt-4 p-2 rounded-md cursor-pointer">Login</button>
                    {error && (<div className="bg-red-500 text-white w-fit text-xs py-1 px-3 rounded-md mt-2">{error}</div>)}
                    <p className="text-right text-sm">Don't have an account?<Link href='/register' className="underline">Register</Link></p>
                </form>
            </div>
        </div>
    )
}