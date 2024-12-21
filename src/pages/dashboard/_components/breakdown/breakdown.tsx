import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui';
import ApplicationStatus from './application-status';
import Categories from './categories';
import Type from './type';

const Breakdown = () => {
  return (
    <>
      <Tabs defaultValue='APPLICATION_STATUS'>
        <TabsList>
          <TabsTrigger variant='badge' value='APPLICATION_STATUS'>
            Application Status
          </TabsTrigger>
          <TabsTrigger variant='badge' value='CATEGORIES'>
            Categories
          </TabsTrigger>
          <TabsTrigger variant='badge' value='TYPE'>
            Type
          </TabsTrigger>
        </TabsList>
        <TabsContent value='APPLICATION_STATUS' variant='badge' className='p-0'>
          <ApplicationStatus />
        </TabsContent>
        <TabsContent value='CATEGORIES' variant='badge' className='p-0'>
          <Categories />
        </TabsContent>
        <TabsContent value='TYPE' variant='badge' className='p-0'>
          <Type />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Breakdown;
