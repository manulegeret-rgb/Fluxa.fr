import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DemoSidebar from "./DemoSidebar";
import { Sparkles } from "lucide-react";
import HomeLogoOverlay from "@/components/HomeLogoOverlay";

// ✅ On importe les variables du thème démo (fichier qu'on vient de créer)
import "@/styles/demo-vars.css";

const DemoLayout = () => {
  return (
    // ✅ On applique le thème ici : "demo-scope dark"
    <div className="demo-scope dark min-h-screen bg-background text-foreground">
      {/* ⬇️ LOGO FLUXA CLIQUABLE */}
      <HomeLogoOverlay
        logoSrc="/logo transparent.png"
        href="https://fluxa.fr"
        size={110}
        topInsteadOfCenter={true}
        hideOnDesktop={false}
      />
      {/* ⬆️ FIN AJOUT */}

      <SidebarProvider>
        <div className="flex w-full">
          <DemoSidebar />

          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center px-6 gap-4 shadow-sm sticky top-0 z-10">
              <SidebarTrigger />
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                    <span className="text-primary-foreground font-bold text-xl">F</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-foreground">Fluxa</span>
                      <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        DEMO
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">Interface de démonstration</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-background">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DemoLayout