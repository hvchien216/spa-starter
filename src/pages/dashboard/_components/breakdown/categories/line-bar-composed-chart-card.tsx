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
  unit: 'kWac' | 'kWh' | 'No.';
  noLine?: boolean;
};

const CHART_CONFIG = {
  others: {
    label: 'Others',
    color: 'hsl(var(--chart-1))',
  },
  commercial: {
    label: 'Commercial',
    color: 'hsl(var(--chart-2))',
  },
  residential: {
    label: 'Residential',
    color: 'hsl(var(--chart-4))',
  },
  industrial: {
    label: 'Industrial',
    color: 'hsl(var(--chart-3))',
  },
  othersCumulative: {
    label: 'O-Cumulative',
    color: 'hsl(var(--chart-1))',
    icon: () => <MinusIcon className='size-4' color='hsl(var(--chart-1))' strokeWidth={5} />,
  },
  commercialCumulative: {
    label: 'C-Cumulative',
    color: 'hsl(var(--chart-2))',
    icon: () => <MinusIcon className='size-4' color='hsl(var(--chart-2))' strokeWidth={5} />,
  },
  residentialCumulative: {
    label: 'R-Cumulative',
    color: 'hsl(var(--chart-4))',
    icon: () => <MinusIcon className='size-4' color='hsl(var(--chart-4))' strokeWidth={5} />,
  },
  industrialCumulative: {
    label: 'I-Cumulative',
    color: 'hsl(var(--chart-3))',
    icon: () => <MinusIcon className='size-4' color='hsl(var(--chart-3))' strokeWidth={5} />,
  },
} satisfies ChartConfig;

function generateChartData() {
  const baseData = [
    { substationName: 'West', others: 186, industrial: 200, commercial: 80, residential: 100 },
    { substationName: 'Lor', others: 286, industrial: 400, commercial: 280, residential: 150 },
  ];

  const chartData: any[] = [];
  for (let i = 1; i <= 5; i++) {
    const baseIndex = i % 2; // Alternate between the two base records
    const newRecord: any = {
      substationName: `${baseData[baseIndex].substationName} ${i}`,
      others: baseData[baseIndex].others + Math.floor(Math.random() * 50 - 25),
      commercial: baseData[baseIndex].commercial + Math.floor(Math.random() * 30 - 15),
      residential: baseData[baseIndex].residential + Math.floor(Math.random() * 20 - 10),
      industrial: baseData[baseIndex].industrial + Math.floor(Math.random() * 50 - 10),
      othersCumulative: i === 1 ? 0 : baseData[baseIndex].others + Math.floor(Math.random() * 50 - 25),
      commercialCumulative: baseData[baseIndex].commercial + Math.floor(Math.random() * 30 - 15),
      residentialCumulative: baseData[baseIndex].residential + Math.floor(Math.random() * 20 - 10),
      industrialCumulative: baseData[baseIndex].industrial + Math.floor(Math.random() * 50 - 10),
    };
    chartData.push(newRecord);
  }
  return chartData;
}
const chartData = generateChartData();
const LineBarComposedChartCard: FC<Props> = ({ title, unit, noLine = false }) => {
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
        <ChartContainer config={CHART_CONFIG} className='max-h-[224px] w-full' ref={ref}>
          <ComposedChart
            barCategoryGap={0}
            accessibilityLayer
            data={data}
            margin={{
              top: 30,
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
                  className='flex-wrap px-14 [&>div]:w-[20%] [&>div]:justify-center'
                  legendInteraction={legendInteraction}
                  onLegendClick={handleLegendClick}
                  onLegendMouseEnter={handleLegendMouseEnter}
                  onLegendMouseLeave={handleLegendMouseLeave}
                />
              }
            />
            <Bar
              dataKey='others'
              stackId='a'
              fill='var(--color-others)'
              radius={[0, 0, 4, 4]}
              hide={legendInteraction.others === true}
              opacity={legendInteraction.hover === 'others' || !legendInteraction.hover ? 1 : 0.5}
            />
            <Bar
              dataKey='commercial'
              stackId='a'
              fill='var(--color-commercial)'
              radius={[0, 0, 0, 0]}
              hide={legendInteraction.commercial === true}
              opacity={legendInteraction.hover === 'commercial' || !legendInteraction.hover ? 1 : 0.5}
            />
            <Bar
              dataKey='industrial'
              stackId='a'
              fill='var(--color-industrial)'
              radius={[0, 0, 0, 0]}
              hide={legendInteraction.industrial === true}
              opacity={legendInteraction.hover === 'industrial' || !legendInteraction.hover ? 1 : 0.5}
            />
            <Bar
              dataKey='residential'
              stackId='a'
              fill='var(--color-residential)'
              radius={[4, 4, 0, 0]}
              hide={legendInteraction.residential === true}
              opacity={legendInteraction.hover === 'residential' || !legendInteraction.hover ? 1 : 0.5}
            />
            {!noLine && (
              <>
                <Line
                  dataKey='othersCumulative'
                  type='linear'
                  stroke='var(--color-othersCumulative)'
                  strokeWidth={2}
                  dot={false}
                  hide={legendInteraction.othersCumulative === true}
                  opacity={legendInteraction.hover === 'othersCumulative' || !legendInteraction.hover ? 1 : 0.5}
                  connectNulls
                />
                <Line
                  dataKey='commercialCumulative'
                  type='linear'
                  stroke='var(--color-commercialCumulative)'
                  strokeWidth={2}
                  dot={false}
                  hide={legendInteraction.commercialCumulative === true}
                  opacity={legendInteraction.hover === 'commercialCumulative' || !legendInteraction.hover ? 1 : 0.5}
                  connectNulls
                />
                <Line
                  dataKey='industrialCumulative'
                  type='linear'
                  stroke='var(--color-industrialCumulative)'
                  strokeWidth={2}
                  dot={false}
                  hide={legendInteraction.industrialCumulative === true}
                  opacity={legendInteraction.hover === 'industrialCumulative' || !legendInteraction.hover ? 1 : 0.5}
                />

                <Line
                  dataKey='residentialCumulative'
                  type='linear'
                  stroke='var(--color-residentialCumulative)'
                  strokeWidth={2}
                  dot={false}
                  hide={legendInteraction.residentialCumulative === true}
                  opacity={legendInteraction.hover === 'residentialCumulative' || !legendInteraction.hover ? 1 : 0.5}
                />
              </>
            )}
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineBarComposedChartCard;
