/**
 * Configuração institucional e de ambiente do site Sol & Mar Rent a Car.
 * Toda a configuração externa vem de variáveis de ambiente padrão do Vite
 * (.env / .env.example) com fallbacks oficiais auditados.
 */
const env: Record<string, string | undefined> =
  typeof import.meta !== "undefined" && import.meta.env
    ? (import.meta.env as Record<string, string | undefined>)
    : typeof process !== "undefined" && process.env
      ? (process.env as Record<string, string | undefined>)
      : {};

function read(key: string, fallback: string): string {
  const value = env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

function readWhatsApp(key: string, fallback: string): string {
  const value = env[key];
  if (value && value.trim().length > 0 && !value.includes("00000000")) {
    return value.trim();
  }
  return fallback;
}

export const SUPABASE_URL = read("VITE_SUPABASE_URL", "");
export const SUPABASE_ANON_KEY = read("VITE_SUPABASE_ANON_KEY", "");
export const SUPABASE_BUCKET = read("VITE_SUPABASE_STORAGE_BUCKET", "veiculos");

export const isSupabaseConfigured = SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;

export const company = {
  name: "Sol & Mar Rent a Car",
  legalName: "Andre de Sousa Marques",
  cnpj: "18.617.401/0001-50",
  tagline: "A liberdade onde o sol e o mar te levarem.",
  phone: read("VITE_COMPANY_PHONE", "(85) 99974-3558"),
  phoneInternational: "+55 85 99974-3558",
  whatsapp: readWhatsApp("VITE_COMPANY_WHATSAPP", "5585999743558"),
  email: read("VITE_COMPANY_EMAIL", ""),
  commercialAddress: "Avenida da Abolição, 1894, Meireles, Fortaleza, Ceará, Brasil",
  address: read(
    "VITE_COMPANY_ADDRESS",
    "Avenida da Abolição, 1894, Meireles, Fortaleza, Ceará, Brasil",
  ),
  city: "Fortaleza, CE",
  establishedDate: "2 de agosto de 2013",
  establishedYear: 2013,
  hours: read("VITE_COMPANY_HOURS", "Segunda a sábado: 08h às 18h"),
  instagram: read("VITE_COMPANY_INSTAGRAM", "https://instagram.com/solemarrentacar"),
  defaultPickupLocation: "Aeroporto Internacional de Fortaleza – Pinto Martins",
};

export const RENTAL_LOCATIONS = [
  "Aeroporto Internacional de Fortaleza – Pinto Martins",
  "Avenida da Abolição, 1894, Meireles, Fortaleza, Ceará, Brasil",
  "Hotel ou endereço em Fortaleza",
] as const;

export const whatsappLink = (
  message = "Olá! Gostaria de informações sobre locação de veículos na Sol & Mar Rent a Car.",
) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
