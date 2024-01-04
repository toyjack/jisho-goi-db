import TinaManualComponent from "@/components/tina/manual";
import { client } from "@/tina/__generated__/client";

async function layout({ children }: { children: React.ReactNode }) {
  let result = await client.queries.manual({
    relativePath: "hzwm.mdx",
  });
  let siteStory = await client.queries.manual({
    relativePath: "site-story.mdx",
  });

  if (result.errors) {
    return (
      <div>
        {result.errors.map((error) => {
          return <div key={error.message}>{error.message}</div>;
        })}
      </div>
    );
  }
  result = JSON.parse(JSON.stringify(result));
  siteStory = JSON.parse(JSON.stringify(siteStory));
  return (
    <div className="md:p-4">
      {children}

      <div className="divider">
        <h4>本データベースについて</h4>
      </div>
      <TinaManualComponent {...result} siteStory={{ ...siteStory }} />
    </div>
  );
}

export default layout;
