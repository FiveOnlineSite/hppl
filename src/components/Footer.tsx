import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa6";

const importantLinks = [
  { label: "About Us", href: "https://hindustanpencils.com/about-us" },
  { label: "Our Brands", href: "https://hindustanpencils.com/our-brands" },
  { label: "ESG", href: "https://hindustanpencils.com/esg" },
  { label: "Media & News", href: "https://hindustanpencils.com/media-news" },
  { label: "Careers", href: "https://hppl-career.fiveonline.in/" },
  { label: "Distributors", href: "/" },
  { label: "Super Stockist", href: "/" },
  { label: "Export", href: "https://hppl-export.fiveonline.in/" },

];

const brandLinks = [
  { label: "Nataraj" },
  { label: "Apsara" },
  { label: "Nataraj Global" },
];

const otherLinks = [
  { label: "Privacy Policy", href: "https://hindustanpencils.com/privacy-policy" },
  { label: "POSH Policy", href: "https://hindustanpencils.com/posh-policy" },
  { label: "Whistleblower Policy", href: "https://hindustanpencils.com/whistleblower-policy" },
  { label: "Code of Conduct", href: "https://hindustanpencils.com/code-of-conduct" },
];

const linkClass = "text-sm text-black";

export default function Footer() {
  return (
    <footer className="w-full bg-[#e9e9e7]">
      {/* Mobile layout (below md) */}
      <div className="px-6 py-10 md:hidden pb-18">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Important Links</h3>
            <ul className="mt-3 space-y-2">
              {importantLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">Our Brands</h3>
            <ul className="mt-3 space-y-2">
              {brandLinks.map((link) => (
                <li key={link.label}>
                  <p className={linkClass}>
                    {link.label}
                  </p>
                </li>
              ))}
            </ul>

            <h3 className="mt-5 text-base font-bold text-slate-900">Other Links</h3>
            <ul className="mt-3 space-y-2">
              {otherLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-400" />
          <h3 className="text-sm font-bold text-slate-900">Contact Us</h3>
          <span className="h-px flex-1 bg-slate-400" />
        </div>

        <div className="space-y-4 text-center text-sm text-slate-800">
          <div>
            <p className="font-bold">Registered Office:</p>
            <p>510, Himalaya House, 79,</p>
            <p>Palton Road, Mumbai – 400 001</p>
          </div>
          <div>
            <p className="font-bold">Tel:</p>
            <p>
              <a href="tel:+912222614505" className="hover:text-[#E11F28]">
                +91 22 2261 4505/06/07
              </a>
            </p>
            <p>
              <a href="tel:+919324325642" className="hover:text-[#E11F28]">
                +91 93243 25642
              </a>
            </p>
          </div>
          <div>
            <p className="font-bold">Toll Free:</p>
            <p>
              <a href="tel:1800222621" className="hover:text-[#E11F28]">
                1800 222 621
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-sm font-bold text-slate-900">Follow us on</h3>
          <a
            href="https://www.linkedin.com/company/hindustan-pencils-private-limited"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hindustan Pencils on LinkedIn"
            className="mx-auto mt-3 flex h-9 w-9 items-center justify-center rounded border border-[#1a56a4] text-[#1a56a4] transition hover:bg-[#1a56a4] hover:text-white"
          >
            <FaLinkedinIn size={18} aria-hidden="true" />
          </a>
        </div>

        <div className="my-7 h-px bg-slate-400" />

<div className="justify-center items-center flex">
        <Image src="/images/logo.png" alt="Hindustan Pencils" width={1536} height={382} className="h-auto w-[60%]" />

</div>
      </div>

      {/* Tablet layout (md to just below xl) */}
      <div className="hidden px-8 py-12 md:block xl:hidden pb-18">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-base font-bold text-slate-900">Follow us on</h3>
            <a
              href="https://www.linkedin.com/company/hindustan-pencils-private-limited"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hindustan Pencils on LinkedIn"
              className="mt-3 flex h-9 w-9 items-center justify-center rounded border border-[#1a56a4] text-[#1a56a4] transition hover:bg-[#1a56a4] hover:text-white"
            >
              <FaLinkedinIn size={18} aria-hidden="true" />
            </a>

            <div className="mt-5">

        <Image src="/images/logo.png" alt="Hindustan Pencils" width={1536} height={382} className="h-auto w-[60%]" />
          </div>
          </div>


          <div>
            <h3 className="text-base font-bold text-slate-900">Important Links</h3>
            <ul className="mt-3 space-y-2">
              {importantLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">Contact Us</h3>
            <div className="mt-3 space-y-4 text-sm text-slate-800">
              <div>
                <p className="font-bold">Registered Office:</p>
                <p>510, Himalaya House, 79,</p>
                <p>Palton Road, Mumbai – 400 001</p>
              </div>
              <div>
                <p className="font-bold">Tel:</p>
                <p>
                  <a href="tel:+912222614505" className="hover:text-[#E11F28]">
                    +91 22 2261 4505/06/07
                  </a>
                </p>
                <p>
                  <a href="tel:+919324325642" className="hover:text-[#E11F28]">
                    +91 93243 25642
                  </a>
                </p>
              </div>
              <div>
                <p className="font-bold">Toll Free:</p>
                <p>
                  <a href="tel:1800222621" className="hover:text-[#E11F28]">
                    1800 222 621
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">Our Brands</h3>
            <ul className="mt-3 space-y-2">
              {brandLinks.map((link) => (
                <li key={link.label}>
                  <p className={linkClass}>
                    {link.label}
                  </p>
                </li>
              ))}
            </ul>

            <h3 className="mt-5 text-base font-bold text-slate-900">Other Links</h3>
            <ul className="mt-3 space-y-2">
              {otherLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden px-8 py-14 xl:block xl:px-16">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="text-base font-bold text-slate-900">Important Links</h3>
            <ul className="mt-4 space-y-1">
              {importantLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">Our Brands</h3>
            <ul className="mt-4 space-y-1">
              {brandLinks.map((link) => (
                <li key={link.label}>
                  <p className={linkClass}>
                    {link.label}
                  </p>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-base font-bold text-slate-900">Other Links</h3>
            <ul className="mt-4 space-y-1">
              {otherLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">Contact Us</h3>
            <div className="mt-4 space-y-4 text-sm text-slate-800">
              <div>
                <p className="font-bold">Registered Office:</p>
                <p>510, Himalaya House, 79,</p>
                <p>Palton Road, Mumbai – 400 001</p>
              </div>
              <div>
                <p className="font-bold">Tel:</p>
                <p>
                  <a href="tel:+912222614505" className="hover:text-[#E11F28]">
                    +91 22 2261 4505/06/07
                  </a>
                </p>
                <p>
                  <a href="tel:+919324325642" className="hover:text-[#E11F28]">
                    +91 93243 25642
                  </a>
                </p>
              </div>
              <div>
                <p className="font-bold">Toll Free:</p>
                <p>
                  <a href="tel:1800222621" className="hover:text-[#E11F28]">
                    1800 222 621
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">Follow us on</h3>
            <a
              href="https://www.linkedin.com/company/hindustan-pencils-private-limited"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hindustan Pencils on LinkedIn"
              className="mt-4 flex h-9 w-9 items-center justify-center rounded border border-[#1a56a4] text-[#1a56a4] transition hover:bg-[#1a56a4] hover:text-white"
            >
              <FaLinkedinIn size={18} aria-hidden="true" />
            </a>

            <div className="mt-10">
              <Image src="/images/logo.png" alt="Hindustan Pencils" width={1536} height={382} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
