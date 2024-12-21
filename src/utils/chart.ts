import { ChartConfig } from '~/components/ui';

export const getLastFiveYearsChartConfig = (year: number): ChartConfig => {
  const FIVE_YEARS = 5;
  const result: ChartConfig = {};
  for (let i = 0; i < FIVE_YEARS; i++) {
    const currentYear = year - i;

    result[currentYear] = {
      label: currentYear.toString(),
      color: `hsl(var(--chart-${FIVE_YEARS - i}))`,
    };
  }
  return result;
};

export const MONTHLY_CHART_CONFIG = {
  Jan: { label: 'January', color: 'hsl(var(--chart-1))' },
  Feb: { label: 'February', color: 'hsl(var(--chart-2))' },
  Mar: { label: 'March', color: 'hsl(var(--chart-3))' },
  Apr: { label: 'April', color: 'hsl(var(--chart-4))' },
  May: { label: 'May', color: 'hsl(var(--chart-5))' },
  Jun: { label: 'June', color: 'hsl(var(--chart-6))' },
  Jul: { label: 'July', color: 'hsl(var(--chart-7))' },
  Aug: { label: 'August', color: 'hsl(var(--chart-8))' },
  Sep: { label: 'September', color: 'hsl(var(--chart-9))' },
  Oct: { label: 'October', color: 'hsl(var(--chart-10))' },
  Nov: { label: 'November', color: 'hsl(var(--chart-11))' },
  Dec: { label: 'December', color: 'hsl(var(--chart-12))' },
} satisfies ChartConfig;
