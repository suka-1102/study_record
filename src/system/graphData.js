export const getGraphDatas = () => {

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

  let applyItemArray = []; 
  let thisMonthArray = [];
  const data = localStorage.getItem('materialsData');
  const previousData = data ? JSON.parse(data) : [];
  const dataLength = previousData.length;
  const graphDatas = []
  let thisMonthTotalTime = 0;
  let totalTime = 0;
  previousData.forEach((item, index) => {
    const haveTimeData = item.time
    if (!haveTimeData) return;
    
    haveTimeData.forEach((t, tIndex) => {
      const nums = t.match(/\d+/g).map(Number);
      const date = new Date(nums[0], nums[1] - 1, nums[2], nums[3], nums[4]);
      const ms = date.getTime();
      
      const now = Date.now();
      const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
      const studyTimeHNumber = Number(item.studyTimeH[tIndex]);
      const studyTimeMNumber = Number(item.studyTimeM[tIndex]);
      const MinutesToHour = studyTimeHNumber + (Math.floor((studyTimeMNumber / 60) * 100) / 100 );
      totalTime += MinutesToHour;


      
      if(ms >= oneWeekAgo && ms <= now) {
        applyItemArray.push([index, tIndex])
      }
      if(ms >= startOfMonth && ms <= now) {
        thisMonthArray.push([index, tIndex])
      }
    })
  });
  
  previousData.forEach((data, dataIndex) => {
    graphDatas[dataIndex] = [0,0,0,0,0,0,0]
  })

  applyItemArray.forEach(i => {
    console.log(i)
    const time = previousData[i[0]].time[i[1]]
    const nums = time.match(/\d+/g).map(Number);
    const date = new Date(nums[0], nums[1] - 1, nums[2], nums[3], nums[4]);
    const ms = date.getTime();
    const studyTimeHNumber = Number(previousData[i[0]].studyTimeH[i[1]]);
    const studyTimeMNumber = Number(previousData[i[0]].studyTimeM[i[1]]);

    // studyTimeMをHに変換して一つの時間にする。
    const MinutesToHour = studyTimeHNumber + (Math.floor((studyTimeMNumber / 60) * 100) / 100 );
    
    if (ms >= day0 && ms < day0 + oneDayMs) {
    // i[0]番目のデータ(MinutesToHour)をgraphDatas[i[0]]の6番目に入れる。同じのがあったらプラスしていく
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

  thisMonthArray.forEach(i => {
    const time = previousData[i[0]].time[i[1]]
    const nums = time.match(/\d+/g).map(Number);
    const date = new Date(nums[0], nums[1] - 1, nums[2], nums[3], nums[4]);
    const ms = date.getTime();
    const studyTimeHNumber = Number(previousData[i[0]].studyTimeH[i[1]]);
    const studyTimeMNumber = Number(previousData[i[0]].studyTimeM[i[1]]);

    // studyTimeMをHに変換して一つの時間にする。
    const MinutesToHour = studyTimeHNumber + (Math.floor((studyTimeMNumber / 60) * 100) / 100 );

    thisMonthTotalTime += MinutesToHour

    

  })
  return {
    graphDatas,
    thisMonthTotalTime,
    totalTime
  }
};