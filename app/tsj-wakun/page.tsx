function TsjWakunPage() {
  return (
    <div className="px-4 pb-8">
      <div className="prose max-w-none">
        <h3>新撰字鏡和訓データベースについて</h3>
        <p>
          左側の検索パネルから条件を入力して検索してください。
        </p>
        <h4>検索可能なフィールド</h4>
        <ul>
          <li><strong>見出し語</strong> - 辞書の見出し語（漢字）</li>
          <li><strong>読み</strong> - かな/漢字表記の読み</li>
          <li><strong>万葉仮名</strong> - 万葉仮名による定義</li>
          <li><strong>享和本見出し</strong> - 享和本における見出し語</li>
        </ul>
      </div>
    </div>
  );
}

export default TsjWakunPage;
