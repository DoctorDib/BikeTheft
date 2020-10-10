DECLARE 
	post_is_var JSON;
BEGIN
    INSERT INTO motorwatch.posts (parent_id, poster_id, date_added, post_attributes, type)
    VALUES (
	    (api_parameters->>'parent_id')::BIGINT,
	    (api_parameters->>'poster_id'),
	    (api_parameters->>'date_added')::TIMESTAMP,
	    (api_parameters->>'post_attributes')::JSONB,
	    (api_parameters->>'type')::INTEGER
    )

    RETURNING post_id INTO post_is_var;
	
	RETURN json_build_object('post', post_is_var);
END
