import { type NextRequest, NextResponse } from "next/server"

const url = new URL("https://random-data-api.com/api/v2/users")


export async function GET(request: NextRequest) {
    console.log(request)
    const response = await fetch(url)
    const res = await response.json()
    if(!response.ok) return NextResponse.json({data:"Error", status: 500})
    return NextResponse.json(res, {status: 200})
}

export async function POST(request: NextRequest){
    const response = await fetch(url)
    const res = await response.json()
    if(!response.ok) return NextResponse.json({data:"Error", status: 500})
    return NextResponse.json({uid: "Random-uid"}, {status: 200})
}