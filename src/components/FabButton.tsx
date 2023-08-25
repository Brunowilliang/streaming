import React from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  onclick: () => void;
}

export default function FabButton({ onclick }: Props) {
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg focus:outline-none"
        onClick={onclick}
      >
        <FiSearch size={25} />
      </button>
    </div>
  );
}
