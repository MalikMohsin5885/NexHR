
import React from 'react';
import { Phone, Mail, BarChart2 } from 'lucide-react';
import { employees } from '@/data/mockData';

const EmployeeCard: React.FC = () => {
  const employee = employees[0]; // Using Chris Jonathan from mock data

  return (
    <div className="hr-card col-span-1 row-span-2 overflow-hidden flex flex-col animate-scale-in h-full">
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-cyan-500/40 to-blue-500/40">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="h-full w-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-4 left-4 rounded-lg bg-black/20 backdrop-blur-sm px-3 py-1 text-white text-sm font-medium">
          <span>6+ years experience</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">{employee.name}</h3>
          <p className="text-muted-foreground text-sm">{employee.position}</p>
        </div>

        <div className="flex space-x-3 justify-center mb-6">
          <button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors p-2">
            <Phone className="h-5 w-5" />
          </button>
          <button className="rounded-full bg-muted hover:bg-muted/80 transition-colors p-2">
            <Mail className="h-5 w-5" />
          </button>
        </div>

        <div className="border-t border-border/40 pt-4 mt-auto flex-1 flex flex-col justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Average work time</div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">46 hours</span>
              <span className="ml-2 text-xs font-medium text-green-600">+0.5%</span>
            </div>

            <div className="mt-4 h-20">
              <div className="flex items-end justify-between h-full">
                {[4, 6, 8, 7, 6, 9, 8].map((value, i) => (
                  <div 
                    key={i} 
                    className="w-1/12 bg-blue-400/80 rounded-t"
                    style={{ height: `${value * 10}%` }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
              <span>4 h</span>
              <span>9 h</span>
            </div>
          </div>

          <div className="flex items-center text-xs text-muted-foreground mt-6 justify-center">
            <BarChart2 className="h-3 w-3 mr-1" />
            <span>Work and hours include extra hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
