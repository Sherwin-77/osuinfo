import { type NextRequest, NextResponse } from "next/server"

import { TokenHandler } from "@/app/utils/token"

const handler = new TokenHandler(process.env.CLIENT_ID, process.env.CLIENT_SECRET)


export async function GET(request: NextRequest) {
    return NextResponse.json("GET Not allowed >:(", { status: 403 })
}

export async function POST(request: NextRequest) {
    const req = await request.json()
    if (!req || !req.user || !req.key) return NextResponse.json("Bad request", { status: 400 })
    const url = new URL(`${process.env.API_URL}/users/${req.user}`)
    // if (req) return NextResponse.json("test", {status: 500})
    url.searchParams.append("key", req.key)
    const response = await fetch(url, { headers: await handler.getHeaders() })
    if (!response.ok) {
        if (response.status == 404) return NextResponse.json("Not found", { status: 404 })
        return NextResponse.json("API error", { status: response.status })
    }
    const res = await response.json()
    return NextResponse.json(res, { status: 200 })
}