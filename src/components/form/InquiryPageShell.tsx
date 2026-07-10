import { ReactNode } from "react";
import { InquiryTabs } from "@/components/form/InquiryTabs";

export function InquiryPageShell({
  description,
  children,
}: {
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <InquiryTabs />
        <p className="mx-auto mt-8 max-w-2xl text-center text-slate-600">{description}</p>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
