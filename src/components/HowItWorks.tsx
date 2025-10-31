// src/components/HowItWorks.tsx
import { Calendar, Layout, Wrench, Rocket } from "lucide-react";

export default function HowItWorks() {
  const STEPS = [
    {
      icon: Calendar,
      title: "1. Contact par mail",
      desc: "Vous nous contactez par mail pour nous expliquer votre projet et vos besoins.",
    },
    {
      icon: Layout,
      title: "2. Formulaire de brief détaillé",
      desc: "Nous vous envoyons un formulaire pour préciser vos attentes, vos contraintes et vos objectifs.",
    },
    {
      icon: Wrench,
      title: "3. Création de maquettes ensemble",
      desc: "Nous créons les maquettes de votre site en collaboration avec vous jusqu'à validation complète.",
    },
    {
      icon: Rocket,
      title: "4. Développement & mise en ligne",
      desc: "Une fois les maquettes validées, développement et déploiement de votre site vitrine professionnel.",
    },
  ];

  return (
    <section id="process" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-center text-4xl lg:text-5xl font-bold mb-12">
          Comment ça marche ?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 flex gap-4 items-start">
              <s.icon className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border bg-primary text-primary-foreground">
            Discuter de mon projet
          </a>
        </div>
      </div>
    </section>
  );
}