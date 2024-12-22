import Statistics from './statistics';
import SubstationComparison from './substation-comparison';
import PhotovoltaicTarget from './photovoltaic-target';
import { FeatureEnabled } from '~/components/customized/feature-enabled';

const Overview = () => {
  return (
    <div className='space-y-6'>
      <FeatureEnabled featureFlag='DISABLED_FEATURE' userRole='ADMIN'>
        <Statistics />
      </FeatureEnabled>
      <SubstationComparison />
      <PhotovoltaicTarget />
    </div>
  );
};

export default Overview;
