
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { workHoursDistribution } from '@/data/mockData';
import { Clock, Users } from 'lucide-react';

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  data: { status: string; percentage: number }[];
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

  return (
    <div className="hr-card flex flex-col p-5 animate-scale-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            {icon}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        {change && (
          <div className="text-sm text-green-600 font-medium">+{change}%</div>
        )}
      </div>

      <div className="flex items-center mt-2 space-x-3">
        <div className="h-16 w-16">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={15}
                outerRadius={30}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                animationDuration={1000}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center justify-between mb-1 last:mb-0">
              <div className="flex items-center">
                <div 
                  className="h-2.5 w-2.5 rounded-full mr-2" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-xs">{entry.name}</span>
              </div>
              <span className="text-xs font-medium">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
