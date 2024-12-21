import { MoveDownIcon } from 'lucide-react';
import { Line, LineChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, ChartConfig, ChartContainer } from '~/components/ui';
import { cn, isNil } from '~/utils';

// TODO: update this config with real data
const chartConfig = {
  evaluating: {
    label: 'Evaluating',
    color: 'hsl(var(--chart-4))',
  },
  approved: {
    label: 'Approved',
    color: 'hsl(var(--chart-3))',
  },
  'turn-on': {
    label: 'Turn-on',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type Props = {
  chartData: any[];
  currentData: number;
  dataPercentage?: number;
  isUp?: boolean;
};

const StatisticsCapacityCard = ({ chartData, currentData, dataPercentage, isUp }: Props) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 p-4 pb-0'>
        <CardTitle className='text-base font-medium'>This Year’s Capacity</CardTitle>
      </CardHeader>
      <CardContent className='p-4 pt-3'>
        <div className='flex items-center'>
          <div className='flex-1'>
            <p className='space-x-1'>
              <span className='text-2xl font-bold'>{currentData}</span>
              <span className='text-sm font-normal'>GWp</span>
            </p>
          </div>
          <ChartContainer config={chartConfig} className='min-h-5 w-16'>
            <LineChart accessibilityLayer data={chartData} className='h-full w-full'>
              <Line
                dataKey='mobile'
                type='monotone'
                stroke={isUp ? `hsl(var(--chart-7))` : `hsl(var(--chart-8))`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
        {!isNil(dataPercentage) && (
          <div>
            <p className={cn('flex items-center text-xs', isUp ? 'text-chart-7' : 'text-chart-8')}>
              <MoveDownIcon className='inline-block h-2 w-3' />
              <span>{dataPercentage}%</span>
              <span className='ml-0.5 text-secondary'>vs last year</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticsCapacityCard;
