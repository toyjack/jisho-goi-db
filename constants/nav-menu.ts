import { dbMenu, Database } from "./db-menu";

export type NavLink = {
  title: string;
  url: string;
};

export const navMenu: (NavLink| Database[])[] = [
  {
    title: "過去のお知らせ",
    url: "/news",
  },
  [...dbMenu],
  {
    title: "画像ギャラリー",
    url: "/gallery",
  },
];
