import CacheProvider from "./cache-context"
import ClientRootLayout from "./rootlayout"

export const metadata = {
  title: "osu! Info",
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
