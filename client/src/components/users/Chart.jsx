import React, {useEffect, useState} from "react";
import * as actions from '../../actions';
import { useDispatch } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";

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

    const userCreate = useSelector(state => state.user);
    console.log("chart",userCreate)

    useEffect(async () => {
        const res=await dispatch(actions.chartUser());
        // console.log(res)
        const response=res.payload;

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

        setLoading(true);

    }, [userCreate.status])

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