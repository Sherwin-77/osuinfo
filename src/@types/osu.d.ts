export type GameMode = "fruits" | "mania" | "osu" | "taiko"

export type UserBadge = {
    awarded_at: number;
    description: string;
    image_url: string;
    url: string;
}

export interface UserStatistic {
    count_100: number;
    count_300: number;
    count_50: number;
    count_miss: number;
    country_rank: number?;
    grade_counts: {
        a: number;
        s: number;
        sh: number;
        ss: number;
        ssh: number;
    }
    hit_accuracy: number;
    is_ranked: boolean;
    level: {
        current: number;
        progress: number;
    }
    maximum_combo: number;
    play_count: number;
    play_time: number;
    pp: number;
    pp_exp: number; // Experimental
    global_rank: number?;
    global_rank_exp: number?; // Experimental
    ranked_score: number;
    replays_watched_by_others: number;
    total_hits: number;
    total_score: number;
}

export interface User {
    avatar_url: string;
    country_code: string;
    default_group: string?;
    id: number;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string?;
    pm_friends_only: boolean;
    profile_colour: string?;
    username: string;
    beatmap_playcounts_count?: number;
    statistics: UserStatistic;

    badges: UserBadge[];
    discord: string?;
    has_supported: bool;
    interests: string?;
    join_date: string;
    kudosu: {
        available: number;
        total: number;
    };
    location: string?;
    max_blocks: number;
    max_friends: number;
    occupation: string?;
    playmode: GameMode;
    playstyle: string[];
    post_count: number;
    profile_order: string[];
    title: string?;
    title_url: string?;
    twitter: string?;
    website: string?;
    country?: {
        code: string;
        name: string;
    };
    cover?: {
        custom_url: string;
        url: string;
        id: string?;
    };
    is_restricted?: bool;
}