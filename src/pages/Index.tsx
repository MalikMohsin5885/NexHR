
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import TeamTracker from '@/components/Dashboard/TeamTracker';
import EmployeeCard from '@/components/Dashboard/EmployeeCard';
import RecruitmentCard from '@/components/Dashboard/RecruitmentCard';
import SalaryCard from '@/components/Dashboard/SalaryCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import { Plus, Users, Clock, Calendar, CalendarDays } from 'lucide-react';
import { employeeStatusData, teamData } from '@/data/mockData';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Portal</span>
            <span>/</span>
            <span>Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold mt-1">Good morning Jhon</h1>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-1.5 text-sm border border-input rounded-full px-3 py-1.5">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">18 - 22 November</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm bg-primary text-primary-foreground rounded-full px-3 py-1.5">
            <Plus className="h-4 w-4" />
            <span>Add report</span>
          </button>
        </div>
      </div>

      {/* First row with 3 components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div className="col-span-1">
          <EmployeeCard />
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded-xl border p-4 h-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium">Avg. hours / week</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">+0.5%</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">46,5</span>
            </div>
            <div className="flex justify-between mt-2 pt-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="flex flex-col space-y-1">
                    {[...Array(5)].map((_, j) => (
                      <div 
                        key={j} 
                        className={`h-1.5 w-1.5 rounded-full 
                          ${Math.random() > 0.5 ? 'bg-blue-500' : 'bg-blue-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{i + 1}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <ChartCard
            title="Present status"
            icon={<Users className="h-4 w-4" />}
            data={employeeStatusData}
            colors={['#42a5e1', '#0fcbf1']}
            change={2.5}
          />
        </div>
      </div>

      {/* Second row with 3 components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div className="col-span-1">
          <TeamTracker data={teamData} />
        </div>
        
        <div className="col-span-1">
          <RecruitmentCard />
        </div>
        
        <div className="col-span-1">
          <SalaryCard />
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

        {/* Stats cards in a row of 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-5">
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
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
