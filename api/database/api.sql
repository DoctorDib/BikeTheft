DECLARE
    ret_var JSON;
    f8 TEXT;
BEGIN

    SET SEARCH_PATH = 'motorwatch', 'public';

    CASE WHEN api_parameters->>'method' IN ('get_self') THEN
            ret_var = get_self(api_parameters);
        WHEN api_parameters->>'method' IN ('get_user') THEN
            ret_var = get_user(api_parameters);
        WHEN api_parameters->>'method' IN ('get_vehicle') THEN
            ret_var = get_vehicle(api_parameters);
        WHEN api_parameters->>'method' IN ('get_thread') THEN
            ret_var = get_thread(api_parameters);
        WHEN api_parameters->>'method' IN ('get_forum') THEN
            ret_var = get_forum(api_parameters);
        WHEN api_parameters->>'method' IN ('set_post') THEN
            ret_var = set_post(api_parameters);
        WHEN api_parameters->>'method' IN ('update_post') THEN
            ret_var = update_post(api_parameters);
        WHEN api_parameters->>'method' IN ('create_thread') THEN
            ret_var = create_thread(api_parameters);
        WHEN api_parameters->>'method' IN ('set_vehicle') THEN
            ret_var = set_vehicle(api_parameters);
		WHEN api_parameters->>'method' IN ('check_number_plate') THEN
            ret_var = check_number_plate(api_parameters);
        ELSE
            RETURN json_build_object('error', 'unsupported method');
    END CASE;

    RETURN ret_var;
EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS f8 = PG_EXCEPTION_DETAIL;
    RETURN json_build_object('error', 'api error', 'log_id', motorwatch.log(jsonb_build_object('error', SQLERRM ||' '||f8)));
END;
