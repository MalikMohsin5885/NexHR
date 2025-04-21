
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  variant = 'default',
  subtitle,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-500/10 text-green-700';
      case 'warning':
        return 'bg-amber-500/10 text-amber-700';
      case 'info':
        return 'bg-blue-500/10 text-blue-700';
      default:
        return 'bg-background text-muted-foreground';
    }
  };

  return (
    <div className="hr-card p-5 hover:-translate-y-1 animate-scale-in">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && (
            <div className={cn('rounded-full p-2', getVariantClasses())}>
              {icon}
            </div>
          )}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {typeof change !== 'undefined' && (
            <div
              className={cn(
                'flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium',
                change >= 0
                  ? 'text-green-600 bg-green-100'
                  : 'text-red-600 bg-red-100'
              )}
            >
              {change >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
