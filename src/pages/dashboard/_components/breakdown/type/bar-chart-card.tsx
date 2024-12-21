import { FC, useCallback, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';
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
  chartData: any[];
  chartConfig: ChartConfig;
  unit: 'kWac' | 'No.';
};

const BarChartCard: FC<Props> = ({ title, unit, chartData, chartConfig }) => {
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
        <ChartContainer config={chartConfig} className='max-h-[200px] w-full' ref={ref}>
          <BarChart
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
                  // className='-mt-4'
                  legendInteraction={legendInteraction}
                  onLegendClick={handleLegendClick}
                  onLegendMouseEnter={handleLegendMouseEnter}
                  onLegendMouseLeave={handleLegendMouseLeave}
                />
              }
            />
            <Bar
              dataKey='pv'
              stackId='a'
              fill='var(--color-pv)'
              radius={[0, 0, 0, 0]}
              hide={legendInteraction.pv === true}
              opacity={legendInteraction.hover === 'pv' || !legendInteraction.hover ? 1 : 0.5}
            />
            <Bar
              dataKey='ess'
              stackId='a'
              fill='var(--color-ess)'
              radius={[0, 0, 0, 0]}
              hide={legendInteraction.ess === true}
              opacity={legendInteraction.hover === 'ess' || !legendInteraction.hover ? 1 : 0.5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartCard;
