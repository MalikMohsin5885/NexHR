
import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { talentData } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

const RecruitmentCard: React.FC = () => {
  return (
    <div className="hr-card col-span-1 flex flex-col animate-scale-in">
      <div className="border-b border-border/40 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Talent recruitment</h3>
          <button className="text-primary hover:underline text-sm flex items-center">
            View all <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="p-5 flex-1">
        <div className="flex justify-between mb-6">
          <div className="text-center">
            <div className="relative overflow-hidden rounded-lg h-16 w-16 mx-auto mb-2 bg-muted/30">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="QA Talent" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium">QA Talent</span>
          </div>

          <div className="text-center">
            <div className="relative overflow-hidden rounded-lg h-16 w-16 mx-auto mb-2 bg-muted/30">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" 
                alt="IQ Talent" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium">IQ Talent</span>
          </div>
        </div>

        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={talentData}
              barGap={4}
              barSize={8}
            >
              <XAxis 
                dataKey="label" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10 }} 
              />
              <Tooltip 
                formatter={(value) => [`${value}`, 'Candidates']}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                  padding: '8px 12px',
                }}
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              />
              <Bar 
                name="Matched" 
                dataKey="matched" 
                fill="#57d54e" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
              />
              <Bar 
                name="Not Matched" 
                dataKey="notMatched" 
                fill="#ff6b6b" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between mt-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-muted-foreground">Matched</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-400 mr-2"></div>
            <span className="text-xs text-muted-foreground">Not match</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentCard;
