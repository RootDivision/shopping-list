import Head from "next/head";
import { useState } from "react";
import clsx from "clsx";

import { type NextPage } from "next";
import { api } from "../utils/api";
import ItemModal from "../components/itemModal";
import Link from "next/link";

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: items, isLoading, refetch } = api.item.getAll.useQuery();

  const { mutate: deleteItem } = api.item.deleteItem.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const { mutate: checkItem } = api.item.checkItem.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta name="description" content="t3 items tutorial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {modalOpen && <ItemModal setModalOpen={setModalOpen} refetch={refetch} />}

      <main className="mx-auto max-w-sm bg-green-200">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">My shopping list</h2>
          <button onClick={() => setModalOpen(true)} type="button">
            Add shopping item
          </button>
        </div>

        <div className="flex flex-col">
          {!isLoading && items ? (
            items.map(({ id, name, checked }) => (
              <div key={id} className="flex">
                <input
                  className="m-2"
                  type="checkbox"
                  checked={!!checked}
                  onClick={() => checkItem({ id, checked: !checked })}
                ></input>

                <Link className="flex-grow p-2" href={`/detail/${id}`}>
                  <label className={clsx({ "line-through": !!checked })}>
                    {name}
                  </label>
                </Link>
                <button
                  className="bg-red-300 p-2"
                  onClick={() => deleteItem({ id })}
                >
                  delete
                </button>
              </div>
            ))
          ) : (
            <p>loading...</p>
          )}
        </div>
        <h3>Unique</h3>
      </main>
    </>
  );
};

export default Home;
