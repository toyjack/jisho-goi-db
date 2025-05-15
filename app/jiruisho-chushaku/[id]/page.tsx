import { getItem } from "../actions";

export default async function JiruishoChushakuItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const itemId = parseInt(id);
  if (isNaN(itemId)) {
    return <div>Invalid ID</div>;
  }

  // Fetch the item data using the ID
  const item = await getItem(itemId);
  if (!item) {
    return <div>Item not found</div>;
  }
  // Render the item details
  return (
    <div>
      <h1>{item.word_in_maeda}</h1>
      <p>{item.word_in_kurokawa}</p>
      <p>{item.annotation}</p>
    </div>
  );

}
