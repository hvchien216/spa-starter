import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui';
import LineChartCard from './line-chart-card';
import StatisticsCapacityCard from './statistics-capacity-card';
import NationalTargetCard from './national-target-card';

type Props = {};

const PhotovoltaicTarget = (_props: Props) => {
  // TODO: wire up the data with react-query

  const MOCK_STATISTICS_CAPACITY_DATA = [
    {
      label: 'This Year’s Capacity',
      chartData: [
        { date: '2024-04-01', desktop: 222, mobile: 0 },
        { date: '2024-04-02', desktop: 97, mobile: 180 },
        { date: '2024-04-03', desktop: 167, mobile: 120 },
        { date: '2024-04-04', desktop: 242, mobile: 260 },
        { date: '2024-04-05', desktop: 373, mobile: 290 },
        { date: '2024-04-06', desktop: 301, mobile: 340 },
        { date: '2024-04-07', desktop: 245, mobile: 180 },
        { date: '2024-04-08', desktop: 409, mobile: 320 },
        { date: '2024-04-09', desktop: 59, mobile: 110 },
        { date: '2024-04-10', desktop: 261, mobile: 190 },
        { date: '2024-04-11', desktop: 327, mobile: 350 },
        { date: '2024-04-12', desktop: 292, mobile: 210 },
      ],
      currentData: 230,
      dataPercentage: 10,
      isUp: true,
    },
    {
      label: 'Date Range’s Capacity',
      chartData: [
        { date: '2024-04-01', desktop: 222, mobile: 0 },
        { date: '2024-04-02', desktop: 97, mobile: 180 },
        { date: '2024-04-03', desktop: 167, mobile: 120 },
        { date: '2024-04-04', desktop: 242, mobile: 260 },
        { date: '2024-04-05', desktop: 373, mobile: 290 },
        { date: '2024-04-06', desktop: 301, mobile: 340 },
        { date: '2024-04-07', desktop: 245, mobile: 180 },
        { date: '2024-04-08', desktop: 409, mobile: 320 },
        { date: '2024-04-09', desktop: 59, mobile: 110 },
        { date: '2024-04-10', desktop: 261, mobile: 190 },
        { date: '2024-04-11', desktop: 327, mobile: 350 },
        { date: '2024-04-12', desktop: 292, mobile: 210 },
      ],
      currentData: 230,
      // dataPercentage: 10,
      // isUp: false,
    },
  ];

  return (
    <Card className='flex flex-col border-0 shadow-der'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg'>Photovoltaic Target</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 space-y-6'>
        <div className='grid gap-2 md:grid-cols-2'>
          <NationalTargetCard
            chartData={MOCK_STATISTICS_CAPACITY_DATA[0].chartData}
            dataPrimary={0.74}
            dataSecondary={0.23}
          />
          <div className='grid gap-2 md:grid-cols-2'>
            {MOCK_STATISTICS_CAPACITY_DATA.map((item) => (
              <StatisticsCapacityCard
                key={item.label}
                chartData={item.chartData}
                currentData={item.currentData}
                dataPercentage={item.dataPercentage}
                isUp={item.isUp}
              />
            ))}
          </div>
        </div>
        <LineChartCard />
      </CardContent>
    </Card>
  );
};

export default PhotovoltaicTarget;
