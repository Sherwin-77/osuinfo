"use client"

import localFont from 'next/font/local'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import "./styles.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'next/image'

const pageFont = localFont({ src: './fonts/Helvetica/Helvetica.ttf' })

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname()
  const navLinks = [
    { href: "/", name: "Home" },
    { href: "/about", name: "About" }
  ]

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const navItem = navLinks.map((link) => {
    const isActive = pathname === link.href
    return (
      <li className="nav-item me-3 center border-bottom" key={link.name}>
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
        <header className="mb-3">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <a className="navbar-brand" href="/">
              <Image className="mx-3" src="osu!.svg" width={50} height={50} alt="Logo" />
              <span className="text-muted">Rythm is not click away</span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav my-1 ms-auto">
                {navItem}
              </ul>
            </div>
          </nav>
        </header>
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}

