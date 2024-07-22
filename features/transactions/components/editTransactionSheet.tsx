import { z } from "zod";
import { insertTransactionSchema } from "@/db/schema";
import{Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle } from "@/components/ui/sheet";
import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccounts";
import { useConfirm } from "@/hooks/useConfirm";
import { Loader2 } from "lucide-react";
import { useGetTransaction } from "../api/useGetTransaction";
import { useOpenTransaction } from "../hooks/useOpenTransaction";
import { useEditTransaction } from "../api/useEditTransaction";
import { useDeleteTransaction } from "../api/useDeleteTransaction";
import { TransactionForm } from "./transactionForm";
const formSchema= insertTransactionSchema.omit({
    id:true ,
});
type FormValues=z.input<typeof formSchema>;

export const EditTransactionSheet=()=>{
    const {isOpen,onClose, id}=useOpenTransaction();
   const transactionQuery=useGetTransaction(id);
   const editMutation=useEditTransaction(id);
    const deleteMutation=useDeleteTransaction(id);


    const categoryQuery=useGetCategories();
    const categoryMutation=useCreateCategory();
    const onCreateCategory=(name:string)=>categoryMutation.mutate({
        name
    });
   const categoryOptions=(categoryQuery.data ?? []).map((category)=>({
    label:category.name,
    value:category.id
   }))


   const accountQuery=useGetAccounts();
    const accountMutation=useCreateAccount();
    const onCreateAccount=(name:string)=>accountMutation.mutate({
        name
    });
   const accountOptions=(accountQuery.data ?? []).map((account)=>({
    label:account.name,
    value:account.id
   }))
    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
          onSuccess: () => {
            onClose();
          },
        });
      };
      
      const defaultValues=transactionQuery.data?{
        accountId:transactionQuery.data.accountId,
        categoryId:transactionQuery.data.categoryId,
        amount:transactionQuery.data.amount.toString(),
        date:transactionQuery.data.date? new Date(transactionQuery.data.date):new Date(),
        notes:transactionQuery.data.notes,
        payee:transactionQuery.data.payee
    }:{
        accountId:"",
        categoryId:"",
        amount:"",
        date:new Date(),
        notes:"",
        payee:""
    }
        const isPending=editMutation.isPending || deleteMutation.isPending || transactionQuery.isLoading || categoryMutation.isPending || accountMutation.isPending;
        const isLoading=transactionQuery.isLoading|| categoryQuery.isLoading || accountQuery.isLoading;
        const [ConfirmDialog,confirm]=useConfirm("Are you sure","You are about to delete a transaction");
        const onDelete=async()=>{
            const ok=await confirm();
            if(ok){
                deleteMutation.mutate(undefined,{
                    onSuccess: ()=>{
                        onClose();
                    }
                });
            }
        }
    return (
        <>
            <ConfirmDialog/>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                <SheetTitle>
                        Edit Transaction
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing transaction.
                    </SheetDescription>
                    {isLoading?(
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                        </div>
                    ):(
                        <TransactionForm
                        id={id}
                        defaultValues={defaultValues}
                        onSubmit={onSubmit}
                        disabled={isPending}
                        onDelete={onDelete}
                        categoryOptions={categoryOptions}
                        onCreateCategory={onCreateCategory}
                        accountOptions={accountOptions}
                        onCreateAccount={onCreateAccount}
                        />
                    )}
                    
                </SheetHeader>
            </SheetContent>
        </Sheet>
        </>
    )
}