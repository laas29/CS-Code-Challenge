import { NextResponse } from "next/server";
import { getUserProfileById } from "../../dataSource";

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    const userProfile = await getUserProfileById(params.id);
    return NextResponse.json({ result: [userProfile] }, { status: 200 });
}