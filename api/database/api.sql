CREATE OR REPLACE FUNCTION motorwatch.api(api_parameters JSON) RETURNS JSON AS
$$
DECLARE
    ret_var JSON;
    f8 TEXT;
BEGIN

    SET SEARCH_PATH = 'motorwatch', 'public';

    CASE WHEN api_parameters->>'method' IN ('get_self') THEN
            ret_var = get_self(api_parameters);
        WHEN api_parameters->>'method' IN ('get_user') THEN
            ret_var = get_user(api_parameters);
        WHEN api_parameters->>'method' IN ('create_thread') THEN
            ret_var = create_thread(api_parameters);
        ELSE
            RETURN json_build_object('error', 'unsupported method');
    END CASE;

    RETURN ret_var;
EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS f8 = PG_EXCEPTION_DETAIL;
    RETURN json_build_object('error', 'api error', 'log_id', motorwatch.log(jsonb_build_object('error', SQLERRM ||' '||f8)));
END;
$$ LANGUAGE PLPGSQL;
