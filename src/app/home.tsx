"use client"
import { type Component, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { type User } from "../../osutype";

import './styles.css'
import OsuInfo from './components/osuinfo';

export default function Home() {
  const [username, setUsername] = useState<string>()
  const [uid, setUid] = useState<number>()
  const [info, setInfo] = useState<object>()
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!(uid || username)) {
      toast("At least uid or username is required", { autoClose: 3000, type: "error" })
      return
    }
    const endpoint = "/api/search"
    let user = uid ?? username
    let key = uid ? "id" : "username"
    if (!user) return // Just to suppress error
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: user.toString(), key: key })
    }
    const response = await fetch(endpoint, options)
    const res = await response.json()
    setInfo(res)
  }
  const infoComponent = (() => {
    if (!info) return null
    const inf = info as User
    return (<OsuInfo data={inf} />)
  })()

  return (
    <main className="d-flex justify-content-center align-items-center flex-column">
      <h1>Get your osu! information</h1>
      <div className="container" style={{ width: "280px" }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user" className="form-label mt-3">Search username</label>
          <input type="text" name="user" id="user" className="form-control mb-3" value={username} onInput={e => setUsername(e.currentTarget.value)} />
          <label htmlFor="uid" className="form-label mt-3">Or search by uid</label>
          <input type="text" name="uid" id="uid" className="form-control mb-3" value={uid} onInput={e => {
            let n = parseInt(e.currentTarget.value)
            if (isNaN(n) && e.currentTarget.value !== "") return
            if (e.currentTarget.value === "") setUid(0)
            else setUid(n)
          }} />
          <button type="submit" className="btn btn-secondary">Get Info</button>
        </form>
      </div>
      {infoComponent}
    </main>
  )
}
