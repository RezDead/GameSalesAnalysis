export const GET_GAME_INFO = `
    SELECT 
        g.name,
        g.release_date,
        g.esrb_rating,
        g.metacritic_score,
        g.rawg_rating,
        g.playtime,
        g.description,
        COALESCE(ARRAY_AGG(DISTINCT d.developer_name) FILTER (WHERE d.developer_name IS NOT NULL), '{}') AS developers,
        COALESCE(ARRAY_AGG(DISTINCT pu.publisher_name) FILTER (WHERE pu.publisher_name IS NOT NULL), '{}') AS publishers,
        COALESCE(ARRAY_AGG(DISTINCT pl.platform_name) FILTER (WHERE pl.platform_name IS NOT NULL), '{}') AS platforms,
        COALESCE(ARRAY_AGG(DISTINCT ge.genre_name) FILTER (WHERE ge.genre_name IS NOT NULL), '{}') AS genres,
        s.global_sales,
        s.na_sales,
        s.eu_sales,
        s.jp_sales,
        s.other_sales,
        sl.price,
        sl.estimated_owners,
        sl.positive_reviews
    FROM game g
    LEFT JOIN gamedeveloper gd
        ON gd.game_id = g.game_id
    LEFT JOIN developer d
        ON d.developer_id = gd.developer_id
    LEFT JOIN gamepublisher gp
        ON gp.game_id = g.game_id
    LEFT JOIN publisher pu
        ON pu.publisher_id = gp.publisher_id
    LEFT JOIN gameplatform gpl
        ON gpl.game_id = g.game_id
    LEFT JOIN platform pl
        ON pl.platform_id = gpl.platform_id
    LEFT JOIN sales s
        ON s.game_id = g.game_id
    LEFT JOIN gamegenre gg
        ON gg.game_id = g.game_id
    LEFT JOIN genre ge
        ON ge.genre_id = gg.genre_id
    LEFT JOIN steamlisting sl
        ON sl.game_id = g.game_id
    WHERE g.game_id = $1
    GROUP BY 
        g.game_id,
        g.name,
        g.release_date,
        g.esrb_rating,
        g.metacritic_score,
        g.rawg_rating,
        g.playtime,
        g.description,
        s.global_sales,
        s.na_sales,
        s.eu_sales,
        s.jp_sales,
        s.other_sales,
        sl.price,
        sl.estimated_owners,
        sl.positive_reviews;
`;

export const GET_GAMES = `
    SELECT game_id, name 
    FROM game 
    ORDER BY metacritic_score DESC NULLS LAST, rawg_rating DESC NULLS LAST
    LIMIT $1 OFFSET $2
`;