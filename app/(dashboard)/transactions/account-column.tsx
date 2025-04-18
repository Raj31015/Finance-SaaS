import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";

type props={
   
    account:string,
    accountId:string 
};
 
export const AccountColumn=({
    account,accountId
}:props)=>{
    const {onOpen:onOpenAccount}=useOpenAccount();
    const onClick=()=>{
        onOpenAccount(accountId);
    }
    return(
        <div 
        onClick={onClick}
        className="flex items-center cursor-pointer hover:underline">
            {account}
        </div>
    )
}