BEGIN
	SET SEARCH_PATH = 'motorwatch', 'public';
    
	RETURN json_build_object('exists', EXISTS(
		SELECT number_plate FROM vehicles WHERE number_plate = api_parameters->>'number_plate')
	);
END;
