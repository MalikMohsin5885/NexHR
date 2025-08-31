
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock, Users } from 'lucide-react';

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  data: { status: string; percentage: number; color: string; }[];
  colors: string[];
  change?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  icon,
  data,
  colors,
  change,
}) => {
  const pieData = data.map(item => ({
    name: item.status,
    value: item.percentage,
  }));

  // Calculate total employees (just for display purposes)
  const totalEmployees = 120;
  const presentEmployees = Math.round(totalEmployees * (data[0]?.percentage || 0) / 100);
  const remoteEmployees = Math.round(totalEmployees * (data[1]?.percentage || 0) / 100);

  return (
    <div className="hr-card flex flex-col p-4 sm:p-5 animate-scale-in h-full">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            {icon}
          </div>
          <h3 className="text-sm sm:text-base font-medium">{title}</h3>
        </div>
        {change && (
          <div className="text-xs sm:text-sm text-green-600 font-medium">+{change}%</div>
        )}
      </div>

      <div className="flex items-center mt-1 sm:mt-2 space-x-2 sm:space-x-3">
        <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={14}
                outerRadius={28}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                  padding: '6px 10px', 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center justify-between mb-1 last:mb-0">
              <div className="flex items-center">
                <div 
                  className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full mr-1.5 sm:mr-2" 
                  style={{ backgroundColor: entry.color || colors[index % colors.length] }}
                ></div>
                <span className="text-xs sm:text-sm">{entry.status}</span>
              </div>
              <span className="text-xs sm:text-sm font-medium">{entry.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced content for Present Status card with better responsive design */}
      <div className="mt-3 sm:mt-4 border-t pt-2 sm:pt-3 text-xs sm:text-sm">
        <div className="text-gray-700 font-medium mb-1.5 sm:mb-2">Team Attendance Summary</div>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <div className="bg-lavender/20 p-1.5 sm:p-2 rounded-md">
            <p className="text-[11px] sm:text-xs text-gray-600">On-site</p>
            <p className="font-medium text-xs sm:text-sm">{presentEmployees} employees</p>
          </div>
          <div className="bg-blue-50 p-1.5 sm:p-2 rounded-md">
            <p className="text-[11px] sm:text-xs text-gray-600">Remote</p>
            <p className="font-medium text-xs sm:text-sm">{remoteEmployees} employees</p>
          </div>
        </div>
        
        <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
          <p className="text-[11px] sm:text-xs text-gray-600">
            Overall attendance rate is higher than last week.
            Team productivity has increased by 3.2%.
          </p>
          
          <div className="text-[11px] sm:text-xs bg-primary/10 p-1.5 sm:p-2 rounded-md">
            <p className="font-medium text-primary">Today's Highlights:</p>
            <ul className="list-disc pl-3 sm:pl-4 mt-0.5 sm:mt-1 text-gray-600">
              <li>5 team members have scheduled meetings</li>
              <li>3 employees working remotely today</li>
              <li>Team standup at 10:00 AM</li>
              <li>Project deadline reminder: UI design by Friday</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
