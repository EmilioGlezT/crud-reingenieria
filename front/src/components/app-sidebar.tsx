import {
  BadgeDollarSign,
  CheckCircle2,
  Package,
  ShoppingCart,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

const items = [
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Sales",
    url: "/sales",
    icon: BadgeDollarSign,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: User,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: User,
  },
  {
    title: "Shop",
    url: "/shop",
    icon: ShoppingCart,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: CheckCircle2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>CRUD</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
