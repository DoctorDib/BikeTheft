-- FUNCTION: motorwatch.get_thread(json)

-- DROP FUNCTION motorwatch.get_thread(json);

CREATE OR REPLACE FUNCTION motorwatch.get_thread(
	api_parameters json)
    RETURNS json
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
DECLARE
    thread_var JSON;
BEGIN
    SET SEARCH_PATH = 'motorwatch', 'public';

    SELECT row_to_json(SUB.*)::JSONB
    INTO thread_var
    FROM  (
         SELECT
                thread_id,
                owner_id,
                bike_id
         FROM threads
    WHERE thread_id = api_parameters->>'thread_id') SUB;

    RETURN json_build_object('thread', thread_var);
END;
$BODY$;

ALTER FUNCTION motorwatch.get_thread(json)
    OWNER TO postgres;
