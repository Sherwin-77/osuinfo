import { type User } from "./osu";

export interface CacheItem {
    username: string;
    userid: number;
    data: User;
    timeout: Date;
}

export type CacheContextType = {
    cache: CacheItem[];
    getCache: (key: string | number) => CacheItem | undefined;
    addCache: (item: User) => void;
};