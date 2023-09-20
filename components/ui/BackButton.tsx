"use client";
import React from "react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <button
      className="btn btn-secondary"
      onClick={() => {
        router.back();
      }}
    >
      戻る
    </button>
  );
}

export default BackButton;
