
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { teamMembers } from '@/data/mockData';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TeamTracker: React.FC = () => {
  const total = teamMembers.reduce((acc, item) => acc + item.count, 0);

  // Prepare data for pie chart
  const data = teamMembers.map((item) => ({
    name: item.role,
    value: item.count,
    color: item.color,
  }));

  return (
    <div className="hr-card col-span-1 row-span-2 flex flex-col animate-scale-in">
      <div className="p-5 border-b border-border/40">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Track your team</h3>
          <button className="text-primary hover:underline text-sm flex items-center">
            View all <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-5">
        <div className="flex justify-center items-center h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} members`, ""]}
                labelFormatter={() => ""}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center mt-4">
          <div className="bg-muted/30 rounded-md py-2 px-4 text-center">
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-sm text-muted-foreground">Total members</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="h-3 w-3 rounded-full mr-2" 
                  style={{ backgroundColor: member.color }}
                />
                <span className="text-sm">{member.role}</span>
              </div>
              <span className="font-medium text-sm">{member.count} members</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamTracker;
