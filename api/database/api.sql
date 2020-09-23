CREATE OR REPLACE FUNCTION bikebounty.api(api_parameters JSON) RETURNS JSON AS
$$
DECLARE
    ret_var JSON;
    f8 TEXT;
BEGIN

    SET SEARCH_PATH = 'bikebounty', 'public';

    CASE WHEN api_parameters->>'method' IN ('get_self') THEN
            ret_var = get_self(api_parameters);
         ELSE
            RETURN json_build_object('error', 'unsupported method');
    END CASE;

    RETURN ret_var;
EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS f8 = PG_EXCEPTION_DETAIL;
    RETURN json_build_object('error', 'api error', 'log_id', bikebounty.log(jsonb_build_object('error', SQLERRM ||' '||f8)));
END;
$$ LANGUAGE PLPGSQL;
