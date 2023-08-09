"use client"

import localFont from 'next/font/local'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const pageFont = localFont({ src: './fonts/Helvetica/Helvetica.ttf' })

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
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
      <li className="nav-item me-3" key={link.name}>
        <Link
          className={isActive ? "nav-link active" : "nav-link"}
          href={link.href}
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
