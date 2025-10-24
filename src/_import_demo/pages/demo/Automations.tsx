import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAutomations, Automation } from "@/data/mockData";
import { Clock, Send, Zap, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Automations = () => {
  const [automations, setAutomations] = useState(mockAutomations);

  const handleToggle = (id: string) => {
    setAutomations((prev) =>
      prev.map((auto) =>
        auto.id === id ? { ...auto, enabled: !auto.enabled } : auto
      )
    );
  };

  const handleTest = (automation: Automation) => {
    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-semibold">✓ Message simulé envoyé</span>
        <span className="text-xs text-muted-foreground">{automation.name}</span>
      </div>,
      { duration: 3000 }
    );
  };

  const stats = {
    active: automations.filter((a) => a.enabled).length,
    total: automations.length,
    sent: 247,
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Automatisations</h1>
          <p className="text-muted-foreground text-lg">
            Configurez vos scénarios pour automatiser votre communication
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Scénarios actifs</p>
              <p className="text-3xl font-bold text-foreground">{stats.active}/{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-primary border-primary/20 shadow-glow hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-foreground/80 mb-1 font-medium">Messages envoyés</p>
              <p className="text-3xl font-bold text-primary-foreground">{stats.sent}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Send className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Gain de temps</p>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-bold text-foreground">12h</p>
                <span className="text-sm text-muted-foreground">/semaine</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {automations.map((automation, index) => (
          <Card
            key={automation.id}
            className="p-6 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${automation.enabled ? 'bg-primary/10' : 'bg-muted'} group-hover:scale-110 transition-transform`}>
                      <Zap className={`w-5 h-5 ${automation.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{automation.name}</h3>
                      <p className="text-sm text-muted-foreground">{automation.description}</p>
                    </div>
                  </div>
                </div>
                <Switch checked={automation.enabled} onCheckedChange={() => handleToggle(automation.id)} className="ml-3" />
              </div>

              <div className="p-4 bg-muted/30 rounded-xl border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Template de message</p>
                <p className="text-sm text-foreground italic leading-relaxed">"{automation.template}"</p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{automation.trigger}</span>
                </div>
                <Badge variant="outline" className="font-medium">{automation.timing}</Badge>
              </div>

              <Button
                size="sm"
                variant={automation.enabled ? "default" : "outline"}
                onClick={() => handleTest(automation)}
                disabled={!automation.enabled}
                className="w-full gap-2"
              >
                <Send className="w-4 h-4" />
                Tester le scénario
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2 text-lg">Mode démonstration</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Les messages ne sont pas réellement envoyés en mode démo. Cliquez sur "Tester" pour simuler l'envoi 
              et visualiser l'aperçu dans le fil client. En production, ces scénarios s'exécutent automatiquement 
              selon les déclencheurs configurés.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Automations;
