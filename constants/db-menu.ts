export type Database = {
  title: string;
  url: string;
  description: string;
  image: string;
  accessRole: string;
};

export const dbMenu:Database[] = [
  {
    title: "本草和名",
    url: "/hzwm",
    description: "限定公開中",
    image: "/images/hzwm.png",
    accessRole: "PUBLIC",
  },
  {
    title: "古活字版和名類聚抄",
    url: "/kwrs",
    description: "全文公開",
    image: "/images/kwrs.png",
    accessRole: "PUBLIC",
  },
  {
    title: "色葉字類抄",
    url: "/jiruisho",
    description: "姓氏部・名字部",
    image: "/images/jiruisho_logo.png",
    accessRole: "PUBLIC",
  },
  {
    title: "色葉字類抄注釈",
    url: "/jiruisho-chushaku",
    description: "開発中・内部閲覧",
    image: "/images/no_image.png",
    accessRole: "ADVANCED_USER",
  },
  {
    title: "落葉集",
    url: "/racvyoxv",
    description: "本篇",
    image: "/images/racvyoxv.png",
    accessRole: "PUBLIC",
  },
  {
    title: "文明本節用集",
    url: "/bunmei",
    description: "イロハニホヘトチリヌルヲ部",
    image: "/images/bunmeibon_logo.png",
    accessRole: "PUBLIC",
  },
  {
    title: "増続大広益会玉篇大全",
    url: "/gyokuhentaizen",
    description: "全文公開",
    image: "/images/gyokutaizen_logo.png",
    accessRole: "PUBLIC",
  },
  {
    title: "版本和訓栞",
    url: "/wakunnoshiori",
    description: "公開予定",
    image: "/images/wakun_logo.png",
    accessRole: "PUBLIC",
  },
];
