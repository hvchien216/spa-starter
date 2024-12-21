import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import {
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
  Tabs,
  TabsList,
  TabsTrigger,
} from '~/components/ui';

function generateChartData() {
  const baseData = [
    { substationName: '22 kV Rangoon Circle West St', evaluating: 186, approved: 80, 'turn-on': 100 },
    { substationName: '66 kV Bedok Lor', evaluating: 286, approved: 280, 'turn-on': 150 },
  ];

  const chartData: any[] = [];
  for (let i = 1; i <= 60; i++) {
    const baseIndex = i % 2; // Alternate between the two base records
    const newRecord: any = {
      substationName: `${baseData[baseIndex].substationName} ${i}`,
      evaluating: baseData[baseIndex].evaluating + Math.floor(Math.random() * 50 - 25),
      approved: baseData[baseIndex].approved + Math.floor(Math.random() * 30 - 15),
      'turn-on': baseData[baseIndex]['turn-on'] + Math.floor(Math.random() * 20 - 10),
    };
    chartData.push(newRecord);
  }
  return chartData;
}
const chartData = generateChartData();

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

type Props = {};

const SubstationComparison = (_props: Props) => {
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

  return (
    <Card className='flex flex-col border-0 shadow-der'>
      <CardHeader className='flex flex-row items-center justify-between pb-4'>
        <CardTitle className='text-lg font-bold leading-6 text-secondary'>Substations Comparison</CardTitle>
      </CardHeader>
      <CardContent className='flex-1'>
        <Tabs defaultValue='APPLICATION_STATUS'>
          <TabsList>
            <TabsTrigger variant='badge' value='APPLICATION_STATUS'>
              Application Status
            </TabsTrigger>
            <TabsTrigger variant='badge' value='APPLICATION_CATEGORIES'>
              Application Categories
            </TabsTrigger>
            <TabsTrigger variant='badge' value='NEW_APPLICATION'>
              New Applications
            </TabsTrigger>
            <TabsTrigger variant='badge' value='KWAC'>
              kWac
            </TabsTrigger>
            <TabsTrigger variant='badge' value='KWH'>
              kWh
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className='mt-2'>
          <ChartContainer config={chartConfig} className='max-h-[580px] min-h-[580px] w-full'>
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 30,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='substationName'
                tickLine={false}
                axisLine={false}
                angle={-90}
                tick={{ textAnchor: 'end', dominantBaseline: 'ideographic' }}
                height={150}
                interval={0}
              />
              <YAxis type='number' tickLine={false} tickMargin={10} axisLine={false}>
                <Label position='insideTopLeft' dy={-30} className='fill-[#818A91] font-bold'>
                  No.
                </Label>
              </YAxis>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend
                content={
                  <ChartLegendContent
                    className='mt-14'
                    legendInteraction={legendInteraction}
                    onLegendClick={handleLegendClick}
                    onLegendMouseEnter={handleLegendMouseEnter}
                    onLegendMouseLeave={handleLegendMouseLeave}
                  />
                }
              />
              <Bar
                dataKey='evaluating'
                stackId='a'
                fill='var(--color-evaluating)'
                radius={[0, 0, 4, 4]}
                hide={legendInteraction.evaluating === true}
                opacity={legendInteraction.hover === 'evaluating' || !legendInteraction.hover ? 1 : 0.5}
              />
              <Bar
                dataKey='turn-on'
                stackId='a'
                fill='var(--color-turn-on)'
                radius={[0, 0, 0, 0]}
                hide={legendInteraction['turn-on'] === true}
                opacity={legendInteraction.hover === 'turn-on' || !legendInteraction.hover ? 1 : 0.5}
              />
              <Bar
                dataKey='approved'
                stackId='a'
                fill='var(--color-approved)'
                radius={[4, 4, 0, 0]}
                hide={legendInteraction.approved === true}
                opacity={legendInteraction.hover === 'approved' || !legendInteraction.hover ? 1 : 0.5}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubstationComparison;
