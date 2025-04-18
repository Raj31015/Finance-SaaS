"use client"
import { useGetSummary } from "@/features/summary/api/useGetSummary"
import {Chart} from "./chart"
import { SpendingPie } from "./spending-pie";
export const DataCharts=()=>{
    const {data}=useGetSummary();
    console.log(data);
    return(
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <Chart data={data?.days}/>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                <SpendingPie data={data?.categories}/>
            </div>

        </div>
    )
}
