
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import GreetingHeader from '@/components/Dashboard/GreetingHeader';
import StatsCard from '@/components/Dashboard/StatsCard';
import TeamTracker from '@/components/Dashboard/TeamTracker';
import EmployeeCard from '@/components/Dashboard/EmployeeCard';
import RecruitmentCard from '@/components/Dashboard/RecruitmentCard';
import SalaryCard from '@/components/Dashboard/SalaryCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import { Plus, Users, Clock, PercentCircle, TrendingUp } from 'lucide-react';
import { workHoursDistribution } from '@/data/mockData';

const Index = () => {
  return (
    <DashboardLayout>
      <GreetingHeader userName="Jhon" />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
        <div className="col-span-1 grid grid-cols-1 gap-5">
          <StatsCard
            title="Avg. hours / week"
            value="46,5"
            change={0.5}
            icon={<Clock className="h-4 w-4" />}
            variant="success"
          />
          <ChartCard
            title="Present status"
            icon={<Users className="h-4 w-4" />}
            data={workHoursDistribution}
            colors={['#42a5e1', '#0fcbf1']}
            change={2.5}
          />
        </div>

        <div className="lg:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <EmployeeCard />
          <TeamTracker />
          <SalaryCard />
          <RecruitmentCard />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Recent activities</h2>
          <button className="flex items-center gap-1.5 rounded-md bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium transition-colors hover:bg-primary/20">
            <Plus className="h-4 w-4" />
            <span>Add widget</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatsCard
            title="Monthly applications"
            value="125"
            change={12}
            subtitle="15% increase from last month"
          />
          <StatsCard
            title="Team performance"
            value="92%"
            change={3.2}
            subtitle="5% above target"
            variant="info"
          />
          <StatsCard
            title="New hires onboarding"
            value="18"
            change={-5}
            subtitle="Last 30 days"
            variant="warning"
          />
          <StatsCard
            title="Department efficiency"
            value="86%"
            change={7.5}
            subtitle="Process optimization"
            variant="success"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
