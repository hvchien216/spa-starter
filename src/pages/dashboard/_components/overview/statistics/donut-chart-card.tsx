import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui';
import { PieChart, Pie, Label, Cell } from 'recharts';
import { FC } from 'react';
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

const DonutChartCard: FC<Props> = ({
  title,
  chartConfig,
  chartData,
  dataKey,
  nameKey,
  labelPrimary,
  labelSecondary,
  legendInteraction,
}) => {
  return (
    <Card className='flex flex-col border-0 shadow-none'>
      <CardHeader className='items-center pb-0'>
        <CardTitle className='text-lg'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey={dataKey} nameKey={nameKey} innerRadius={70} strokeWidth={5}>
              {chartData.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    opacity={legendInteraction.hover === entry.browser || !legendInteraction.hover ? 1 : 0.3}
                  />
                );
              })}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
                          {labelPrimary}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                          {labelSecondary}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DonutChartCard;
