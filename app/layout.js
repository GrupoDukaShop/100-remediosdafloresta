import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "@/components/SiteHeader";
import SiteVisitTracker from "@/components/SiteVisitTracker";

export const metadata = {
  title: "Kit Sabedoria Natural • Saúde Sem Remédio + 100 Remédios da Floresta",
  description:
    "2 guias completos: Saúde Sem Remédio e 100 Remédios da Floresta. Remédios naturais, ervas, rituais e a sabedoria ancestral indígena para cuidar do corpo e da mente.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap"
        />
      </head>
      <body>
        <SiteHeader />
        <SiteVisitTracker />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
