"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { inquiryLinks } from "@/lib/site";

export function InquiryTabs() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {inquiryLinks.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-wide shadow-sm transition ${
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
