-- FUNCTION: motorwatch.get_post(json)

-- DROP FUNCTION motorwatch.get_post(json);

CREATE OR REPLACE FUNCTION motorwatch.get_post(
	api_parameters json)
    RETURNS json
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
DECLARE
    post_var JSON;
BEGIN
    SET SEARCH_PATH = 'motorwatch', 'public';

    SELECT row_to_json(SUB.*)::JSONB
    INTO post_var
    FROM  (
         SELECT
            post_id,
            parent_id,
            poster_id,
            date_added
         FROM posts
    WHERE post_id = api_parameters->>'post_id') SUB;

    RETURN json_build_object('post', post_var);
END;
$BODY$;

ALTER FUNCTION motorwatch.get_post(json)
    OWNER TO postgres;
