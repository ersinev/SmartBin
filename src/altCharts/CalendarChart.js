import { ResponsiveCalendar } from '@nivo/calendar';

const CalendarChart = ({ chartData }) => {
  const transformedData = chartData ? chartData.map(item => ({
    day: item.date,
    value: item.uv
  })) : [];

  const minDate = transformedData.length > 0 ? transformedData.reduce((min, item) => (item.day < min ? item.day : min), transformedData[0].day) : new Date().toISOString().split('T')[0];
  
  const toDate = new Date(minDate);
  toDate.setFullYear(toDate.getFullYear() + 1);
  console.log(transformedData)

  return (
    <ResponsiveCalendar
      data={transformedData}
      from={minDate}
      to={toDate.toISOString().split('T')[0]}
      emptyColor="#eeeeee"
      colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left'
        }
      ]}
    />
  );
}

export default CalendarChart;
