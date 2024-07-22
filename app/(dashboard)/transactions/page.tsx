"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { UploadButton } from "./uploadButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react"
import { columns } from "@/app/(dashboard)/transactions/columns"
import { DataTable } from "@/components/dataTable"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions"
import { useBulkDeleteTransactions } from "@/features/transactions/api/useBulkDeleteTransaction"
import { useNewTransaction } from "@/features/transactions/hooks/useNewTransaction"


enum VARIANTS{
    LIST="LIST",
    IMPORT="IMPORT",

}
const INITIAL_IMPORT_RESULTS={
    data:[],
    errors:[],
    meta:[],
}
const TransactionsPage=()=>{
    const [variant,setVariant]=useState<VARIANTS>(VARIANTS.LIST)
    const newTransaction=useNewTransaction();
    const deleteTransactions=useBulkDeleteTransactions();
    const transactionsQuery=useGetTransactions();
    const isDisabled=transactionsQuery.isLoading || deleteTransactions.isPending;
    const transactions=transactionsQuery.data || [];
    if(transactionsQuery.isLoading){
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
    if(variant===VARIANTS.IMPORT){
        return(
            <>
            <div>
                This is for import
            </div>
            </>
        )
    }
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
                Transaction History
            </CardTitle>
            <div className="flex items-center gap-x-2">
            <Button onClick={newTransaction.onOpen} className='sm'>
                <Plus className="size-4 mr-2"/>
                Add new
            </Button>
           
            <UploadButton onUpload={()=>{}}/>
            </div>
           
        </CardHeader>
        <CardContent>
            <DataTable 
            onDelete={(row)=>{
                const ids=row.map((r)=>r.original.id);
                deleteTransactions.mutate({ids});
            }}
            disabled={isDisabled}
            filterKey="payee" columns={columns} data={transactions}></DataTable>
        </CardContent>
        </Card>
        </div>
    )
}
export default TransactionsPage; 