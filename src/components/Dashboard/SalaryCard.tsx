
import React from 'react';
import { salaryReviews } from '@/data/mockData';
import { Check, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const SalaryCard: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'done':
        return <Check className="h-3 w-3" />;
      case 'failed':
        return <X className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'done':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="hr-card col-span-1 row-span-2 flex flex-col animate-scale-in">
      <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-border/20">
        <h3 className="text-lg font-semibold mb-1">Salaries and incentive</h3>
        <p className="text-sm text-muted-foreground">Pay next month</p>
      </div>

      <div className="flex-1 overflow-hidden p-0">
        <div className="px-5 py-4 space-y-3 max-h-[250px] overflow-y-auto">
          {salaryReviews.map((review) => (
            <div key={review.id} className="flex items-center justify-between py-2 first:pt-0">
              <div className="flex items-center">
                <div className="relative h-9 w-9 rounded-full overflow-hidden mr-3">
                  <img
                    src={review.avatar}
                    alt={review.employeeName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight">{review.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(review.amount)} · {review.date}</p>
                </div>
              </div>
              <div className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium flex items-center",
                getStatusColor(review.status)
              )}>
                {getStatusIcon(review.status)}
                <span className="ml-1 capitalize">{review.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/30 p-4 mt-auto">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors rounded-md py-2 text-center text-xs font-medium">
              Basic salary
            </button>
            <button className="bg-muted text-muted-foreground hover:bg-muted/80 transition-colors rounded-md py-2 text-center text-xs font-medium">
              Perform
            </button>
            <button className="bg-muted text-muted-foreground hover:bg-muted/80 transition-colors rounded-md py-2 text-center text-xs font-medium">
              Gift
            </button>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Payment</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">100%</span>
              <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                <Check className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex -space-x-1.5">
                <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  $
                </div>
                <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  +
                </div>
              </div>
              <div className="ml-2 flex flex-col">
                <span className="text-xs text-muted-foreground">Take home pay</span>
                <span className="text-sm font-bold">{formatCurrency(2540)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCard;
