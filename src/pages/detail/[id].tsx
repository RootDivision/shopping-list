import { useRouter } from "next/router";
import { api } from "../../utils/api";

const Detail = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data } = api.item.getUnique.useQuery({
    id: id,
  });

  return (
    <div className="mx-auto max-w-sm bg-blue-200">
      <h1>{data?.name}</h1>
      <p className="text-xs">{data?.id}</p>
    </div>
  );
};

export default Detail;
