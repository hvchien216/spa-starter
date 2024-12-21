import NewApplicationsCard from './new-applications-card';
import DecommissionedCapacity from './decommissioned-capacity-card';

type Props = {};

const Type = (_props: Props) => {
  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      <NewApplicationsCard />
      <DecommissionedCapacity />
    </div>
  );
};

export default Type;
