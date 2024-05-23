
import { NextResponse } from "next/server";
import { getAllUsers } from "../dataSource";

export async function GET(request: Request) {
    console.log(request);
    const allUsers = await getAllUsers();
    return NextResponse.json({ result: allUsers }, { status: 200 });
}