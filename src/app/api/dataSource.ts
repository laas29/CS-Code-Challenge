export type User = {
    id: string,
    name: string,
    lastName: string,
    address: string,
    phone: string,
    friends: string[],
};

export type Friend = {
    id: string,
    name: string,
    lastName: string,
};

export type UserProfile = Omit<User, "friends"> & {
    friends: Friend[]
};

// Mocked table
const Users: User[] = [
    {
        id: "1",
        name: "Luz",
        lastName: "Harinas",
        address: "Coli #131",
        phone: "3333333333",
        friends: ["2", "3", "4"],
    },
    {
        id: "2",
        name: "Laura",
        lastName: "Lopez",
        address: "Evergreen 134",
        phone: "555555555",
        friends: ["1", "3"],
    },
    {
        id: "3",
        name: "Barry",
        lastName: "White",
        address: "Cloverfield 55",
        phone: "3333333344",
        friends: ["2", "1"],
    },
    {
        id: "4",
        name: "Sebastian",
        lastName: "Seth",
        address: "Notmyproblem #25",
        phone: "333322333",
        friends: ["1"]
    },
];

export const getAllUsers = async (): Promise<User[]> => {
    return await new Promise((resolve) => {
        resolve(Users);
    });
};

export const getUsersByIds = async (ids: string[]): Promise<Friend[]> => {
    return await new Promise((resolve) => {
        resolve(Users.filter(({ id: _id }) => ids.includes(_id)));
    });
};

export const getUserProfileById = async (id: string): Promise<UserProfile | undefined> => {
    const user: User | undefined = await new Promise((resolve) => {
        resolve(Users.find(({ id: _id }) => _id === id))
    });
    if (user) {
        const friends = user.friends.length ? (await getUsersByIds(user.friends)) : [];

        const result = {
            ...user,
            friends,
        };

        return result;
    }

    return;
};
