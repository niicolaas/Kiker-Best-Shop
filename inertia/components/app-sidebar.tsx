import { ShoppingBagIcon, Home, Settings, Search, ShoppingCart } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

// Itens do Menu
const items = [
  { title: 'Painel', url: '#', icon: Home },
  { title: 'Meu carrinho', url: '#', icon: ShoppingCart },
  { title: 'Produtos', url: '#', icon: ShoppingBagIcon },
  { title: 'Logs de Busca Vetorial', url: '#', icon: Search },
  { title: 'Configurações de IA', url: '#', icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">KIKER</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="mt-10" key={item.title}>
                  <SidebarMenuButton className="h-15 text-lg" asChild>
                    <a href={item.url}>
                      <item.icon className="" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
