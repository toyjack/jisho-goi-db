import Link from "next/link";

function BunmeiPage() {
  return (
    <div className="p-4">
      <article className="prose lg:prose-xl mx-auto">
        <div className="alert alert-warning shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>このデータベースは試行版です</span>
          </div>
        </div>
        <h3>本データベースについて</h3>
        <p>
          「辞書語彙データベース」は五つの漢和辞書・国語辞書の全文テキストの検索を目的として公開しています。
        </p>
        <p>
          辞書語彙データベースの収録辞書は、次のとおりです。現時点での公開状況をあわせて示します。
        </p>
        <ul>
          <li>『色葉字類抄』（全文テキスト）</li>
          <li>『落葉集』（全文テキスト）</li>
          <li>『和訓栞』（準備中）</li>
          <li>文明本『節用集』（準備中）</li>
          <li>『増続大広益会玉篇大全』（全文テキストおよび画像）</li>
        </ul>
        <p>
          辞書語彙データベースの構築と公開は、XXXXが行っています。このXXXXに関する詳しい説明は、
          <Link href="/about">こちら</Link>をご覧ください。
        </p>
        <div className="divider"></div>
        <h3>文明本節用集データベースの検索方法</h3>
        <p>基本検索の方法は、「掲出字検索」「字音」「和訓」の3種があります。</p>
        <p>
          「掲出字検索」は検索したい掲出字の漢字を検索欄に入力して検索ボダンを押してください。
        </p>
        <p>
          「字音検索」は検索したい漢字音を原本の表記で検索欄に入力して検索ボダンを押してください。
        </p>
        <p>
          「和訓検索」は検索したい和訓を原本の表記で検索欄に入力して検索ボダンを押してください。
        </p>
        <p>
          部首と残り画数はリストから選択して「検索」ボタンをクリックすると該当頁のテキストが表示されます。
        </p>
        <p>
          所在の一覧は巻と丁を選択して「表示」ボタンをクリックすると該当頁のテキストが表示されます。
        </p>
        <p>以上のすべての検索はAND検索となります。</p>
        <p>
          それぞれ検索結果が各項目の全文テキストとして表示されます。検索結果は学術研究の目的のために自由に利用していただいてかまいませんが、校正・点検中のものを含みますので、検索結果を原本画像で確認することをおすすめします。
        </p>
        <p>
          底本：
        </p>
        <p>
          表示される原本画像について、
         
          <Link href="https://dl.ndl.go.jp/" target="_blank">
            国立国会図書館デジタルコレクション
          </Link>
         
        </p>
      </article>
    </div>
  );
}

export default BunmeiPage;
