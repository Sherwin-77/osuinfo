"use client"

import { createContext, useContext, useState } from "react";

import { type User } from '@/@types/osu';
import { CacheContextType, type CacheItem } from "@/@types/cache";


export const CacheContext = createContext<CacheContextType | null>(null)


export default function CacheProvider({ children }: { children: React.ReactNode }) {
    const [cache, setCache] = useState<CacheItem[]>([])
    const addCache = (item: User) => setCache([...cache, {
        username: item.username,
        userid: item.id,
        data: item,
        timeout: new Date(Date.now() + 15000)
    }])
    const getCache = (key: string | number): CacheItem | undefined => {
        const curDate = new Date(Date.now())
        const newCache = cache.filter(x => x.timeout > curDate)
        setCache(newCache)
        if (typeof key == "number") {
            return newCache.find(x => x.userid === key);
        } else return newCache.find(x => x.username === key)
    }
    return(
        <CacheContext.Provider value={{cache: cache, getCache: getCache, addCache: addCache}} >
            {children}
        </CacheContext.Provider>
    )
}


export const useCaheContext = () => useContext(CacheContext)