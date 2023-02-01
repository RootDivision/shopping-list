import type { Item } from "@prisma/client";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { api } from "../utils/api";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<QueryObserverResult<Item[]>>;
}

const ItemModal: FC<ItemModalProps> = ({ setModalOpen, refetch }) => {
  const [input, setInput] = useState<string>("");
  const { mutate } = api.item.addItem.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-red-300">
      <div>
        <h3>Name of item</h3>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
        <button onClick={() => setModalOpen(false)} type="button">
          Cancel
        </button>
        <button
          onClick={() => {
            mutate({ name: input });
            setModalOpen(false);
          }}
          type="button"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
