"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { inquiryLinks } from "@/lib/site";

export function InquiryTabs() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
      {inquiryLinks.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`min-h-11 rounded-full px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wide shadow-sm transition sm:px-6 sm:text-sm ${
              active
                ? "bg-red-600 text-white shadow-red-200 hover:bg-red-700"
                : "bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
