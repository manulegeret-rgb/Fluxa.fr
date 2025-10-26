import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import KPICard from "@/components/demo/KPICard";
import { TrendingUp, Users, Calendar, AlertCircle, Activity, ArrowUpRight, Zap } from "lucide-react";
import { mockKPIs, mockRevenueData, mockAppointments } from "@/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const upcomingAppointments = mockAppointments
    .filter((apt) => new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const statusData = [
    { name: "Confirmés", value: mockAppointments.filter((a) => a.status === "confirmé").length, color: "hsl(var(--success))" },
    { name: "En attente", value: mockAppointments.filter((a) => a.status === "en attente").length, color: "hsl(var(--warning))" },
    { name: "Terminés", value: mockAppointments.filter((a) => a.status === "terminé").length, color: "hsl(var(--primary))" },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Tableau de bord</h1>
          <p className="text-muted-foreground text-lg">
            Vue d'ensemble de votre activité en temps réel
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 gap-2 shadow-glow">
          <Zap className="w-4 h-4" />
          Actions rapides
        </Button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <KPICard
          title="CA cette semaine"
          value={`${mockKPIs.weekRevenue}€`}
          icon={TrendingUp}
          trend={{ value: "+12% vs semaine dernière", positive: true }}
        />
        <KPICard
          title="Nouveaux clients"
          value={mockKPIs.newClients}
          icon={Users}
          trend={{ value: "+3 ce mois", positive: true }}
        />
        <KPICard
          title="RDV confirmés"
          value={mockKPIs.confirmedAppointments}
          icon={Calendar}
        />
        <KPICard
          title="Impayés"
          value={`${mockKPIs.unpaid}€`}
          icon={AlertCircle}
          className="border-warning/20"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-6 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                Évolution du chiffre d'affaires
              </h3>
              <p className="text-sm text-muted-foreground">
                Performance hebdomadaire • 7 derniers jours
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              Voir détails
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockRevenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-card)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
                fill="url(#colorRevenue)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Status Pie Chart */}
        <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-1">
              Statut des RDV
            </h3>
            <p className="text-sm text-muted-foreground">Répartition actuelle</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-1">
              Prochains RDV
            </h3>
            <p className="text-sm text-muted-foreground">À venir cette semaine</p>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-3 bg-background/50 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-foreground text-sm">{apt.clientName}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(apt.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{apt.service}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary">{apt.time}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      apt.status === "confirmé"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium">Taux de présence</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold text-foreground">{mockKPIs.attendanceRate}%</p>
                <span className="text-xs text-success font-medium">+2%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium">RDV cette semaine</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold text-foreground">12</p>
                <span className="text-xs text-muted-foreground">sur 14 créneaux</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-warning/20 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle className="w-7 h-7 text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium">Factures en attente</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-3xl font-bold text-foreground">3</p>
                <span className="text-xs text-warning font-medium">Relancer</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
