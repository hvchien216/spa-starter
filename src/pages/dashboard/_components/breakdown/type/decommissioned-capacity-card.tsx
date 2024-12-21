import { ChartConfig } from '~/components/ui';
import BarChartCard from './bar-chart-card';

const CHART_CONFIG = {
  pv: {
    label: 'PV',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

type Props = {};

function generateChartData() {
  const baseData = [
    { substationName: 'West', pv: 186 },
    { substationName: 'Lor', pv: 286 },
  ];

  const chartData: any[] = [];
  for (let i = 1; i <= 5; i++) {
    const baseIndex = i % 2; // Alternate between the two base records
    const newRecord: any = {
      substationName: `${baseData[baseIndex].substationName} ${i}`,
      pv: baseData[baseIndex].pv + Math.floor(Math.random() * 50 - 25),
    };
    chartData.push(newRecord);
  }
  return chartData;
}
const chartData = generateChartData();

const DecommissionedCapacity = (_props: Props) => {
  return <BarChartCard chartData={chartData} chartConfig={CHART_CONFIG} title='Decommissioned Capacity' unit='kWac' />;
};

export default DecommissionedCapacity;
