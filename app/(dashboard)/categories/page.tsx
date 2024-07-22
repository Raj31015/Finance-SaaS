"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react"
import { columns } from "./columns"
import { DataTable } from "@/components/dataTable"
import { Skeleton } from "@/components/ui/skeleton"
import { useBulkDeleteCategories } from "@/features/categories/api/useBulkDeleteCategory"
import { useNewCategory } from "@/features/categories/hooks/useNewCategory"
import { useGetCategories } from "@/features/categories/api/useGetCategories"


const CategoriesPage=()=>{
    const newCategory=useNewCategory();
    const deleteCategories=useBulkDeleteCategories();
    const CategoryQuery=useGetCategories();
    const isDisabled=CategoryQuery.isLoading || deleteCategories.isPending;
    const accounts=CategoryQuery.data || [];
    if(CategoryQuery.isLoading){
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
                Categories Page
            </CardTitle>
            <Button onClick={newCategory.onOpen} className='sm'>
                <Plus className="size-4 mr-2"/>
                Add new
            </Button>
        </CardHeader>
        <CardContent>
            <DataTable 
            onDelete={(row)=>{
                const ids=row.map((r)=>r.original.id);
                deleteCategories.mutate({ids});
            }}
            disabled={isDisabled}
            filterKey="name" columns={columns} data={accounts}></DataTable>
        </CardContent>
        </Card>
        </div>
    )
}
export default CategoriesPage; 