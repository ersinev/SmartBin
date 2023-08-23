import { ResponsiveCalendar } from '@nivo/calendar';

const CalendarChart = ({ chartData }) => {
  const transformedData = chartData ? chartData.map(item => ({
    day: item.date,
    value: item.uv
  })) : [];
  
  const minDate = transformedData.length > 0 ? transformedData.reduce((min, item) => (item.day < min ? item.day : min), transformedData[0].day) : new Date().toISOString().split('T')[0];
  
  const toDate = new Date(minDate);
  toDate.setFullYear(toDate.getFullYear());
  console.log(transformedData)
  return (
    <div style={{ height: '300px' }}>
    <ResponsiveCalendar
      data={transformedData}
      from={minDate}
      to={toDate}
      emptyColor="#eeeeee"
      colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
      
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
    </div>
  );
}

export default CalendarChart;
