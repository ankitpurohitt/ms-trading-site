import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/917425060129"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} />
  </a>
);

export default WhatsAppButton;
