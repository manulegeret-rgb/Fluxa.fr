import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockInvoices, Invoice } from "@/data/mockData";
import { FileText, CheckCircle, Download, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Factures = () => {
  const [invoices, setInvoices] = useState(mockInvoices);

  const handleSimulatePayment = (invoice: Invoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoice.id ? { ...inv, status: "payé" } : inv))
    );
    toast.success(
      <div className="flex flex-col gap-1">
        <span className="font-semibold">✓ Paiement simulé</span>
        <span className="text-xs text-muted-foreground">Facture {invoice.number} marquée payée</span>
      </div>,
      { duration: 3000 }
    );
  };

  const getStatusBadge = (status: Invoice["status"]) => {
    const variants = {
      payé: "bg-success/10 text-success border-success/20",
      "en attente": "bg-warning/10 text-warning border-warning/20",
      "en retard": "bg-destructive/10 text-destructive border-destructive/20",
    };
    return variants[status];
  };

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: invoices.filter((inv) => inv.status === "payé").length,
    pending: invoices.filter((inv) => inv.status !== "payé").length,
    unpaid: invoices.filter((inv) => inv.status !== "payé").reduce((sum, inv) => sum + inv.amount, 0),
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Facturation</h1>
          <p className="text-muted-foreground text-lg">Gérez vos factures et paiements en temps réel</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 gap-2 shadow-glow">
          <FileText className="w-4 h-4" />
          Nouvelle facture
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Total facturé</p>
              <p className="text-3xl font-bold text-foreground">{stats.total}€</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-success border-success/20 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-success-foreground/80 mb-1 font-medium">Payées</p>
              <p className="text-3xl font-bold text-success-foreground">{stats.paid}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-success-foreground/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-success-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-warning/20 shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">En attente</p>
              <p className="text-3xl font-bold text-warning">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-border shadow-card hover:shadow-card-hover transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1 font-medium">Impayés</p>
              <p className="text-3xl font-bold text-foreground">{stats.unpaid}€</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-card border-border shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Numéro</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Client</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Date</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Échéance</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">Montant</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-foreground">Statut</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={invoice.id} className="border-b border-border hover:bg-background/50 transition-colors group animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{invoice.number}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-foreground font-medium">{invoice.clientName}</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {new Date(invoice.dueDate).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-foreground text-base">{invoice.amount}€</td>
                  <td className="py-4 px-4 text-center">
                    <Badge className={`${getStatusBadge(invoice.status)} border font-medium`}>{invoice.status}</Badge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {invoice.status !== "payé" ? (
                        <Button size="sm" variant="outline" onClick={() => handleSimulatePayment(invoice)} className="gap-1 hover:bg-success hover:text-success-foreground hover:border-success transition-colors">
                          <CheckCircle className="w-4 h-4" />
                          Simuler paiement
                        </Button>
                      ) : (
                        <>
                          <span className="text-sm text-success flex items-center gap-1 font-medium">
                            <CheckCircle className="w-4 h-4" />
                            Payée
                          </span>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Download className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 border-primary/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2 text-lg">Génération automatique de factures</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fluxa génère automatiquement vos factures dès validation du paiement. Format PDF conforme avec 
              numérotation automatique, mentions légales et envoi par email au client. Simulez un paiement pour 
              voir la magie opérer !
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Factures;
