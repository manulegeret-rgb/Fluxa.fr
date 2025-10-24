import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockClients, mockAppointments, mockInvoices, mockMessages, Client } from "@/data/mockData";
import { Eye, Phone, Mail, Search, UserPlus, TrendingUp, Users, Star } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Clients = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockClients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Client["status"]) => {
    const variants = {
      prospect: "bg-muted text-muted-foreground border-border",
      client: "bg-primary/10 text-primary border-primary/20",
      fidèle: "bg-gradient-success text-success-foreground border-success/20",
    };
    return variants[status];
  };

  const clientAppointments = selectedClient
    ? mockAppointments.filter((a) => a.clientId === selectedClient.id)
    : [];
  const clientInvoices = selectedClient
    ? mockInvoices.filter((i) => i.clientId === selectedClient.id)
    : [];
  const clientMessages = selectedClient
    ? mockMessages.filter((m) => m.clientId === selectedClient.id)
    : [];

  const stats = {
    total: mockClients.length,
    fideles: mockClients.filter((c) => c.status === "fidèle").length,
    nouveaux: mockClients.filter((c) => c.status === "prospect").length,
    croissance: "+8%",
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Gestion clients</h1>
          <p className="text-muted-foreground text-lg">
            Base clients complète avec historique détaillé
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 gap-2 shadow-glow">
          <UserPlus className="w-4 h-4" />
          Nouveau client
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Total clients</p>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-success border-success/20 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-success-foreground/80 mb-1 font-medium">Clients fidèles</p>
              <p className="text-3xl font-bold text-success-foreground">{stats.fideles}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success-foreground/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 text-success-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Nouveaux ce mois</p>
              <p className="text-3xl font-bold text-foreground">{stats.nouveaux}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserPlus className="w-6 h-6 text-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Croissance</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-foreground">{stats.croissance}</p>
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 bg-gradient-card border-border shadow-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un client par nom, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 border-border bg-background"
          />
        </div>
      </Card>

      {/* Clients Table */}
      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Client</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Contact</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Statut</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Dernier RDV</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">Impayés</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-border hover:bg-background/50 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="font-semibold text-primary">
                          {client.firstName[0]}{client.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {client.firstName} {client.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Client depuis {new Date(client.createdAt).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1.5 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[200px]">{client.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={`${getStatusBadge(client.status)} border font-medium`}>
                      {client.status === "fidèle" && <Star className="w-3 h-3 mr-1" />}
                      {client.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {client.lastAppointment
                      ? new Date(client.lastAppointment).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {client.unpaidBalance > 0 ? (
                      <span className="text-warning font-semibold text-base">{client.unpaidBalance}€</span>
                    ) : (
                      <span className="text-success font-medium text-sm">✓ À jour</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedClient(client)}
                      className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Voir fiche
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Client Detail Sheet */}
      <Sheet open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-3xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-bold text-primary text-lg">
                  {selectedClient?.firstName[0]}{selectedClient?.lastName[0]}
                </span>
              </div>
              {selectedClient?.firstName} {selectedClient?.lastName}
            </SheetTitle>
          </SheetHeader>

          {selectedClient && (
            <div className="mt-8 space-y-6">
              {/* Contact Info */}
              <Card className="p-5 bg-gradient-card border-border shadow-sm">
                <h3 className="font-semibold mb-4 text-foreground text-lg flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Informations de contact
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{selectedClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg">
                    <span className="text-muted-foreground font-medium">Statut:</span>
                    <Badge className={`${getStatusBadge(selectedClient.status)} border`}>
                      {selectedClient.status === "fidèle" && <Star className="w-3 h-3 mr-1" />}
                      {selectedClient.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg">
                    <span className="text-muted-foreground font-medium">Solde impayé:</span>
                    <span className={selectedClient.unpaidBalance > 0 ? "text-warning font-semibold" : "text-success font-medium"}>
                      {selectedClient.unpaidBalance > 0 ? `${selectedClient.unpaidBalance}€` : "Aucun"}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold mb-4 text-foreground text-xl">Historique complet</h3>
                <div className="space-y-4">
                  {/* Appointments */}
                  {clientAppointments.length > 0 && (
                    <Card className="p-5 bg-gradient-card border-border shadow-sm">
                      <h4 className="text-base font-semibold mb-3 text-foreground flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{clientAppointments.length}</span>
                        </div>
                        Rendez-vous
                      </h4>
                      <div className="space-y-2">
                        {clientAppointments.map((apt) => (
                          <div
                            key={apt.id}
                            className="text-sm p-3 bg-background/50 rounded-lg border border-border hover:border-primary/30 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <p className="font-semibold text-foreground">{apt.service}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(apt.date).toLocaleDateString("fr-FR", { 
                                    weekday: "long", 
                                    day: "2-digit", 
                                    month: "long" 
                                  })} à {apt.time}
                                </p>
                              </div>
                              <Badge
                                className={`${
                                  apt.status === "confirmé"
                                    ? "bg-success/10 text-success border-success/20"
                                    : apt.status === "terminé"
                                    ? "bg-primary/10 text-primary border-primary/20"
                                    : "bg-warning/10 text-warning border-warning/20"
                                } border`}
                              >
                                {apt.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Montant</span>
                              <span className="text-sm font-semibold text-foreground">{apt.price}€</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Invoices */}
                  {clientInvoices.length > 0 && (
                    <Card className="p-5 bg-gradient-card border-border shadow-sm">
                      <h4 className="text-base font-semibold mb-3 text-foreground flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{clientInvoices.length}</span>
                        </div>
                        Factures
                      </h4>
                      <div className="space-y-2">
                        {clientInvoices.map((inv) => (
                          <div
                            key={inv.id}
                            className="text-sm p-3 bg-background/50 rounded-lg border border-border hover:border-primary/30 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-semibold text-foreground">{inv.number}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Émise le {new Date(inv.date).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-foreground text-base">{inv.amount}€</p>
                                <Badge
                                  className={`mt-1 ${
                                    inv.status === "payé"
                                      ? "bg-success/10 text-success border-success/20"
                                      : inv.status === "en retard"
                                      ? "bg-destructive/10 text-destructive border-destructive/20"
                                      : "bg-warning/10 text-warning border-warning/20"
                                  } border`}
                                >
                                  {inv.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Messages */}
                  {clientMessages.length > 0 && (
                    <Card className="p-5 bg-gradient-card border-border shadow-sm">
                      <h4 className="text-base font-semibold mb-3 text-foreground flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{clientMessages.length}</span>
                        </div>
                        Messages récents
                      </h4>
                      <div className="space-y-2">
                        {clientMessages.slice(0, 4).map((msg) => (
                          <div
                            key={msg.id}
                            className="text-sm p-3 bg-background/50 rounded-lg border border-border"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="outline" className="text-xs font-medium">
                                {msg.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(msg.date).toLocaleDateString("fr-FR", { 
                                  day: "2-digit", 
                                  month: "short" 
                                })}
                              </span>
                            </div>
                            {msg.subject && (
                              <p className="text-xs font-medium text-foreground mb-1">{msg.subject}</p>
                            )}
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {msg.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Clients;
