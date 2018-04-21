import React, {Component} from 'react';
import {PieChart, Pie, Cell} from 'recharts';

class SentimentPieChart extends Component {
    constructor(props){
        super(props);

        this.colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
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
                    outerRadius={200}
                    fill= "#8884d8"
                >
                    {this.data.map((entry, index) => <Cell key={index} fill={this.colors[index % this.colors.length]} />)}
                </Pie>
            </PieChart>
        )
    }
}

export default SentimentPieChart;