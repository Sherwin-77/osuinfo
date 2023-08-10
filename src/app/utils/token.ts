const url = new URL(process.env.TOKEN_URL)

export class TokenHandler {
    protected clientId: number
    protected clientSecret: string
    protected accesToken: string | null
    protected expiresOn: number | null
    constructor(clientId: number, clientSecret: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.accesToken = null
        this.expiresOn = null
    }

    protected async prepareToken() {
        console.log(`${(new Date()).toString()} - New token created`)
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                client_id: this.clientId.toString(),
                client_secret: this.clientSecret,
                grant_type: "client_credentials",
                scope: "public"
            }).toString()
        }
        const response = await fetch(url, options)
        if(!response.ok) throw new Error(`HTTP Error Status: ${response.status}`)
        const res = await response.json()
        this.accesToken = res["access_token"]
        this.expiresOn = Date.now() + (res["expires_in"] * 1000)
    }

    protected async refreshToken() {
        console.log(`${(new Date()).toString()} - Token refreshed`)
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                client_id: this.clientId.toString(),
                client_secret: this.clientSecret,
                grant_type: "refresh_token",
                scope: "public"
            }).toString()
        }
        const response = await fetch(url, options)
        if(!response.ok) throw new Error(`HTTP Error Status: ${response.status}`)
        const res = await response.json()
        this.accesToken = res["refresh_token"]
        this.expiresOn = Date.now() + (res["expires_in"] * 1000)
    }

    isExpired(): boolean {
        return (this.expiresOn !== null && this.accesToken !== null) ? Date.now() > this.expiresOn - 10000 : false
    }

    async getHeaders() {
        if (this.accesToken === null) await this.prepareToken()
        else if (this.isExpired()) await this.refreshToken()

        return ({
            "Authorization": `Bearer ${this.accesToken}`,
            "Content-type": "application/json",
            "Accept": "application/json"
        })
    }
}