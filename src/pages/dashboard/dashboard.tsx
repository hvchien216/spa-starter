import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui';
import { PageHeader } from '~/components/common';
import { locations } from '~/routing';

type Props = {};
const Dashboard: React.FC<Props> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname === locations.dashboardOverview ? 'OVERVIEW' : 'BREAKDOWN';

  const onNavigate = (url: string) => () => {
    navigate(url);
  };

  return (
    <>
      <PageHeader title='Dashboard' />
      <Tabs defaultValue='OVERVIEW' value={currentTab}>
        <div className='container-wrapper'>
          <TabsList>
            <TabsTrigger value='OVERVIEW' onClick={onNavigate(locations.dashboardOverview)}>
              Overview
            </TabsTrigger>
            <TabsTrigger value='BREAKDOWN' onClick={onNavigate(locations.dashboardBreakdown)}>
              Breakdown
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={currentTab}>
          <div className='container-wrapper'>
            <Outlet />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Dashboard;
