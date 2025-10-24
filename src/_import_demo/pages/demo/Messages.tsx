import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockMessages } from "@/data/mockData";
import { Search, Mail, MessageSquare, Filter, Download, TrendingUp, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredMessages = mockMessages.filter((msg) => {
    const matchesSearch =
      msg.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || msg.type === typeFilter;
    const matchesStatus = statusFilter === "all" || msg.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      envoyé: "bg-primary/10 text-primary border-primary/20",
      délivré: "bg-success/10 text-success border-success/20",
      lu: "bg-muted text-muted-foreground border-border",
      échoué: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return variants[status] || "bg-muted text-muted-foreground";
  };

  const stats = {
    total: mockMessages.length,
    sms: mockMessages.filter((m) => m.type === "SMS" && m.direction === "sortant").length,
    emails: mockMessages.filter((m) => m.type === "Email" && m.direction === "sortant").length,
    deliveryRate: Math.round(
      (mockMessages.filter((m) => m.status === "délivré" || m.status === "lu").length /
        mockMessages.length) *
        100
    ),
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Centre de messages</h1>
          <p className="text-muted-foreground text-lg">
            Historique complet de vos communications SMS et email
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exporter
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Total messages</p>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">SMS envoyés</p>
              <p className="text-3xl font-bold text-primary">{stats.sms}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Emails envoyés</p>
              <p className="text-3xl font-bold text-foreground">{stats.emails}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-success border-success/20 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-success-foreground/80 mb-1 font-medium">Taux de délivrance</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-success-foreground">{stats.deliveryRate}%</p>
                <TrendingUp className="w-4 h-4 text-success-foreground/80" />
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success-foreground/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6 text-success-foreground" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un client ou un message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 border-border bg-background"
            />
          </div>

          <div className="flex gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 h-11 border-border">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="SMS">SMS uniquement</SelectItem>
                <SelectItem value="Email">Email uniquement</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 h-11 border-border">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Statut" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="envoyé">Envoyé</SelectItem>
                <SelectItem value="délivré">Délivré</SelectItem>
                <SelectItem value="lu">Lu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Messages List */}
      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Aucun message trouvé</p>
            </div>
          ) : (
            filteredMessages.map((message, index) => (
              <div
                key={message.id}
                className="p-5 bg-background/50 rounded-xl hover:bg-background transition-all border border-border hover:border-primary/20 hover:shadow-sm group animate-fade-in"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        message.type === "SMS"
                          ? "bg-primary/10 group-hover:bg-primary/20"
                          : "bg-secondary group-hover:bg-secondary/80"
                      } transition-colors`}
                    >
                      {message.type === "SMS" ? (
                        <MessageSquare className="w-5 h-5 text-primary" />
                      ) : (
                        <Mail className="w-5 h-5 text-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        {message.clientName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs font-medium">
                          {message.type}
                        </Badge>
                        <Badge className={`${getStatusBadge(message.status)} border text-xs`}>
                          {message.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span className="font-medium">
                            {message.direction === "sortant" ? "→ Sortant" : "← Entrant"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                    {new Date(message.date).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {message.subject && (
                  <p className="text-sm font-semibold text-foreground mb-2 pl-14">
                    {message.subject}
                  </p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed pl-14">
                  {message.content}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Info Banner */}
      <Card className="p-5 bg-primary/5 border-primary/20 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1 text-base">
              Historique en temps réel
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tous vos messages sont centralisés ici : SMS de rappel, relances factures, emails de confirmation. 
              Suivez en temps réel le statut de chaque communication (envoyé, délivré, lu).
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;
