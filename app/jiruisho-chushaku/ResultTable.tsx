"use client";
import { JiruishoChushaku, Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { deleteItem } from "./actions";
import EditModal from "./edit-modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

type JiruishoChushakuWithJiruisho = Prisma.JiruishoChushakuGetPayload<{
  include:{
    jiruisho: true
  }
}>

function ResultTable({ data }: { data: JiruishoChushakuWithJiruisho[] }) {
  const { data: session } = useSession();
  const [current, setCurrent] = useState(0);
  const router= useRouter();
  const createItemModalRef = useRef<HTMLDialogElement>(null);
  const editItemModalRef = useRef<HTMLDialogElement>(null);
  const deleteItemModalRef = useRef<HTMLDialogElement>(null);

  const CloseModalBtn = ({ label = "閉じる" }: { label?: string }) => (
    <form method="dialog">
      <button className="btn">{label}</button>
    </form>
  );

  const handleCreate = () => {
    createItemModalRef.current?.showModal();
  };
  const handleEdit = (id: number) => {
    // setCurrent(id);
    // editItemModalRef.current?.showModal();
    router.push(`/jiruisho-chushaku/create?id=${id}`);
  };

  const handleDelete = (id: number) => {
    setCurrent(id);
    deleteItemModalRef.current?.showModal();

  };

  const handleConfirmDelete = async () => {
    const id = current;
    await deleteItem(id);
  };

  return (
    <div className="overflow-x-auto">
      {session && session.user.role === "ADMIN" && (
        <>
          <div className="flex justify-end">
            {/* @ts-ignore */}
            {/* <button className="btn btn-primary" onClick={() => handleCreate()}> */}
            <Link
              href={"/jiruisho-chushaku/create"}
              className="btn btn-primary"
            >
              新規作成
            </Link>
            {/* </button> */}
          </div>

          <dialog ref={editItemModalRef} className="modal">
            <EditModal id={current} />
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

          <dialog ref={deleteItemModalRef} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">注釈削除</h3>
              <p className="py-4">注釈ID：{current}</p>
              <div className="flex justify-end gap-2">
                <CloseModalBtn label="取り消し" />{" "}
                <form onSubmit={handleConfirmDelete}>
                  <input
                    type="submit"
                    className="btn btn-error"
                    value={"削除"}
                  />
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
      )}

      <table className="table w-full">
        <thead>
          <tr>
            {session && session.user.role === "ADMIN" && <th>操作</th>}
            <th>注釈ID</th>
            <th>見出し語ID・見出し語</th>
            <th>注釈</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {session && session.user.role === "ADMIN" && (
                <td className="flex gap-2 items-center justify-center text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(row.jiruisho.id)}
                  >
                    修正
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(row.id)}
                  >
                    削除
                  </button>
                </td>
              )}
              <td>{row.id}</td>
              <td>
                <Link href={`/jiruisho/${row.jiruisho.id}`} className="link link-hover">
                  {row.jiruisho.id}・{row.jiruisho.entry}
                </Link>
              </td>
              <td className="">{row.annotation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
