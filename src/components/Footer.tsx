import { Phone, User } from "lucide-react";

const owners = [
  { name: "Amit Yadav", phones: ["7425060129"] },
  { name: "Manoj Yadav", phones: ["9829586830", "7014825782"] },
  { name: "Abhishek Yadav", phones: ["9079060129"] },
] as const;

const services = [
  "ACP Sheets",
  "Toughened Glass (5mm–12mm)",
  "Patch Fittings (Ozone/Dorma)",
  "Aluminum Windows & Sections",
  "UPVC Windows & Partitions",
  "Glass Cutting & Polishing",
] as const;

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12 grid gap-10 lg:grid-cols-3">
      {/* Left: Business + Owners */}
      <div className="space-y-4">
        <div>
          <h3 className="font-heading text-xl font-bold tracking-wide">M.S. TRADING CO.</h3>
          <p className="text-sm text-primary-foreground/75 mt-2 leading-relaxed">
            Experts in Glass &amp; Aluminum Works in Ajmer — premium materials, precise installation, and reliable after-support.
          </p>
        </div>

        <div className="bg-primary-foreground/10 border border-primary-foreground/10 rounded-xl p-4">
          <h4 className="font-heading font-semibold mb-3">Owners</h4>
          <div className="space-y-4">
            {owners.map((o) => (
              <div key={o.name} className="flex items-start gap-3">
                <User size={18} className="text-primary-foreground/70 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="font-heading font-semibold text-sm">{o.name}</p>
                  <div className="mt-1 space-y-1">
                    {o.phones.map((ph) => (
                      <a
                        key={ph}
                        href={`tel:+91${ph}`}
                        className="flex items-center gap-2 text-xs text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                      >
                        <Phone size={14} className="shrink-0" />
                        <span className="truncate">+91 {ph}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Services */}
      <div className="space-y-4">
        <h4 className="font-heading text-lg font-semibold">Services</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/75">
          {services.map((s) => (
            <li key={s} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-foreground/60 shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Map Embed */}
      <div className="space-y-4">
        <h4 className="font-heading text-lg font-semibold">Location</h4>
        <div className="overflow-hidden rounded-xl border border-primary-foreground/10 bg-primary-foreground/5">
          <iframe
            title="Madar Railway Station, Ajmer"
            src="https://www.google.com/maps?q=Madar%20Railway%20Station%2C%20Ajmer&output=embed"
            width="100%"
            height="260"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-primary-foreground/75">
          Madar Railway Station, Ajmer
        </p>
      </div>
    </div>

    <div className="border-t border-primary-foreground/10">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-primary-foreground/75">
        Authorized Dealer for Ozone &amp; Dorma fittings
      </div>
    </div>
  </footer>
);

export default Footer;
