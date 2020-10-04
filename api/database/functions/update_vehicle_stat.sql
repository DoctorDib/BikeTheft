BEGIN
	UPDATE motorwatch.vehicles SET (status) = (api_parameters->>'status')::number
	WHERE (api_parameters->>'vehicle_id')::BIGINT = post_id;

	RETURNING vehicle_id INTO var_vehicle;
	RETURN json_build_object('vehicle', vehicle_id);
END