DO
$$
BEGIN

    CREATE EXTENSION IF NOT EXISTS postgis;
    DROP SCHEMA IF EXISTS motorwatch CASCADE;

    CREATE SCHEMA IF NOT EXISTS motorwatch;

    -- Member Details
    CREATE TABLE IF NOT EXISTS motorwatch.members(
        member_id TEXT PRIMARY KEY NOT NULL,
        member_attributes  JSONB,
        date_added          TIMESTAMP DEFAULT NOW()
    );

    -- Vehicle Base
    CREATE TABLE IF NOT EXISTS motorwatch.vehicles(
        vehicle_id BIGSERIAL PRIMARY KEY,
        owner_id TEXT,
        location GEOMETRY(Linestring, 4326),
        date_added TIMESTAMP DEFAULT NOW(),
        status INT,
        number_plate TEXT,
        vehicle_make TEXT,
        vehicle_model TEXT,
        vehicle_category TEXT,
        vehicle_attributes JSONB,

        CONSTRAINT vehicle_owner_id FOREIGN KEY(owner_id)
            REFERENCES motorwatch.members (member_id)
            MATCH SIMPLE ON DELETE CASCADE
    );

    -- Threads
    CREATE TABLE IF NOT EXISTS motorwatch.threads (
        thread_id BIGSERIAL PRIMARY KEY,
        owner_id TEXT,
        vehicle_id BIGINT,
        date_added TIMESTAMP DEFAULT NOW(),
        thread_attributes JSONB,

        CONSTRAINT thread_owner_id FOREIGN KEY(owner_id)
            REFERENCES motorwatch.members (member_id)
            MATCH SIMPLE ON DELETE CASCADE,

        CONSTRAINT thread_vehicle_id FOREIGN KEY(vehicle_id)
            REFERENCES motorwatch.vehicles (vehicle_id)
            MATCH SIMPLE ON DELETE CASCADE
    );

    -- Posts
    CREATE TABLE IF NOT EXISTS motorwatch.posts (
        post_id BIGSERIAL PRIMARY KEY,
        parent_id BIGINT,
        poster_id TEXT,
        date_added TIMESTAMP DEFAULT NOW(),
        post_attributes JSONB,

        CONSTRAINT post_thread_id FOREIGN KEY(parent_id)
            REFERENCES motorwatch.threads (thread_id)
            MATCH SIMPLE ON DELETE CASCADE,
        CONSTRAINT post_owner_id FOREIGN KEY(poster_id)
            REFERENCES motorwatch.members (member_id)
            MATCH SIMPLE ON DELETE CASCADE
    );

    --Log Messages
    CREATE TABLE IF NOT EXISTS motorwatch.logs(
        log_id          BIGSERIAL PRIMARY KEY,
        log_timestamp   TIMESTAMP DEFAULT NOW(),
        log_message     JSONB
    );

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'ERROR CREATING TABLES %', SQLERRM;
END;
$$ LANGUAGE PLPGSQL;
