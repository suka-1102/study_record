import styles from './Report.module.scss';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getGraphDatas } from '../../system/graphData';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const Report = () => {
  const {
    graphDatas,
    thisMonthTotalTime,
    totalTime,
    materialTotals
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "3%",
    plugins: {
      legend: {
        position: 'right',
        onClick: null,
        labels: { boxWidth: 12, font: { size: 12 } }
      }
    }
  };

  const getColor = (index, total) => {
    const hue = (360 / total) * index;
    return `hsl(${hue}, 70%, 55%)`;
  };

  const today = new Date();
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];

    return `${month}/${day}\n${weekday}`;

  })

  const doughnutData = {
    labels: materialTotals.map(m => m.name),
    datasets: [
      {
        data: materialTotals.map(m => m.total),
        backgroundColor: materialTotals.map((_, i) =>
          getColor(i, materialTotals.length)
        ),
        borderWidth: 0,
      },
    ],
  };


  const setDatas = []
  let todayTotalTime = 0;

  graphDatas.forEach((d, index) => {
    setDatas.push({
      data: d,
      backgroundColor: getColor(index, graphDatas.length),
    });
    todayTotalTime += d[6]
  })



  const data = {
    labels,
    datasets: setDatas    
  };

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
              <span>{todayTotalTime}時間</span>
            </li>
            <li className={styles.separater}></li>
            <li>
              <p>今月</p>
              <span>{thisMonthTotalTime}時間</span>
            </li>
            <li className={styles.separater}></li>
            <li>
            
              <p>総学習時間</p>
              <span>{totalTime}時間</span>
            </li>
          </ul>
          <div className={styles.chartWrapper}>
            <Bar options={options} data={data}/>
          </div>
          <h2 className={styles.doughnutTitle}>時間配分</h2>
          <div className={styles.doughnutChartWrapper}>
            <Doughnut options={doughnutOptions} data={doughnutData}/>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Report;