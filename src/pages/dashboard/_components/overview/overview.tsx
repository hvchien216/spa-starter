import Statistics from './statistics';
import SubstationComparison from './substation-comparison';
import PhotovoltaicTarget from './photovoltaic-target';

const Overview = () => {
  return (
    <div className='space-y-6'>
      <Statistics />
      <SubstationComparison />
      <PhotovoltaicTarget />
    </div>
  );
};

export default Overview;
