import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-clip">
      <Header />
      <main className="w-full min-w-0 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
