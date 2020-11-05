DECLARE
    thread_id_var BIGINT;
    vehicle_id_var BIGINT;
BEGIN
    SET SEARCH_PATH = 'motorwatch', 'public';

    INSERT INTO motorwatch.vehicles (owner_id, location, status, number_plate, make, model, category, vehicle_attributes, vin)
    VALUES (
		api_parameters->>'owner_id',
		(api_parameters->>'location')::GEOMETRY,
		(api_parameters->>'status')::INTEGER,
		api_parameters->>'number_plate',
		api_parameters->>'make',
		api_parameters->>'model',
		(api_parameters->>'category')::INTEGER,
		(api_parameters->>'vehicle_attributes')::JSON,
		api_parameters->>'vin'
    )

    RETURNING vehicle_id INTO vehicle_id_var;

    INSERT INTO threads (owner_id, vehicle_id, thread_attributes)
        SELECT (api_parameters ->> 'owner_id')::TEXT,
            vehicle_id_var,
            (api_parameters ->> 'thread_attributes')::JSONB
        RETURNING thread_id INTO thread_id_var;

    RETURN json_build_object('thread_id', thread_id_var, 'vehicle_id', vehicle_id_var);
END;
