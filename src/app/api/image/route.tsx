import { load } from "cheerio"
import { NextResponse, type NextRequest } from "next/server"
import { createCanvas } from 'canvas'


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("id") ?? searchParams.get("username")
    if(!search) return NextResponse.json("Parameter id or username required", {status: 400})

    // const page = await fetch(`${process.env.API_URL}/users/${search}`, {
    //     next: {revalidate: 15}
    // })
    // if(!page.ok) return NextResponse.json("Unable to find user", {status: page.status})

    // const body = await page.text()
    // const $ = load(body)
    // const res = $(".js-react--profile-page.osu-layout.osu-layout--full")
    // const data = res.attr("data-initial-data")
    // if(!data) return NextResponse.json("Missing data", {status: 404})

    const canvas = createCanvas(250, 250)
    const ctx = canvas.getContext('2d')
    ctx.font = '30px '
    ctx.fillStyle = "white";
    ctx.save()
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 250, 250);

    ctx.restore()
    ctx.fillText("SoonTM", 50, 50)
    const buffer = canvas.toBuffer()

    return new  NextResponse(buffer, {status: 200, headers: {
        "content-type": "image/png"
    }})
}