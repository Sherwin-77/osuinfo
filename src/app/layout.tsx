import CacheProvider from "./cache-context"
import ClientRootLayout from "./rootlayout"

export const metadata = {
  title: {
    template: "%s - osu! Info",
    default: "osu! Info"
  },
  favicon: "/favicon.ico",
  description: "Site for osu! information is here"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ClientRootLayout>
        {children}
      </ClientRootLayout>
    </CacheProvider>
  )
}
