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
    <section className="w-full bg-slate-100">
      <div className="mx-auto w-full max-w-4xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:pb-16">
        <InquiryTabs />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-slate-600 sm:mt-8 sm:text-base">{description}</p>
        <div className="mt-7 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}
