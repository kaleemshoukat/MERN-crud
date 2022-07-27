import React, {useEffect, useState} from "react";
import * as actions from '../../actions';
import { useDispatch } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";
import Loader from "../../components/Loader";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Chart=() =>{
    const dispatch = useDispatch()
    const [chartData, setChartData] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        const response=await dispatch(actions.chartUser());
        //console.log(response)

        let labels=[];
        let data=[];
        const chartData=response.data

        chartData.map((item) => {
            labels.push(item.month)
            data.push(item.numberofdocuments)
        })
        // console.log(labels)
        // console.log(data)

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: "Month Names",
                    data: data,
                    backgroundColor: [
                        "#ffbb11",
                        "#ecf0f1",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0"
                    ]
                }
            ]
        });

        setLoading(true)
    }, [])

    if(loading===false) return <Loader/>;
    return(
        <div>
            <Bar data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Number of User In Each Month"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }}
            />
        </div>
    )
}

export default Chart;