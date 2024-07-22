"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount"
import { Loader2, Plus } from "lucide-react"
import { columns } from "./columns"
import { DataTable } from "@/components/dataTable"
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts"
import { Skeleton } from "@/components/ui/skeleton"
import { useBulkDeleteAccounts } from "@/features/accounts/api/useBulkDelete"


const AccountsPage=()=>{
    const newAccount=useNewAccount();
    const deleteAccounts=useBulkDeleteAccounts();
    const accountsQuery=useGetAccounts();
    const isDisabled=accountsQuery.isLoading || deleteAccounts.isPending;
    const accounts=accountsQuery.data || [];
    if(accountsQuery.isLoading){
        return(
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-58"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin"/>
                        </div>
                    </CardContent>
                </Card> 
            </div>
        )
    }
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
                Accounts Page
            </CardTitle>
            <Button onClick={newAccount.onOpen} className='sm'>
                <Plus className="size-4 mr-2"/>
                Add new
            </Button>
        </CardHeader>
        <CardContent>
            <DataTable 
            onDelete={(row)=>{
                const ids=row.map((r)=>r.original.id);
                deleteAccounts.mutate({ids});
            }}
            disabled={isDisabled}
            filterKey="name" columns={columns} data={accounts}></DataTable>
        </CardContent>
        </Card>
        </div>
    )
}
export default AccountsPage; 