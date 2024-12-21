import { useState } from 'react';
import { Pie, PieChart } from 'recharts';
import { Card, CardContent, ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from '~/components/ui';
import DonutChartCard from './donut-chart-card';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

const chartData = [
  { browser: '2020', visitors: 275, fill: 'var(--color-2020)' },
  { browser: '2021', visitors: 200, fill: 'var(--color-2021)' },
  { browser: '2022', visitors: 287, fill: 'var(--color-2022)' },
  { browser: '2023', visitors: 173, fill: 'var(--color-2023)' },
  { browser: '2024', visitors: 190, fill: 'var(--color-2024)' },
];
const chartConfig = {
  2020: {
    label: '2020',
    icon: () => <div className='h-2 w-2 shrink-0 rounded-full bg-chart-1' />,
    color: 'hsl(var(--chart-1))',
  },
  2021: {
    label: '2021',
    icon: () => <div className='h-2 w-2 shrink-0 rounded-full bg-chart-2' />,
    color: 'hsl(var(--chart-2))',
  },
  2022: {
    label: '2022',
    icon: () => <div className='h-2 w-2 shrink-0 rounded-full bg-chart-3' />,
    color: 'hsl(var(--chart-3))',
  },
  2023: {
    label: '2023',
    icon: () => <div className='h-2 w-2 shrink-0 rounded-full bg-chart-4' />,
    color: 'hsl(var(--chart-4))',
  },
  2024: {
    label: '2024',
    icon: () => <div className='h-2 w-2 shrink-0 rounded-full bg-chart-5' />,
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function Statistics() {
  const [legendInteraction, setLegendInteraction] = useState<Record<string, null | string | boolean>>({
    hover: null,
  });

  function handleLegendMouseEnter({ value }: Payload) {
    if (typeof value !== 'string' || !!legendInteraction.value) return;
    if (!legendInteraction[value]) {
      setLegendInteraction({ ...legendInteraction, hover: value ?? null });
    }
  }
  function handleLegendMouseLeave() {
    setLegendInteraction({ ...legendInteraction, hover: null });
  }
  function handleLegendClick({ value }: Payload) {
    if (typeof value !== 'string') return;
    setLegendInteraction({
      ...legendInteraction,
      [value]: !legendInteraction[value],
      hover: null,
    });
  }

  const tempText = '100'; // TODO: replace with real data

  // TODO: wire up the data with react-query
  const filteredPortion = Object.entries(legendInteraction)
    .filter(([key, val]) => key !== 'hover' && Boolean(val))
    .map((item) => item?.[0]);

  return (
    <>
      <Card className='flex flex-col border-0 shadow-der'>
        <CardContent className='flex-1 pb-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <DonutChartCard
              title='No. of Application'
              chartConfig={chartConfig}
              chartData={chartData.filter((item) => !filteredPortion.includes(item.browser))}
              dataKey='visitors'
              nameKey='browser'
              labelPrimary={tempText.toLocaleString()}
              labelSecondary='No. of applications'
              legendInteraction={legendInteraction}
            />
            <DonutChartCard
              title='Installed Capacity (kWac)'
              chartConfig={chartConfig}
              chartData={chartData.filter((item) => !filteredPortion.includes(item.browser))}
              dataKey='visitors'
              nameKey='browser'
              labelPrimary={tempText.toLocaleString()}
              labelSecondary='kWac'
              legendInteraction={legendInteraction}
            />
            <DonutChartCard
              title='Installed Capacity (kWh)'
              chartConfig={chartConfig}
              chartData={chartData.filter((item) => !filteredPortion.includes(item.browser))}
              dataKey='visitors'
              nameKey='browser'
              labelPrimary={tempText.toLocaleString()}
              labelSecondary='kWh'
              legendInteraction={legendInteraction}
            />
          </div>
          <div className='-mt-3 w-full'>
            <ChartContainer config={chartConfig} className='mx-auto max-h-[24px]'>
              <PieChart>
                <Pie data={chartData} dataKey='visitors' nameKey='browser' cx={0} cy={0} outerRadius={0} />
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
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
