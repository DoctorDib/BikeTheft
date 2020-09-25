CREATE OR REPLACE FUNCTION motorwatch.create_thread(api_parameters JSON) RETURNS JSON AS
$$
DECLARE
    thread_id_var BIGINT;
    vehicle_id_var BIGINT;
BEGIN
    SET SEARCH_PATH = 'motorwatch', 'public';

    INSERT INTO vehicles (owner_id, status, number_plate, vehicle_make, vehicle_model, vehicle_attributes)
        SELECT (api_parameters ->> 'member_id')::TEXT,
            (api_parameters ->> 'vehicle_status')::INT,
            (api_parameters ->> 'number_plate')::TEXT,
            (api_parameters ->> 'vehicle_make')::TEXT,
            (api_parameters ->> 'vehicle_model')::TEXT,
            (api_parameters ->> 'vehicle_attributes')::JSONB
        RETURNING vehicle_id INTO vehicle_id_var;

    INSERT INTO threads (owner_id, bike_id, thread_attributes)
        SELECT (api_parameters ->> 'member_id')::TEXT,
            vehicle_id_var,
            (api_parameters ->> 'thread_attributes')::JSONB
        RETURNING thread_id INTO thread_id_var;

    RETURN json_build_object('thread_id', thread_id_var, 'vehicle_id', vehicle_id_var);
END;
$$ LANGUAGE PLPGSQL;
