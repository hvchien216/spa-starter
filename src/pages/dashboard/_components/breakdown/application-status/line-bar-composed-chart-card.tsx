import { MinusIcon } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import { Bar, CartesianGrid, ComposedChart, Label, Line, XAxis, YAxis } from 'recharts';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui';
import { useGenerateImage } from '~/hooks';
import { download } from '~/utils';

type Props = {
  title: string;
  chartData?: any[];
  unit: 'kWac' | 'kWh';
};

const CHART_CONFIG = {
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
  cumulative: {
    label: 'Cumulative',
    color: '#9A8D89',
    icon: () => <MinusIcon className='size-4' color='#9A8D89' strokeWidth={5} />,
  },
} satisfies ChartConfig;

function generateChartData() {
  const baseData = [
    { substationName: 'West', evaluating: 186, approved: 80, 'turn-on': 100, cumulative: 100 },
    { substationName: 'Lor', evaluating: 286, approved: 280, 'turn-on': 150, cumulative: 100 },
  ];

  const chartData: any[] = [];
  for (let i = 1; i <= 5; i++) {
    const baseIndex = i % 2; // Alternate between the two base records
    const newRecord: any = {
      substationName: `${baseData[baseIndex].substationName} ${i}`,
      evaluating: baseData[baseIndex].evaluating + Math.floor(Math.random() * 50 - 25),
      approved: baseData[baseIndex].approved + Math.floor(Math.random() * 30 - 15),
      'turn-on': baseData[baseIndex]['turn-on'] + Math.floor(Math.random() * 20 - 10),
      cumulative: baseData[baseIndex].cumulative + Math.floor(Math.random() * 50 - 10),
    };
    chartData.push(newRecord);
  }
  return chartData;
}
const chartData = generateChartData();
const LineBarComposedChartCard: FC<Props> = ({ title, unit }) => {
  const data = chartData;
  const [legendInteraction, setLegendInteraction] = useState<Record<string, null | string | boolean>>({
    hover: null,
  });

  function handleLegendMouseEnter({ dataKey }: Payload) {
    if (typeof dataKey !== 'string' || !!legendInteraction.dataKey) return;
    if (!legendInteraction[dataKey]) {
      setLegendInteraction({ ...legendInteraction, hover: dataKey ?? null });
    }
  }
  function handleLegendMouseLeave() {
    setLegendInteraction({ ...legendInteraction, hover: null });
  }
  function handleLegendClick({ dataKey }: Payload) {
    if (typeof dataKey !== 'string') return;
    setLegendInteraction({
      ...legendInteraction,
      [dataKey]: !legendInteraction[dataKey],
      hover: null,
    });
  }

  const [getImageBlob, { ref, isLoading }] = useGenerateImage<HTMLDivElement>();

  const handleDivDownload = useCallback(async () => {
    const imageBlob = await getImageBlob();
    if (imageBlob) {
      download(imageBlob);
    }
  }, [getImageBlob]);

  return (
    <Card className='flex flex-col border-0 shadow-der'>
      <CardHeader className='flex flex-row items-center justify-between pb-0'>
        <CardTitle className='text-lg font-bold leading-6 text-secondary'>{title}</CardTitle>
        <Button variant='outline' onClick={handleDivDownload} disabled={isLoading} loading={isLoading}>
          {isLoading ? 'Downloading...' : 'Download'}
        </Button>
      </CardHeader>
      <CardContent className='mt-2 flex-1'>
        <ChartContainer config={CHART_CONFIG} className='max-h-[200px] w-full' ref={ref}>
          <ComposedChart
            barCategoryGap={0}
            accessibilityLayer
            data={data}
            margin={{
              top: 30,
              // left: 15,
            }}
          >
            <CartesianGrid vertical={false} />
            {/* // TODO: Format Ticket for case MONTHLY (Month on the Top, Year on the Bottom) */}
            <XAxis dataKey='substationName' tickLine={false} axisLine={false} interval={0} />
            <YAxis type='number' tickLine={false} tickMargin={10} axisLine={false}>
              <Label position='insideTopLeft' dy={-30} dx={-5} className='fill-[#818A91] font-bold'>
                {unit}
              </Label>
            </YAxis>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend
              // className='-mt-4'
              content={
                <ChartLegendContent
                  // className='-mt-4'
                  legendInteraction={legendInteraction}
                  onLegendClick={handleLegendClick}
                  onLegendMouseEnter={handleLegendMouseEnter}
                  onLegendMouseLeave={handleLegendMouseLeave}
                />
              }
            />
            <Bar
              dataKey='turn-on'
              stackId='a'
              fill='var(--color-turn-on)'
              radius={[0, 0, 4, 4]}
              hide={legendInteraction['turn-on'] === true}
              opacity={legendInteraction.hover === 'turn-on' || !legendInteraction.hover ? 1 : 0.5}
            />
            <Bar
              dataKey='approved'
              stackId='a'
              fill='var(--color-approved)'
              radius={[0, 0, 0, 0]}
              hide={legendInteraction.approved === true}
              opacity={legendInteraction.hover === 'approved' || !legendInteraction.hover ? 1 : 0.5}
            />
            <Bar
              dataKey='evaluating'
              stackId='a'
              fill='var(--color-evaluating)'
              radius={[4, 4, 0, 0]}
              hide={legendInteraction.evaluating === true}
              opacity={legendInteraction.hover === 'evaluating' || !legendInteraction.hover ? 1 : 0.5}
            />
            <Line
              dataKey='cumulative'
              type='linear'
              stroke='var(--color-cumulative)'
              strokeWidth={2}
              dot={false}
              hide={legendInteraction.cumulative === true}
              opacity={legendInteraction.hover === 'cumulative' || !legendInteraction.hover ? 1 : 0.5}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineBarComposedChartCard;
