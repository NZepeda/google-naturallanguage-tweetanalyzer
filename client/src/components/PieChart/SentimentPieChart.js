import React, {Component} from 'react';
import {PieChart, Pie, Cell, Label} from 'recharts';

class SentimentPieChart extends Component {
    constructor(props){
        super(props);

        this.colors = ['#4CAF50', '#B71C1C', '#FFBB28', '#757575'];
        this.data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
        {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
    }

    render(){
        return (
            <PieChart width={1000} height={700}>
                <Pie
                    dataKey="value"
                    data={this.data}
                    labelLine = {false}
                    label={renderCustomizedLabel}
                    outerRadius={200}
                    fill= "#8884d8"
                >
                    {this.data.map((entry, index) => <Cell key={index} fill={this.colors[index % this.colors.length]} />)}
                </Pie>
            </PieChart>
        )
    }
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    console.log(index)
    return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
    </text>
    );
};

export default SentimentPieChart;