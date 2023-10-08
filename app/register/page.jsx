import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../api/auth/[...nextauth]/route";
import RegisterForm from "@/components/RegisterForm";


export default async  function Register () {
    const session = await getServerSession(authOption)
    if(session) return redirect('/dashboard')
    return (
        <RegisterForm />
    )
}