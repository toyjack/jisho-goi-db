import React from 'react'

function MembersSection() {
  const data = [
    {
      name: "藤本 灯",
      name_ruby: "Akari Fujimoto",
      url: "https://researchmap.jp/akari",
      url_in_site: "/references#yamada",
      img: "https://researchmap.jp/akari/avatar.jpg",
    },
    {
      name: "劉 冠偉",
      name_ruby: "Guanwei Liu",
      url: "https://researchmap.jp/liuguanwei",
      url_in_site: "/references#liu",
      img: "https://researchmap.jp/liuguanwei/avatar.JPG",
    },
    {
      name: "中野 直樹",
      name_ruby: "NAKANO NAOKI",
      url: "https://researchmap.jp/nakano-1988",
      url_in_site: "/references#nakamura",
      img: "https://researchmap.jp/nakano-1988/avatar.jpeg",
    },
    {
      name: "大島 英之",
      name_ruby: "Hideyuki Ohshima",
      url: "https://researchmap.jp/hdyk_o",
      url_in_site: "/references#nakamura",
      img: "https://researchmap.jp/hdyk_o/avatar.jpeg",
    },
    {
      name: "久保 柾子",
      name_ruby: "Masako KUBO",
      url: "https://researchmap.jp/kosamaboku",
      url_in_site: "/references#nakamura",
      img: "https://researchmap.jp/kosamaboku/avatar.jpeg",
    },
    {
      name: "李 媛",
      name_ruby: "Yuan Li",
      url: "https://researchmap.jp/liyuan",
      url_in_site: "/references#nakamura",
      img: "https://researchmap.jp/liyuan/avatar.jpeg",
    },
    {
      name: "本庄 総子",
      name_ruby: "Fusako Honjo",
      url: "https://researchmap.jp/40823696",
      url_in_site: "/references#nakamura",
      img: "https://researchmap.jp/40823696/avatar.jpeg",
    },
    {
      name: "申 雄哲",
      name_ruby: "Woongchul Shin",
      url: "https://researchmap.jp/ursa",
      url_in_site: "/references#nakamura",
      img: "https://researchmap.jp/ursa/avatar.jpeg",
    },
    {
      name: "小林 雄一",
      name_ruby: "Yuichi Kobayashi",
      url: "https://researchmap.jp/kobayashi-yuichi",
      url_in_site: "/references#nakamura",
      img: "https://researchmap.jp/kobayashi-yuichi/avatar.jpeg",
    },
  ];
  return (
    <section className="hero bg-hero from-primary to-secondary text-primary-content min-h-screen bg-gradient-to-br">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            メンバー
          </h2>
          {/* <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Explore the whole collection of open-source web components and
            elements built with the utility classes from Tailwind
          </p> */}
        </div>
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="text-center text-gray-500 dark:text-gray-400"
            >
              <div className="avatar">
                <div className="w-36 rounded-xl">
                  <img className='bg-base-100' src={item.img} alt={item.name} />
                </div>
              </div>
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">{item.name}</a>
              </h3>
              <p>{item.name_ruby}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    // <section>

    //   <div className="hero bg-hero from-primary to-accent text-primary-content min-h-screen bg-gradient-to-br">
    //     <div className="hero-content text-center">
    //       <div className="w-full max-w-md">
    //         <h2 className="mt-20 mb-2 text-4xl font-extrabold md:text-6xl">
    //           メンバー
    //         </h2>
    //         <div className="my-20 flex flex-row flex-wrap w-full space-y-2 gap-2 md:flex-row md:space-y-0 md:space-x-2">
    //           {data.map((item) => (
    //             <a
    //               href={item.url_in_site}
    //               className="card bg-base-100 text-base-content w-32 p-8 flex items-center justify-center"
    //               key={item.name}
    //             >
    //               <div className="avatar">
    //                 <div className="w-24 rounded-xl">
    //                   <img src={item.img} />
    //                 </div>
    //               </div>
    //               <h3 className="text-lg font-bold">{item.name}</h3>
    //               <h4 className="text-base">{item.name_ruby}</h4>
    //             </a>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default MembersSection