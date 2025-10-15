import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  className?: string;
}

export const PricingCard = ({ title, price, features, className }: PricingCardProps) => {
  return (
    <Card
      className={`p-8 bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_40px_hsl(217,91%,60%,0.3)] hover:-translate-y-2 ${className || ""}`}
    >
      <div className="space-y-6">
        {/* Titre + Prix */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">
            {price}
          </p>
        </div>

        {/* Liste des features — alignement icône/texte nickel */}
        <ul className="space-y-3 text-muted-foreground md:min-h-[200px] max-md:w-fit max-md:mx-auto">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
            >
              {/* Puce */}
              <span className="text-primary mt-[2px] shrink-0 leading-none">✓</span>
              {/* Texte */}
              <span className="text-sm leading-tight">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button asChild variant="pricing" className="w-full" size="lg">
          <a href="#infos">Obtenir un devis personnalisé</a>
        </Button>
      </div>
    </Card>
  );
};