
function NewsListPanel({allNews}:{allNews?:any[]}) {

  return <div>
    <pre>
      {JSON.stringify(allNews, null, 2)}
    </pre>
  </div>;
}

export default NewsListPanel;
