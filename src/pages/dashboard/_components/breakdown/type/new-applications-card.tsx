import { ChartConfig } from '~/components/ui';
import BarChartCard from './bar-chart-card';

const CHART_CONFIG = {
  pv: {
    label: 'PV',
    color: 'hsl(var(--chart-2))',
  },
  ess: {
    label: 'ESS',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

type Props = {};

function generateChartData() {
  const baseData = [
    { substationName: 'West', pv: 186, ess: 80 },
    { substationName: 'Lor', pv: 286, ess: 280 },
  ];

  const chartData: any[] = [];
  for (let i = 1; i <= 5; i++) {
    const baseIndex = i % 2; // Alternate between the two base records
    const newRecord: any = {
      substationName: `${baseData[baseIndex].substationName} ${i}`,
      pv: baseData[baseIndex].pv + Math.floor(Math.random() * 50 - 25),
      ess: baseData[baseIndex].ess + Math.floor(Math.random() * 30 - 15),
    };
    chartData.push(newRecord);
  }
  return chartData;
}
const chartData = generateChartData();

const NewApplicationsCard = (_props: Props) => {
  return <BarChartCard chartData={chartData} chartConfig={CHART_CONFIG} title='New Applications' unit='No.' />;
};

export default NewApplicationsCard;
