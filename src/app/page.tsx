import Image from "next/image";
import { User } from "./api/dataSource";

export default async function Home() {
  const res = await fetch(`${process.env.DOMAIN_PORT}/api/user`);
  const users: User[] = (await res.json()).result || [];
  // using the same styles of the nextjs example page
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className="text-2xl font-semibold">Users List:</p>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {users.map(({ id, name, lastName, phone, address, friends }: User) => (
          <a
            key={`${id}`}
            href={`${process.env.DOMAIN_PORT}/user/${id}`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {`${name} ${lastName}`}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Address: {address}
            </p>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              phone: {phone}
            </p>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Friends: {friends.length}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
