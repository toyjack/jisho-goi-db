import { userCreate } from "@/db/users";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function RegisterPage() {
  async function handleSubmit(data: FormData) {
    "use server";
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const repassword = data.get("repassword") as string;
    if (password !== repassword) {
      return;
    }
    const newUser = await userCreate({ name, email, password });
    if (newUser) {
      // redirect("/auth/login");
      redirect("/api/auth/signin");
    }
  }
  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold">ユーザー登録</h1>
      <p className="p-2 m-2 text-base-content">
        臨時ページです。登録後のメール通知はありません。
      </p>
      <div className="p-2 m-2 max-w-md w-full">
        <form action={handleSubmit} className="flex flex-col gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">お名前</span>
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered bg-base-300 text-base-content w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">メールアドレス（ログイン用）</span>
            </label>
            <input
              name="email"
              type="text"
              className="input input-bordered bg-base-300 text-base-content w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">パスワード</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered bg-base-300 text-base-content w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">パスワードの確認</span>
            </label>
            <input
              name="repassword"
              type="password"
              className="input input-bordered bg-base-300 text-base-content w-full"
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="登録"
              className="btn btn-primary w-full max-w-xs"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
