import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const KPICard = ({ title, value, icon: Icon, trend, className }: KPICardProps) => {
  return (
    <Card className={cn("p-6 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all duration-200", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn("text-xs mt-2", trend.positive ? "text-success" : "text-destructive")}>
              {trend.value}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

export default KPICard;
