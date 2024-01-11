"use client";

import client from "@/tina/__generated__/client";
import { ArticleQuery } from "@/tina/__generated__/types";
import { useEffect, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function SiteStory() {
  const [siteStory, setSiteStory] = useState<ArticleQuery>();

  useEffect(() => {
    const fetchContent = async () => {
      const response = await client.queries.article({
        relativePath: "site-story.md",
      });
      setSiteStory(response.data);
    };
    fetchContent();
  }, []);
  return (
    <div className="prose max-w-none">
      <TinaMarkdown content={siteStory?.article.body} />
    </div>
  );
}
