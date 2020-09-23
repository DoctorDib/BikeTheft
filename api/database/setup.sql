DO
$$
BEGIN

    CREATE EXTENSION IF NOT EXISTS postgis;
    DROP SCHEMA IF EXISTS bikebounty CASCADE;

    CREATE SCHEMA IF NOT EXISTS bikebounty;

    --Member Details
    CREATE TABLE IF NOT EXISTS bikebounty.members(
        member_id TEXT PRIMARY KEY NOT NULL,
        member_attributes  JSONB,
        date_added          TIMESTAMP DEFAULT NOW()
    );

    --Category Details
    CREATE TABLE IF NOT EXISTS bikebounty.bikes(
        bike_id BIGSERIAL PRIMARY KEY,
        category_attributes   JSONB
    );

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'ERROR CREATING TABLES %', SQLERRM;
END;
$$ LANGUAGE PLPGSQL;
