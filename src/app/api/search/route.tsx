import { type NextRequest, NextResponse } from "next/server"
import { load } from "cheerio"
// import { TokenHandler } from "@/app/utils/token"

// const handler = new TokenHandler(process.env.CLIENT_ID, process.env.CLIENT_SECRET)


export async function GET(request: NextRequest) {
    return NextResponse.json("GET Not allowed >:(", { status: 403 })
}

export async function POST(request: NextRequest) {
    const req = await request.json()
    if (!req || !req.user || !req.key) return NextResponse.json("Bad request", { status: 400 })
    const url = new URL(`${process.env.API_URL}/users/${req.user}`)
    url.searchParams.append("key", req.key)

    const page = await fetch(url, { next: { revalidate: 15 } })
    if (!page.ok) return NextResponse.json("Unable to find user", { status: page.status })
    const body = await page.text()

    const $ = load(body)
    const element = $(".js-react--profile-page.osu-layout.osu-layout--full")
    const data = element.attr("data-initial-data")
    if (!data) return NextResponse.json("User not found", { status: 404 })

    const res = JSON.parse(data)
    return NextResponse.json(res, { status: 200 })
}