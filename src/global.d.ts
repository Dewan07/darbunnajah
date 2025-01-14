// global.d.ts
import { Session } from "next-auth";

// Menjadikan session global
declare global {
  var session: Session | any; // Ganti dengan tipe yang sesuai
}
