import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import React from "react";

async function ManualItemPage({ params }: { params: { id: number } }) {
  const manualId = params.id;
  const manual = await prisma.dBManual.findUnique({
    where: { id: Number(manualId) },
  });
  if (!manual) return <div>マニュアルが見つかりません</div>;

  async function handleSubmit(data: FormData) {
    "use server";
    const full_name = data.get("full_name") as string;
    const article = data.get("article") as string;
    const newManual = await prisma.dBManual.update({
      where: { id: Number(manualId) },
      data: { full_name, article },
    });
    revalidatePath(`/admin/manuals/${manualId}`);
  }

  return (
    <div className="p-4 m-4">
      <h1 className="text-3xl font-bold">マニュアルを修正</h1>
      <div>
        <form action={handleSubmit} className="flex flex-col gap-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">DB</span>
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered bg-base-200 text-base-content w-full max-w-xs"
              defaultValue={manual.name as string}
              disabled
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">DB名</span>
            </label>
            <input
              name="full_name"
              type="text"
              className="input input-bordered bg-base-200 text-base-content w-full max-w-xs"
              defaultValue={manual.full_name as string}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">マニュアル内容</span>
              <span className="label-text">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">プレビュー</span>
                    <input type="checkbox" className="toggle" disabled />
                  </label>
                </div>
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered resize-y h-96 bg-base-300 text-base-content w-full"
              name="article"
              placeholder="input here"
              defaultValue={manual.article as string}
            ></textarea>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <Link href={`/admin/manuals`} className="btn btn-info w-full">
                戻る
              </Link>
            </div>

            <div className="flex-1">
              <input
                type="submit"
                value="保存"
                className="btn btn-primary w-full"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManualItemPage;
