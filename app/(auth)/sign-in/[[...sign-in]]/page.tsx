import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SignIn,ClerkLoaded,ClerkLoading } from "@clerk/nextjs";
import DemoButton from "@components/DemoButton"
export default function Page() {
  return <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <div className="h-full lg:flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-4 pt-16">
        <h1 className="text-#124 font-bold text-3xl">Welcome Back!</h1>
        <p className="text-base text-zinc-400">Log in or sig up to return to dashboard</p>
      </div>
      <ClerkLoaded>
      <div className="flex items-center justify-center mt-8">
        <SignIn path="/sign-in"/>
        </div>
      </ClerkLoaded>
     <ClerkLoading>
      <div className="animate-spin text-muted-foreground">
        <Loader2/>
      </div>
     </ClerkLoading>
    </div>
    <div className="bg-blue-400 hidden lg:flex flex-col items-center justify-center ">
      <Image src="/logoipsum-299.svg" alt="logo" height={100} width={100}/>
    </div>
    </div>
    ;
}
