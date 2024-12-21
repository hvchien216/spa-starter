import LineBarComposedChartCard from './line-bar-composed-chart-card';

type Props = {};

const Categories = (_props: Props) => {
  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      <LineBarComposedChartCard title='Applications for Turn-on' unit='No.' noLine />
      <LineBarComposedChartCard title='Installed Capacity (kWac)' unit='kWac' />
      <LineBarComposedChartCard title='Installed Capacity (kWh)' unit='kWh' />
    </div>
  );
};

export default Categories;
