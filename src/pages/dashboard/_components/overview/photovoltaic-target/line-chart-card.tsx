import { FC, useState } from 'react';
import { Payload } from 'recharts/types/component/DefaultLegendContent';
import { MinusIcon } from 'lucide-react';
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui';

const chartData = [
  { month: 'January', current: 186, nationalTarget: 80 },
  { month: 'February', current: 305, nationalTarget: 200 },
  { month: 'March', current: 237, nationalTarget: 120 },
  { month: 'April', current: 73, nationalTarget: 190 },
  { month: 'May', current: 209, nationalTarget: 130 },
  { month: 'June', current: 214, nationalTarget: 140 },
];
const chartConfig = {
  current: {
    label: 'Current',
    icon: () => <MinusIcon className='size-4' color='hsl(var(--chart-1))' strokeWidth={5} />,
    color: 'hsl(var(--chart-1))',
  },
  nationalTarget: {
    label: 'National Target',
    icon: () => <MinusIcon className='size-4' color='hsl(var(--chart-3))' strokeWidth={5} />,
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

type Props = {
  title: string;
  chartConfig: ChartConfig;
  chartData: any[];
  dataKey: string;
  nameKey: string;
  labelPrimary: string;
  labelSecondary: string;
  // ========= Legend ==========
  legendInteraction: Record<string, null | string | boolean>;
};

const LineChartCard: FC<Partial<Props>> = () => {
  //TODO: wire up the data with react-query
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
    <ChartContainer config={chartConfig} className='max-h-[200px] min-h-[200px] w-full'>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 30,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis type='number' tickLine={false} tickMargin={10} axisLine={false}>
          <Label position='insideTopLeft' dy={-30} className='fill-[#818A91] font-bold'>
            Gwp
          </Label>
        </YAxis>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend
          content={
            <ChartLegendContent
              legendInteraction={legendInteraction}
              onLegendClick={handleLegendClick}
              onLegendMouseEnter={handleLegendMouseEnter}
              onLegendMouseLeave={handleLegendMouseLeave}
            />
          }
        />
        <Line
          dataKey='current'
          type='linear'
          stroke='var(--color-current)'
          strokeWidth={2}
          dot={false}
          hide={legendInteraction.current === true}
          opacity={legendInteraction.hover === 'current' || !legendInteraction.hover ? 1 : 0.5}
        />
        <Line
          dataKey='nationalTarget'
          type='linear'
          stroke='var(--color-nationalTarget)'
          strokeWidth={2}
          dot={false}
          hide={legendInteraction.nationalTarget === true}
          opacity={legendInteraction.hover === 'nationalTarget' || !legendInteraction.hover ? 1 : 0.5}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default LineChartCard;
