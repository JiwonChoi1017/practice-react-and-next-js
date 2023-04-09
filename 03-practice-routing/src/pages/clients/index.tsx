import Link from "next/link";

const ClientsPage = () => {
  const clients = [
    { id: "max", name: "Maximilian" },
    { id: "manu", name: "Manuel" },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client) => {
          const { id, name } = client;
          return (
            <li key={id}>
              <Link
                href={{
                  pathname: "/clients/[id]",
                  query: { id },
                }}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientsPage;
