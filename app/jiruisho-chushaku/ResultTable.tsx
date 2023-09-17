"use client";
import { JiruishoChushaku } from "@prisma/client";
import { useSession } from "next-auth/react";
import JiruishoChushakuUpdateItemModal from "./jiruisho-chushaku-update-modal";

function ResultTable({ data }: { data: JiruishoChushaku[] }) {
  const { data: session, status } = useSession();
  return (
    <div className="">
      {session && session.user.role === "ADMIN" && (
        <>
          <div className="flex justify-end">
            {/* @ts-ignore */}
          <button className="btn btn-primary"  onClick={() => document.getElementById("my_modal_1")?.showModal()}         >
          新規作成
          </button>
          </div>
          
          <dialog id="my_modal_1" className="modal">
            <JiruishoChushakuUpdateItemModal />
          </dialog>
        </>
      )}
      <table className="table w-full">
        <thead>
          <tr>
            <th>見出し語（前田）</th>
            <th>見出し語（黒川）</th>
            <th>注釈</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
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
