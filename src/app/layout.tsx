"use client"

import localFont from 'next/font/local'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const pageFont = localFont({ src: './fonts/Helvetica/Helvetica.ttf' })


export const metadata = {
  favicon: "/favicon.ico"
  // favicon: [
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '57x57',
  //     href: 'favicon/apple-icon-57x57.png',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '60x60',
  //     href: 'favicon/apple-icon-60x60.png',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '72x72',
  //     href: 'favicon/apple-icon-72x72.png',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '76x76',
  //     href: 'favicon/apple-icon-76x76.png',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '114x114',
  //     href: 'favicon/apple-icon-114x114.png',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '120x120',
  //     href: 'favicon/apple-icon-120x120.png',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '144x144',
  //     href: 'favicon/apple-icon-144x144.png',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '152x152',
  //     href: 'favicon/apple-icon-152x152.png',
  //   },
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '180x180',
  //     href: 'favicon/apple-icon-180x180.png',
  //   },
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '192x192',
  //     href: 'favicon/android-icon-192x192.png',
  //   },
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '32x32',
  //     href: 'favicon/favicon-32x32.png',
  //   },
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '96x96',
  //     href: 'favicon/favicon-96x96.png',
  //   },
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     sizes: '16x16',
  //     href: 'favicon/favicon-16x16.png',
  //   },
  //   {
  //     rel: 'manifest',
  //     href: 'favicon/manifest.json',
  //   },
  // ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap")
  })

  const pathname = usePathname()
  const navLinks = [
    { href: "/", name: "Home" },
    { href: "/about", name: "About" }
  ]

  const navItem = navLinks.map((link) => {
    const isActive = pathname === link.href

    return (
      <li className="nav-item me-3">

        <Link
          className={isActive ? "nav-link active" : "nav-link"}
          href={link.href}
          key={link.name}
        >
          {link.name}
        </Link>
      </li>
    )
  })
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={pageFont.className}>
        <header className="navbar navbar-expand-lg bg-body-tertiary mb-3">
          <ul className="navbar-nav my-1 ms-auto">
            {navItem}
          </ul>
        </header>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
