import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Props {
  sales: {
    id: string;
    username: string;
    volume: number;
  }[];
}

const LastSalesPage = (props: Props) => {
  const [sales, setSales] = useState<
    {
      id: string;
      username: string;
      volume: number;
    }[]
  >(props.sales);

  const { data, error } = useSWR(
    "https://react-http-b7917-default-rtdb.firebaseio.com/rtdb/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({ id: key, ...data[key] });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    "https://react-http-b7917-default-rtdb.firebaseio.com/rtdb/sales.json"
  );
  const data = await response.json();
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      ...data[key],
    });
  }

  return { props: { sales: transformedSales } };
};

export default LastSalesPage;
