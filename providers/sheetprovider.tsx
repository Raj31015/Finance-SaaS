"use client";
import { NewAccountSheet } from "@/features/accounts/components/newAccountSheet";
import { EditAccountSheet } from "@/features/accounts/components/editAccountSheet";

import { NewCategorySheet } from "@/features/categories/components/newCategorySheet";
import { EditCategorySheet } from "@/features/categories/components/editCategorySheet";
import { useMountedState } from "react-use";
import { NewTransactionSheet } from "@/features/transactions/components/newTransactionSheet";
import { EditTransactionSheet } from "@/features/transactions/components/editTransactionSheet";
export const SheetProvider=()=>{
    const isMounted=useMountedState();
    if(!isMounted){
        return null;
    }
    return(
        <div>
            <NewAccountSheet/>
            <EditAccountSheet/>

            <NewCategorySheet/>
            <EditCategorySheet/>

            <NewTransactionSheet/>
            <EditTransactionSheet/>
            
            </div>
    )
}