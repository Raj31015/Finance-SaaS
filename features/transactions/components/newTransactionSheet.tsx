import { z } from "zod";
import { insertTransactionSchema } from "@/db/schema";
import{Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle } from "@/components/ui/sheet";
import { useNewTransaction } from "../hooks/useNewTransaction";
import { useCreateTransaction } from "@/features/transactions/api/useCreateTransaction";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetCategory } from "@/features/categories/api/useGetCategory";
import { useGetAccount } from "@/features/accounts/api/useGetAccount";
import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccounts";
import { TransactionForm } from "./transactionForm";
import { Loader2 } from "lucide-react";
const formSchema= insertTransactionSchema.omit({
    id:true ,
});

type FormValues=z.input<typeof formSchema>;

export const NewTransactionSheet=()=>{
    const {isOpen,onClose}=useNewTransaction();
    const createMutation =useCreateTransaction();
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

   const isPending=createMutation.isPending || categoryMutation.isPending || accountMutation.isPending;
   const isLoading= categoryQuery.isLoading || accountQuery.isLoading;
    const onSubmit = (values: FormValues) => {
        createMutation.mutate(values, {
          onSuccess: () => {
            onClose();
          },
        });
      };
    
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Transaction
                    </SheetTitle>
                    <SheetDescription>
                        Add a new transaction
                    </SheetDescription>
                </SheetHeader>
                {isLoading?
                    (
                        <div 
                        className="absolute inset-0 flex items-center justify-center"
                        >
                            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                        </div>
                    ):(
                                <TransactionForm
                        onSubmit={onSubmit}
                        disabled={isPending}
                        categoryOptions={categoryOptions}
                        onCreateCategory={onCreateCategory}
                        accountOptions={accountOptions}
                        onCreateAccount={onCreateAccount}
                        />
                    )}
                
            </SheetContent>
        </Sheet>
    )
}