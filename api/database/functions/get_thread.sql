CREATE OR REPLACE FUNCTION motorwatch.get_thread(api_parameters json) RETURNS JSON AS
$$
DECLARE
    thread_var JSON;
    vehicle_var JSON;
    owner_var JSON;
    posts_var JSON;
BEGIN
    SET SEARCH_PATH = 'motorwatch', 'public';

    SELECT row_to_json(SUB.*)::JSONB
        INTO vehicle_var
        FROM  (
             SELECT
                    vehicle_id,
                    location,
                    vehicles.date_added,
                    status,
                    number_plate,
                    vehicle_make,
                    vehicle_model,
                    COALESCE(vehicle_attributes->>'vehicle_image', '') as image,
                    COALESCE(vehicle_attributes->>'features', '')::JSON as features,
                    COALESCE(vehicle_attributes->>'description', '') as description
             FROM threads
             INNER JOIN vehicles USING (vehicle_id)
            WHERE thread_id = (api_parameters->>'thread_id')::INTEGER
        ) SUB;

    SELECT row_to_json(SUB.*)::JSONB
        INTO owner_var
        FROM  (
             SELECT
                    owner_id,
                    member_attributes
             FROM threads
             INNER JOIN members ON members.member_id = owner_id
            WHERE thread_id = (api_parameters->>'thread_id')::INTEGER
        ) SUB;

    SELECT json_agg(SUB2.row_to_json)
        INTO  posts_var
        FROM (
            SELECT row_to_json(SUB.*) FROM (
                SELECT	poster_id,
                        member_attributes,
                        posts.date_added,
                        post_id,
                        post_attributes
                FROM threads
                INNER JOIN posts ON posts.parent_id = thread_id
                INNER JOIN members ON members.member_id = posts.poster_id
                WHERE thread_id = (api_parameters->>'thread_id')::INTEGER
            ) SUB
        ) SUB2;

    SELECT row_to_json(SUB.*)::JSONB
        INTO thread_var
        FROM  (
            SELECT
                thread_id,
                thread_attributes,
                threads.date_added
            FROM threads
            WHERE thread_id = (api_parameters->>'thread_id')::INTEGER
        ) SUB;

    RETURN json_build_object('thread_meta', thread_var, 'vehicle', vehicle_var, 'owner', owner_var, 'posts', posts_var);
END;
$$ LANGUAGE PLPGSQL;
