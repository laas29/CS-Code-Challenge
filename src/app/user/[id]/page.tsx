import { Friend, UserProfile } from "@/app/api/dataSource";

export function UserInfoCard({ id, name, lastName }: Friend) {
    console.log('UserInfoCard', id, name, lastName);
    return <a
        href={`${process.env.DOMAIN_PORT}/user/${id}`}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
        <h2 className="mb-3 text-2xl font-semibold">
            {`${name} ${lastName}`}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
            </span>
        </h2>
    </a>

}

export default async function UserInfo({ params }: { params: { id: string } }) {
    const res = await fetch(`${process.env.DOMAIN_PORT}/api/user/${params.id}`);
    const { name, lastName, address, phone, friends }: UserProfile = (await res.json()).result?.[0];
    console.log('UserInfo', friends);
    // using the same styles of the nextjs example page
    return <main className="flex min-h-screen flex-col items-center p-24">
        <a className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex" href={`${process.env.DOMAIN_PORT}`}>Back to the Home Page</a>
        <p className="text-2xl font-semibold">
            {`${name} ${lastName}`} Info:
        </p>
        <p>
            Address: {`${address}`}
        </p>
        <p>
            Phone: {`${phone}`}
        </p>
        <p className="text-2xl mt-10 font-semibold">Friends:</p>
        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
            {friends?.map(friend =>
                <UserInfoCard key={friend.id} {...friend} />
            )}
        </div>
    </main>
} 