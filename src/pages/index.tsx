import Head from "next/head";

import { type NextPage } from "next";
import { api } from "../utils/api";
import ItemModal from "../components/itemModal";
import { useState } from "react";

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: items, isLoading, refetch } = api.item.getAll.useQuery();

  const { data: item } = api.item.getUnique.useQuery({
    id: "c6bfc518-e888-4626-82fd-14ad7248f92c",
  });

  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta name="description" content="t3 items tutorial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {modalOpen && <ItemModal setModalOpen={setModalOpen} refetch={refetch} />}

      <main className="mx-auto max-w-xl bg-green-200">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">My shopping list</h2>
          <button onClick={() => setModalOpen(true)} type="button">
            Add shopping item
          </button>
        </div>

        <ol>
          {!isLoading && items ? (
            items.map(({ id, name }) => <li key={id}>{name}</li>)
          ) : (
            <p>loading...</p>
          )}
        </ol>

        <h3>Unique</h3>
        <div>
          {item?.id} === {item?.name}
        </div>
      </main>
    </>
  );
};

export default Home;
