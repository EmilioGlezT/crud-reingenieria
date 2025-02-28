import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "./theme-provider";
import "@/components/css/main-layout.css";

export default function MainLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <main className="bg-background text-foreground">
        </main>
        <ModeToggle />
      </SidebarProvider>
    </ThemeProvider>
  );
}
