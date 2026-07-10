import Image from "next/image";
import Link from "next/link";
import { contactInfo, footerLinkColumns, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={160}
              height={44}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">{siteConfig.description}</p>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-emerald-700 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8h-4V9z" />
              </svg>
            </a>
          </div>

          {footerLinkColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-500 transition hover:text-emerald-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">Contact</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-slate-500">
              <p>{contactInfo.address}</p>
              {contactInfo.phones.map((phone) => (
                <p key={phone}>{phone}</p>
              ))}
              <p>Toll Free: {contactInfo.tollFree}</p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.name} All rights reserved.</p>
          <Link href="/privacy-policy" className="hover:text-emerald-700">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
