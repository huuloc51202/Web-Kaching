import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { convertDataChart } from '../../utils';

const PiechartComponeent = (props) => {
    const data = convertDataChart(props.data);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Tính tổng để tính phần trăm
    const total = data.reduce((acc, entry) => acc + entry.value, 0);

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
        
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(2)}%`} {/* Hiện phần trăm */}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Tooltip 
                    formatter={(value, name) => {
                        return [`${name}: ${value} sold`]; // Hiển thị tên sản phẩm và số lượng
                    }}
                />
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel} // Hiện phần trăm trên phần của biểu đồ
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PiechartComponeent;
