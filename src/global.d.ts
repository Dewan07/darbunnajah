// global.d.ts
import { Session } from "next-auth";

// Menjadikan session global
declare global {
  const session: Session; // Ganti dengan tipe yang sesuai
}
