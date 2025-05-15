"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jiruishoId = searchParams.get("id");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const notEmptyQuery = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != "")
    ) as unknown as Record<string, string>;
    const query = new URLSearchParams(notEmptyQuery);
    router.push(`/jiruisho-chushaku/create?${query}`);
  };
  return (
    <div>
      <h2>注釈する字類抄の項目を指定</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="number"
              min={1}
              className="grow"
              placeholder="字類抄IDを入力"
              defaultValue={jiruishoId || undefined}
              {...register("id")}
            />
            <button className="" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
