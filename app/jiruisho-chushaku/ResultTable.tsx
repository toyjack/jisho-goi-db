"use client";
import { JiruishoChushaku } from "@prisma/client";
import { useSession } from "next-auth/react";
import CreateItemModal from "./create-modal";
import { useState } from "react";
import { deleteItem } from "./actions";
import EditModal from "./edit-modal";

function ResultTable({ data }: { data: JiruishoChushaku[] }) {
  const { data: session, } = useSession();
  const [current, setCurrent] = useState(0);

  const CloseModalBtn = ({ label = "閉じる" }: { label?: string }) => (
    <form method="dialog">
      <button className="btn">{label}</button>
    </form>
  );

  const handleCreate = () => {
    // @ts-ignore
    document.getElementById("create_item_modal")?.showModal();
  };
  const handleEdit = (id: number) => {
    setCurrent(id);
    // @ts-ignore
    document.getElementById("edit_item_modal")?.showModal();
  };

  const handleDelete = (id: number) => {
    setCurrent(id);
    // @ts-ignore
    document.getElementById("delete_item_modal")?.showModal();
  };

  const handleConfirmDelete = async () => {
    const id = current;
    await deleteItem(id);
  };

  return (
    <div className="">
      {session && session.user.role === "ADMIN" && (
        <>
          <div className="flex justify-end">
            {/* @ts-ignore */}
            <button className="btn btn-primary" onClick={() => handleCreate()}>
              新規作成
            </button>
          </div>

          <dialog id="create_item_modal" className="modal">
            <CreateItemModal />
          </dialog>

          <dialog id="edit_item_modal" className="modal">
            <EditModal id={current} />
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

          <dialog id="delete_item_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">注釈削除</h3>
              <p className="py-4">注釈ID：{current}</p>
              <div>
                <CloseModalBtn label="取り消し" />{" "}
                <form onSubmit={handleConfirmDelete}>
                  <input
                    type="submit"
                    className="btn btn-error"
                    value={"削除"}
                  ></input>
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
          {session && session.user.role === "ADMIN" && (
            <th>操作</th>
          )}
            <th>見出し語（前田）</th>
            <th>見出し語（黒川）</th>
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
                    onClick={() => handleEdit(row.id)}
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
              <td>{row.word_in_maeda}</td>
              <td>{row.word_in_kurokawa}</td>
              <td className="">{row.annotation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
