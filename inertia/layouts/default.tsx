import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const page = usePage()

  useEffect(() => {
    toast.dismiss()
  }, [page.url])

  if (children.props.flash.error) {
    toast.error(children.props.flash.error)
  }

  const isHome = page.component === 'home'

  if (isHome) {
    return (
      <>
        <main className="min-h-screen bg-slate-50">
          {children}
        </main>
        <Toaster position="top-center" richColors />
      </>
    )
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="min-h-screen">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
      <Toaster position="top-center" richColors />
    </>
  )
}

