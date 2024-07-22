"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenuContent,DropdownMenu,DropdownMenuItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal,Trash } from "lucide-react"
import { useDeleteTransaction } from "@/features/transactions/api/useDeleteTransaction"
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction"
import { useConfirm } from "@/hooks/useConfirm"
type props={
    id:string
}
export const Actions=({id}:props)=>{
    const [ConfirmDialog,confirm]=useConfirm("Are you sure?","You are about to delete this transaction");
    const deleteMutation=useDeleteTransaction(id);
    const {onOpen}=useOpenTransaction();
    const handleDelete=async()=>{
        const ok=await confirm();
        if(ok){
            deleteMutation.mutate();
        }
    }
    return (
        <>
            <ConfirmDialog/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={()=>onOpen(id)}
                        >
                            <Edit className="size-4 mr-2"/>
                            Edit
                        </DropdownMenuItem>
                    <DropdownMenuItem
                    disabled={deleteMutation.isPending}
                    onClick={handleDelete}
                    >
                     <Trash className="size-4 mr-2"/>
                     Delete   
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}