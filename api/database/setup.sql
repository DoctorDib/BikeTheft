DO
$$
BEGIN

    CREATE EXTENSION IF NOT EXISTS postgis;
    DROP SCHEMA IF EXISTS bikebounty CASCADE;

    CREATE SCHEMA IF NOT EXISTS bikebounty;

    -- Member Details
    CREATE TABLE IF NOT EXISTS bikebounty.members(
        member_id TEXT PRIMARY KEY NOT NULL,
        member_attributes  JSONB,
        date_added          TIMESTAMP DEFAULT NOW()
    );

    -- Bike Base
    CREATE TABLE IF NOT EXISTS bikebounty.bikes(
        bike_id BIGSERIAL PRIMARY KEY,
        owner_id TEXT,
        location GEOMETRY(Linestring, 4326),
        date_added TIMESTAMP DEFAULT NOW(),
        status INT,
        number_plate TEXT,
        bike_make TEXT,
        bike_model TEXT,
        bike_attributes   JSONB,

        CONSTRAINT bikes_owner_id FOREIGN KEY(owner_id)
            REFERENCES bikebounty.members (member_id)
            MATCH SIMPLE ON DELETE CASCADE
    );

    -- Threads
    CREATE TABLE IF NOT EXISTS bikebounty.threads (
        thread_id BIGSERIAL PRIMARY KEY,
        owner_id TEXT,
        bike_id,
        thread_attributes JSONB,

        CONSTRAINT thread_owner_id FOREIGN KEY(owner_id)
            REFERENCES bikebounty.members (member_id)
            MATCH SIMPLE ON DELETE CASCADE,

        CONSTRAINT thread_bike_id FOREIGN KEY(bike_id)
            REFERENCES bikebounty.bikes (bike_id)
            MATCH SIMPLE ON DELETE CASCADE
    )

    -- Posts
    CREATE TABLE IF NOT EXISTS bikebounty.posts (
        post_id BIGSERIAL PRIMARY KEY,
        parent_id BIGINT,
        poster_id TEXT,
        date_added TIMESTAMP DEFAULT NOW(),
        post_attributes JSONB,

        CONSTRAINT post_thread_id FOREIGN KEY(parent_id)
            REFERENCES bikebounty.threads (thread_id)
            MATCH SIMPLE ON DELETE CASCADE,
        CONSTRAINT post_owner_id FOREIGN KEY(poster_id)
            REFERENCES bikebounty.members (member_id)
            MATCH SIMPLE ON DELETE CASCADE,
    )

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'ERROR CREATING TABLES %', SQLERRM;
END;
$$ LANGUAGE PLPGSQL;
