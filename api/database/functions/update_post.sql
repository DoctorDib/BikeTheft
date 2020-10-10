DECLARE 
	post_is_var JSON;
BEGIN
	UPDATE motorwatch.posts SET (post_attributes) = (api_parameters->>'post_attributes')::JSON
	WHERE (api_parameters->>'post_id')::BIGINT = post_id;

	RETURNING post_id INTO post_is_var;
	RETURN json_build_object('post', post_is_var);
END