import { RankHistory } from './osu.d';
export type GameMode = "fruits" | "mania" | "osu" | "taiko"
export type Timestamp = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;;

export type RankHighest = {
    rank: number;
    updated_at: Timestamp;
}

export type RankHistory = {
    mode: GameMode;
    data: number[];
}

export type UserAccountHistory = {
    description: string?;
    id: number;
    length: number; // In seconds
    permanent: boolean;
    timestamp: Timestamp;
    type: "note" | "restriction" | "silence"
}

export type UserGroup = {
    playmodes: string[]?;
}

export type UserBadge = {
    awarded_at: number;
    description: string;
    image_url: string;
    url: string;
}

// Unsure about this
export type UserMonthlyPlaycount = {
    start_date: string;
    count: number;
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


export interface UserCompact {
    avatar_url: string;
    country_code: string;
    default_group: string?;
    id: number;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: Timestamp?;
    pm_friends_only: boolean;
    profile_colour: string?;
    username: string;

    account_history?: UserAccountHistory[];
    badges?: UserBadge[];
    beatmap_playcounts_count?: number;
    blocks?: unknown;
    country?: unknown;
    cover?: unknown;
    favourite_beatmapset_count?: number;
    follow_user_mapping?: number[];
    follower_count?: number;
    friends?: unknown;
    graveyard_beatmapset_count?: number;
    groups?: UserGroup[];
    guest_beatmapset_count?: number;
    is_restricted?: boolean?;
    loved_beatmapset_count?: number;
    mapping_follower_count?: number;
    monthly_playcounts?: UserMonthlyPlaycount[];
    page?: string;
    pending_beatmapset_count?: number;
    previous_usernames?: string[];
    rank_highest?: RankHighest?;
    rank_history?: RankHistory?;
    ranked_beatmapset_count?: number;
    replays_watched_counts?: number;
    scores_best_count?: number;
    scores_first_count?: number;
    scores_recent_count?: number;
    statistics?: unknown;
    statistics_rulesets: unknown; // Will figure out later
    support_level?: number;
    unread_pm_count?: unknown;
    user_achievements?: unknown;
    user_preferences?: unknown;
}

export interface User extends UserCompact {
    cover_url: string;
    discord: string?;
    has_supported: boolean;
    interests: string?;
    join_date: Timestamp;
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
        custom_url: string?;
        url: string;
        id: string?;
    };
    is_restricted?: boolean;

    account_history: UserAccountHistory[];
    badges: UserBadge[];
    beatmap_playcounts_count: number;
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    groups: UserGroup[];
    
    loved_beatmapset_count?: number;
    mapping_follower_count?: number;
    monthly_playcounts?: UserMonthlyPlaycount[];
    page: string;
    pending_beatmapset_count?: number;
    previous_usernames: string[];
    rank_highest: RankHighest?;
    rank_history: RankHistory?;
    ranked_beatmapset_count: number;
    replays_watched_counts: number;
    scores_best_count: number;
    scores_first_count: number;
    scores_recent_count: number;
    statistics: UserStatistic;
    support_level: number;
    user_achievements: unknown;
}

export interface OsuWebData {
    current_mode: GameMode;
    scores_notice: unknown;
    user: User & {
        is_admin: boolean;
        is_bng: boolean,
        is_full_bn: boolean,
        is_gmt: boolean,
        is_limited_bn: boolean,
        is_moderator: boolean,
        is_nat: boolean,
        is_restricted: boolean,
        is_silenced: boolean
    };
}