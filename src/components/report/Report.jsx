import styles from './Report.module.scss';
import { Bar } from "react-chartjs-2";
import { getGraphDatas } from '../../system/graphData';

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ChartBar = () => {
  const {
    graphDatas
  } = getGraphDatas()
  const options = {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  const today = new Date();
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekday = weekdays[date.getDay()];

    return `${month}/${day}\n${weekday}`;

  })
  const backgroundColors = [
    "rgba(0, 4, 255, 0.5)",
    "rgb(210, 255, 46)",
    "rgb(38, 255, 31)",
    "rgb(255, 43, 43)",
    "rgb(153, 102, 255)",
    "rgb(255, 207, 86)",
    "rgb(75, 192, 192)",
    "rgb(255, 168, 81)",
    "rgb(199, 199, 199)",
    "rgb(83, 103, 255)",
  ];

  const setDatas = []

  graphDatas.forEach((d, index) => {
    setDatas.push({
      data: d,
      backgroundColor: backgroundColors[index],
    });
  })

  console.log(setDatas)

  const data = {
    labels,
    datasets: setDatas    
  };
  return <Bar options={options} data={data} />;
};

const Report = () => {
  return (
    <div className={styles.report}>
      <h1>記録</h1>
      <div className={styles.border}></div>
      <ul className={styles.contents}>
        <li className={styles.learningProcess}>
          <h2>学習推移</h2>
          <ul className={styles.recordAllTimes}>
            <li>
              <p>今日</p>
              <span></span>
            </li>
            <div className={styles.separater}></div>
            <li>
              <p>今月</p>
              <span></span>
            </li>
            <div className={styles.separater}></div>
            <li>
            
              <p>総学習時間</p>
              <span></span>
            </li>
          </ul>
          <ChartBar></ChartBar>
        </li>
      </ul>
    </div>
  );
};

export default Report;