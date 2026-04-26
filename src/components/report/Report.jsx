import styles from './Report.module.scss';
import { Bar } from "react-chartjs-2";


import React from "react";
// import { createElement } from "react";
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
  const options = {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: {
      legend: { position: "top" }
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

  const data1 = [12, 11, 14, 52, 14, 32, 36];
  const data2 = [22, 31, 17, 32, 24, 62, 66];

  const data = {
    labels,
    datasets: [
      {
        data: data1,
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        data: data2,
        backgroundColor: "rgba(146, 31, 56, 0.5)"
      },

    ]
  };
  return <Bar options={options} data={data} />;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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