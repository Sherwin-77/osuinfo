"use client"
import { type Component, FormEvent, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { type User } from "@/@types/osu";
import { type CacheContextType } from '@/@types/cache';

import './styles.css'
import OsuInfo from './components/osuinfo';
import Loading from './loading';
import Image from 'next/image';
import { useCaheContext } from './cache-context';

export default function Home() {
  const [username, setUsername] = useState<string>()
  const [uid, setUid] = useState<number>()
  const [loading, setLoading] = useState<boolean>(false)
  const [info, setInfo] = useState<object>()
  const { cache, getCache, addCache } = useCaheContext() as CacheContextType

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if(loading) return
    if (!(uid || username)) {
      toast("At least uid or username is required", { autoClose: 3000, type: "error", theme: "dark", pauseOnHover: false })
      return
    }
    const endpoint = "/api/search"
    let user = uid || username
    let key = uid ? "id" : "username"
    if (!user) return // Just to suppress error
    setLoading(true)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: user.toString(), key: key })
    }
    const response = await fetch(endpoint, options)
    setLoading(false)
    if (!response.ok) {
      if (response.status == 404) toast("User not found", { autoClose: 4000, type: "error", theme: "dark", position: "top-center", pauseOnHover: false })
      else toast(`Unhandled error occured. Please try again later`, { autoClose: 3000, type: "error", theme: "dark", position: "top-center", pauseOnHover: false })
      return
    }
    const res = await response.json()
    setInfo(res)
  }

  return (
    <main className="d-flex justify-content-center align-items-center flex-column">
      <h1>Get your osu! information</h1>
      <div className="container" style={{ width: "30%" }}>
        <div className="center my-3">
          <Image src="./osu!.svg" alt="Logo" width={0} height={0} style={{ width: "50%", height: "auto" }} />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user" className="form-label mt-3">Search username</label>
          <input type="text" name="user" id="user" className="form-control mb-3 glow" value={username} onInput={e => setUsername(e.currentTarget.value)} />
          <label htmlFor="uid" className="form-label mt-3">Or search by uid</label>
          <input type="text" name="uid" id="uid" className="form-control mb-3 glow" value={uid || ""} onInput={e => {
            let n = parseInt(e.currentTarget.value)
            if (isNaN(n) && e.currentTarget.value !== "") return
            if (e.currentTarget.value === "") setUid(0)
            else setUid(n)
          }} />
          <button type="submit" className="gradient-button my-3">Get Info</button>
        </form>
      </div>
      {loading ? <Loading /> : null}
      <OsuInfo data={info as User} />
    </main>
  )
}
