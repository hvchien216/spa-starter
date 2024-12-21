import { Line, LineChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, ChartConfig, ChartContainer, Separator } from '~/components/ui';

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
  dataPrimary: number;
  dataSecondary: number;
  dataPercentage?: number;
  isUp?: boolean;
};

const NationalTargetCard = ({ chartData, dataPrimary, dataSecondary, isUp }: Props) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 p-4 pb-0'>
        <CardTitle className='text-base font-medium'>This Year’s Capacity</CardTitle>
      </CardHeader>
      <CardContent className='p-4 pt-3'>
        <div className='flex items-center'>
          <p className='flex-1 space-x-1'>
            <span className='text-2xl font-bold'>{dataPrimary}</span>
            <span className='text-sm font-normal'>GWp</span>
          </p>
          <Separator orientation='vertical' className='mr-4 h-12 bg-[#E7ECEF]' />
          <div className='flex flex-1 items-center'>
            <div className='flex-1'>
              <p className='space-x-1'>
                <span className='text-2xl font-bold'>{dataSecondary}</span>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default NationalTargetCard;
