import {
  Black_Ops_One,
  Fira_Code as FontMono,
  Inter as FontSans,
  Roboto,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontRoboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto",
});

export const fontBlackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-black-ops-one",
});
