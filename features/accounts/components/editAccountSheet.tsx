import { z } from "zod";
import { insertAccountSchema } from "@/db/schema";
import{Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle } from "@/components/ui/sheet";
import { AccountForm } from "@/features/accounts/components/accountForm";
import { useOpenAccount } from "../hooks/useOpenAccount";
import { useGetAccount } from "../api/useGetAccount";
import { useEditAccount } from "../api/useEditAccounts";
import { useDeleteAccount } from "../api/useDeleteAccounts";
import { useConfirm } from "@/hooks/useConfirm";
import { Loader2 } from "lucide-react";
const formSchema= insertAccountSchema.pick({
    name:true ,
});
type FormValues=z.input<typeof formSchema>;

export const EditAccountSheet=()=>{
    const {isOpen,onClose, id}=useOpenAccount();
   const accountQuery=useGetAccount(id);
   const editMutation=useEditAccount(id);
    const deleteMutation=useDeleteAccount(id);
    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
          onSuccess: () => {
            onClose();
          },
        });
      };
      
      const defaultValues=accountQuery.data?{
        name:accountQuery.data.name}:{
            name:"",
        }
        const isPending=editMutation.isPending || deleteMutation.isPending;
        const isLoading=accountQuery.isLoading;
        const [ConfirmDialog,confirm]=useConfirm("Are you sure","You are about to delete an account");
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
                        Edit Account
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing account.
                    </SheetDescription>
                    {isLoading?(
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                        </div>
                    ):(
                        <AccountForm
                        id={id}
                        onSubmit={onSubmit}
                        disabled={isPending}
                        defaultValues={defaultValues}
                        onDelete={onDelete}
                        />
                    )}
                    
                </SheetHeader>
            </SheetContent>
        </Sheet>
        </>
    )
}