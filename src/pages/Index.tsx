
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import StatsCard from '@/components/Dashboard/StatsCard';
import TeamTracker from '@/components/Dashboard/TeamTracker';
import EmployeeCard from '@/components/Dashboard/EmployeeCard';
import RecruitmentCard from '@/components/Dashboard/RecruitmentCard';
import SalaryCard from '@/components/Dashboard/SalaryCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import { Plus, Users, Clock, Calendar, CalendarDays } from 'lucide-react';
import { employeeStatusData } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 sm:mb-4">
        <div>
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>Portal</span>
            <span>/</span>
            <span>Dashboard</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">Good morning Jhon</h1>
        </div>

        <div className="flex gap-2 sm:gap-3 mt-3 md:mt-0">
          <button className="flex items-center gap-1 sm:gap-1.5 text-[10px] xs:text-xs sm:text-sm border border-input rounded-full px-2 sm:px-3 py-1 sm:py-1.5 hover:bg-lavender hover:text-english-violet transition-colors">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">18 - 22 November</span>
          </button>
          <button className="flex items-center gap-1 sm:gap-1.5 text-[10px] xs:text-xs sm:text-sm bg-primary text-primary-foreground rounded-full px-2 sm:px-3 py-1 sm:py-1.5 hover:bg-primary/90 transition-colors">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Add report</span>
          </button>
        </div>
      </div>

      {/* Main dashboard grid layout */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5">
        {/* First row - Employee card, Chart card and TeamTracker */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          {/* Employee Card */}
          <div className="md:col-span-4">
            <EmployeeCard />
          </div>

          {/* Present status and Avg hours cards */}
          <div className="md:col-span-4 grid grid-cols-1 gap-3 sm:gap-4">
            {/* Present status card */}
            <div>
              <ChartCard
                title="Present status"
                icon={<Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                data={employeeStatusData}
                colors={['#42a5e1', '#0fcbf1']}
                change={2.5}
              />
            </div>

            {/* Hours per week card */}
            <div>
              <Card className="h-full flex flex-col">
                <CardContent className="p-3 sm:p-4 flex flex-col h-full justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-medium">Avg. hours / week</h3>
                    </div>
                    <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-green-100 text-green-700">+0.5%</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold">46,5</span>
                  </div>
                  <div className="flex justify-between mt-auto pt-4 sm:pt-6">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5 sm:gap-1">
                        <div className="flex flex-col space-y-0.5 sm:space-y-1">
                          {[...Array(5)].map((_, j) => (
                            <div 
                              key={j} 
                              className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full 
                                ${Math.random() > 0.5 ? 'bg-blue-500' : 'bg-blue-200'}`}
                            />
                          ))}
                        </div>
                        <span className="text-[8px] sm:text-[10px] text-muted-foreground">{i + 1}h</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team tracker - Side by side with present status */}
          <div className="md:col-span-4">
            <TeamTracker />
          </div>
        </div>

        {/* Bottom section - SalaryCard and RecruitmentCard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          {/* SalaryCard */}
          <div className="md:col-span-4">
            <SalaryCard />
          </div>
          
          {/* RecruitmentCard */}
          <div className="md:col-span-8">
            <RecruitmentCard />
          </div>
        </div>

        {/* Stats cards - span full width */}
        <div className="mt-3 sm:mt-4 md:mt-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
            <h2 className="text-base sm:text-lg md:text-xl font-bold">Recent activities</h2>
            <button className="flex items-center gap-1 sm:gap-1.5 rounded-md bg-primary/10 text-primary px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] xs:text-xs sm:text-sm font-medium transition-colors hover:bg-primary/20">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Add widget</span>
            </button>
          </div>

          {/* Stats cards in a responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
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
      </div>
    </DashboardLayout>
  );
};

export default Index;
