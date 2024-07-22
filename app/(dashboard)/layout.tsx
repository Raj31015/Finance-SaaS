import Header from "@/components/Header"

type props={
 children:React.ReactNode;
}

const Dashboard=({children}:props)=>{
    return (
        <>
        <Header/>
    
        <main className="px:3 lg:px-14">
        {children}
        </main>
        </>
    )
}
export default Dashboard