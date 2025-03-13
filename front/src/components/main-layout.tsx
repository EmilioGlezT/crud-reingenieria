import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "./theme-provider";
import { Outlet } from "react-router-dom"; // 👈 Importa Outlet
import "@/components/css/main-layout.css";

export default function MainLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="bg-background text-foreground p-4">
          <Outlet /> {/* ✅ Aquí se renderizará Home.tsx */}
        </main>
        <ModeToggle />
      </SidebarProvider>
    </ThemeProvider>
  );
}
