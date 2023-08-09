import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("id") ?? searchParams.get("username")
    return NextResponse.json("Come back later :)",{status: 501})
}