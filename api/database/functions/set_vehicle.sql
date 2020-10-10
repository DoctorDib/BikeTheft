DECLARE 
	vehicle_is_var JSON;
BEGIN
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

    RETURNING vehicle_id INTO vehicle_is_var;

	RETURN json_build_object('vehicle', vehicle_is_var);
END
