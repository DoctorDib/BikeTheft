-- FUNCTION: motorwatch.get_vehicle(json)

-- DROP FUNCTION motorwatch.get_vehicle(json);

CREATE OR REPLACE FUNCTION motorwatch.get_vehicle(
	api_parameters json)
    RETURNS json
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
DECLARE
    vehicle_var JSON;
BEGIN
    SET SEARCH_PATH = 'motorwatch', 'public';

    SELECT row_to_json(SUB.*)::JSONB
    INTO vehicle_var
    FROM  (
         SELECT
                vehicle_id,
                owner_id,
                location,
                date_added,
                status,
                number_plate,
                vehicle_make,
                vehicle_model,
                COALESCE(bike_attributes->>'vehicle_image', 'https://icon-library.com/images/vehicle-icon-png/vehicle-icon-png-29.jpg') as image_url,
                COALESCE(bike_attributes->>'features', ARRAY[]) as features,
                COALESCE(bike_attributes->>'description', '') as description
         FROM vehicles
    WHERE vehicle_id = api_parameters->>'vehicle_id'
    OR number_plate = api_parameters->>'number_plate') SUB;

    RETURN json_build_object('vehicle', vehicle_var);
END;
$BODY$;

ALTER FUNCTION motorwatch.get_vehicle(json)
    OWNER TO postgres;
