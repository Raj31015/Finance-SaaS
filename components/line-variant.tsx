import { BarChart, CartesianGrid, ResponsiveContainer, XAxis ,Tooltip,Bar, Line} from "recharts";
import {format} from "date-fns"
import { CustomTooltip } from "./custom-tooltip";

type props={
    data:{
        date:string;
        income:number;
        expenses:number;
    }[]
}

export const LineVariant=({data}:props)=>{
    return(
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value)=>format(value,"dd MMM")}
                    style={{fontSize:"12px"}}
                    tickMargin={16}
                    />
                    <Tooltip content={<CustomTooltip/>} />
                    <Line
                        dot={false}
                        dataKey="income"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        className="drop-shadow-sm"
                    />
                    <Line
                        dot={false}
                        dataKey="expenses"
                        stroke="#f43f5e"
                        strokeWidth={2}
                        className="drop-shadow-sm"
                    />
                
            </BarChart>
        </ResponsiveContainer>
    )
}