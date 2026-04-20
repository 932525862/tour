import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Globe2, Calendar, Users, ShieldCheck } from "lucide-react";

import heroImage from "@/assets/hero-china.jpg";
import logoImage from "@/assets/tourland-logo.jpg";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xitoy ko'rgazmasiga ro'yxat — 25–26 va 28–29 Aprel" },
      {
        name: "description",
        content:
          "Xitoyda ishlab chiqarish bo'yicha xalqaro ko'rgazmaga ro'yxatdan o'ting. Aprel oyidagi ikki sanadan tanlang.",
      },
      { property: "og:title", content: "Xitoy ko'rgazmasiga ro'yxat" },
      {
        property: "og:description",
        content:
          "Aprel oyidagi Xitoy xalqaro ko'rgazmasiga qo'shiling — bevosita ishlab chiqaruvchilar bilan tanishing.",
      },
      { property: "og:image", content: heroImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        />
        <img
          src={heroImage}
          alt="Xitoy xalqaro ko'rgazmasi zali"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
          width={1920}
          height={1080}
        />

        <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24">
          <nav className="flex items-center justify-between text-primary-foreground">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="Tourland.uz logo"
                className="h-12 w-12 rounded-full bg-white object-contain p-1 shadow-[var(--shadow-card)] sm:h-14 sm:w-14"
                width={56}
                height={56}
              />
              <div className="leading-tight">
                <div className="text-lg font-bold tracking-tight sm:text-xl">
                  Tourland<span className="text-accent">.uz</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/70 sm:text-xs">
                  Tour & Travel
                </div>
              </div>
            </div>
            <a
              href="#form"
              className="hidden rounded-full border border-accent/40 bg-accent/20 px-5 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-accent/30 sm:inline-block"
            >
              Ariza qoldirish
            </a>
          </nav>

          <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
            <div className="text-primary-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                <Calendar className="h-3.5 w-3.5" />
                Aprel 2025 — Cheklangan o'rinlar
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Xitoyda ishlab chiqarish bo'yicha{" "}
                <span className="text-accent">xalqaro ko'rgazma</span>
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                Bevosita ishlab chiqaruvchilar bilan tanishing, sifatli mahsulot va arzon narxlardan
                foydalaning. Biz tashkiliy ishlarning hammasini o'z zimmamizga olamiz.
              </p>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/85">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  Viza yordami
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Tarjimon xizmati
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />2 ta sana tanlovi
                </div>
              </div>

              <a
                href="#form"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
              >
                Ro'yxatdan o'tish
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </a>
            </div>

            <div id="form" className="lg:pl-6">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nima uchun biz bilan?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tashrifdan oldingi tashkilotchilik, joyda qo'llab-quvvatlash va keyingi yetkazib berish
            — barchasi bir joyda.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Ishonchli sherik",
              text: "Yillar davomidagi tajriba va yuzlab mamnun mijozlar.",
            },
            {
              icon: Users,
              title: "Tarjimon va menejer",
              text: "Har bir delegatsiyaga shaxsiy menejer va tarjimon biriktiriladi.",
            },
            {
              icon: Globe2,
              title: "To'liq logistika",
              text: "Viza, mehmonxona, transport — hammasi biz tomondan.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <img
            src={logoImage}
            alt="Tourland.uz"
            className="h-10 w-10 rounded-full object-contain"
          />
          © {new Date().getFullYear()} Tourland.uz — Tour & Travel. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
}
