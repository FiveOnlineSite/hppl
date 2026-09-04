"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const links = ["Home", "About Us", "Brands", "ESC", "Media & News", "Careers", "Channel Partners", "Contact"];
const channelPartnerLinks = [
  { label: "Distributors", href: "/distributor" },
  { label: "Super Stockist", href: "/super-stockist" },
  { label: "Export", href: "/export" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);

  return (
    <header className="w-full border-b border-slate-200 bg-white xl:relative">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-3 xl:h-auto xl:px-6 xl:py-4">
        <Link href="/" aria-label="Hindustan Pencils home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Hindustan Pencils"
            width={1536}
            height={382}
            priority
            className="h-auto w-32 xl:w-48"
          />
        </Link>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex h-7 w-7 items-center justify-center text-[#314446] xl:hidden"
        >
          {isMenuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>

        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex items-center gap-6 text-sm">
            {links.map((label) => (
              <li key={label} className={label === "Channel Partners" ? "group relative" : undefined}>
                {label === "Channel Partners" ? (
                  <>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isPartnersOpen}
                      onClick={() => setIsPartnersOpen((current) => !current)}
                      className="flex items-center gap-1 rounded border border-red-500 px-4 py-2 font-medium text-red-600"
                    >
                      {label}
                      <ChevronDown size={15} className="transition-transform group-hover:rotate-180" />
                    </button>
                    <ul className={`absolute right-0 top-full z-50 min-w-48 pt-2 ${isPartnersOpen ? "block" : "hidden group-hover:block group-focus-within:block"}`}>
                      <li className="overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg">
                        {channelPartnerLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsPartnersOpen(false)}
                            className="block whitespace-nowrap px-4 py-2.5 text-gray-700 transition hover:bg-slate-50 hover:text-red-600"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link href="#" className="text-gray-700 transition hover:text-red-600">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isMenuOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-slate-300 xl:hidden bg-white w-full">
          <ul>
            {links.map((label) => (
              <li key={label} className="border-b border-slate-300 last:border-b-0">
                {label === "Channel Partners" ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={isPartnersOpen}
                      onClick={() => setIsPartnersOpen((current) => !current)}
                      className="flex w-full items-center justify-center gap-1 py-2 text-[11px] leading-none text-[#202b2c] transition hover:bg-slate-50"
                    >
                      {label}
                      <ChevronDown size={13} className={isPartnersOpen ? "rotate-180" : undefined} />
                    </button>
                    {isPartnersOpen ? (
                      <ul className="border-t border-slate-200 bg-slate-50">
                        {channelPartnerLinks.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => {
                                setIsPartnersOpen(false);
                                setIsMenuOpen(false);
                              }}
                              className="block py-2 text-center text-[11px] text-slate-600 hover:text-red-600"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-center text-[11px] leading-none transition hover:bg-slate-50 ${
                      label === "Home" ? "text-[#c8242f]" : "text-[#202b2c]"
                    }`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
