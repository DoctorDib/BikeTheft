DECLARE 
	post_is_var JSON;
BEGIN
    INSERT INTO motorwatch.posts (parent_id, poster_id, date_added, post_attributes, type)
    VALUES (
	    api_parameters->>'parent_id',
	    api_parameters->>'poster_id',
	    api_parameters->>'date_added',
	    api_parameters->>'post_attributes',
	    api_parameters->>'type'
    )

    RETURNING post_id INTO post_is_var;
END
