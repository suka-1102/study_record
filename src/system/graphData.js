const minutesToHour = (hours, minutes) => {
  const hoursNumber = Number(hours);
  const minutesNumber = Number(minutes);
  return hoursNumber + (Math.floor((minutesNumber / 60) * 100) / 100 );
};

const buildGraphData = (previousData, applyItemArray) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayStart = today.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000
  const day0 = dayStart;
  const day1 = day0 - oneDayMs;
  const day2 = day0 - 2 * oneDayMs;
  const day3 = day0 - 3 * oneDayMs;
  const day4 = day0 - 4 * oneDayMs;
  const day5 = day0 - 5 * oneDayMs;
  const day6 = day0 - 6 * oneDayMs;

  const graphDatas = []
  previousData.forEach((data, dataIndex) => {
    graphDatas[dataIndex] = [0,0,0,0,0,0,0]
  })

  applyItemArray.forEach(i => {
    const time = previousData[i[0]].records.date[i[1]]
    const ms = new Date(time).getTime();
    const MinutesToHour = minutesToHour(
      previousData[i[0]].records.hours[i[1]],
      previousData[i[0]].records.minutes[i[1]]
    );

    if (ms >= day0 && ms < day0 + oneDayMs) {
      graphDatas[i[0]][6] += MinutesToHour;
    } else if (ms >= day1 && ms < day0) {
      graphDatas[i[0]][5] += MinutesToHour;
    } else if (ms >= day2 && ms < day1) {
      graphDatas[i[0]][4] += MinutesToHour;
    } else if (ms >= day3 && ms < day2) {
      graphDatas[i[0]][3] += MinutesToHour;
    } else if (ms >= day4 && ms < day3) {
      graphDatas[i[0]][2] += MinutesToHour;
    } else if (ms >= day5 && ms < day4) {
      graphDatas[i[0]][1] += MinutesToHour;
    } else if (ms >= day6 && ms < day5) {
      graphDatas[i[0]][0] += MinutesToHour;
    }
  })

  return graphDatas;
};

const calcThisMonthTotal = (previousData, thisMonthArray) => {
  let thisMonthTotalTime = 0;

  thisMonthArray.forEach(i => {
    const time = previousData[i[0]].records.date[i[1]]
    const ms = new Date(time).getTime();
    const MinutesToHour = minutesToHour(
      previousData[i[0]].records.hours[i[1]],
      previousData[i[0]].records.minutes[i[1]]
    );
    
    thisMonthTotalTime += MinutesToHour

  })

  return thisMonthTotalTime;
};

const calcTotalByMaterial = (previousData) => {
  return previousData.filter(item => item.records?.hours).map(item => {
      let total = 0;
      item.records.hours.forEach((h, idx) => {
        total += minutesToHour(h, item.records.minutes[idx]);
      });
      return { name: item.name, total };
    }).filter(item => item.total > 0);
};


export const getGraphDatas = () => {

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let applyItemArray = [];
  let thisMonthArray = [];
  const data = localStorage.getItem('materialsData');
  const previousData = data ? JSON.parse(data) : [];
  let totalTime = 0;
  previousData.forEach((item, index) => {
    const haveTimeData = item.records?.date
    if (!haveTimeData) return;

    haveTimeData.forEach((t, tIndex) => {
      const ms = new Date(t).getTime();
      const now = Date.now();
      const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
      const MinutesToHour = minutesToHour(
        item.records.hours[tIndex],
        item.records.minutes[tIndex]
      );
      totalTime += MinutesToHour;

      if(ms >= oneWeekAgo && ms <= now) {
        applyItemArray.push([index, tIndex])
      }
      if(ms >= startOfMonth && ms <= now) {
        thisMonthArray.push([index, tIndex])
      }
    })
  });

  const graphDatas = buildGraphData(previousData, applyItemArray);
  const thisMonthTotalTime = calcThisMonthTotal(previousData, thisMonthArray);
  const materialTotals = calcTotalByMaterial(previousData);

  return {
    graphDatas,
    thisMonthTotalTime,
    totalTime,
    materialTotals
  }
};