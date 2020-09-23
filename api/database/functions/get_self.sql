CREATE OR REPLACE FUNCTION bikebounty.get_self(api_parameters JSON) RETURNS JSON AS
$$
DECLARE
    member_var JSON;
BEGIN
    SET SEARCH_PATH = 'bikebounty', 'public';

    SELECT row_to_json(SUB.*)::JSONB
    INTO member_var
    FROM  (
         SELECT
                member_id,
                member_attributes->>'name' AS name,
                COALESCE(member_attributes->>'profile_image', 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png') as image_url
         FROM members
    WHERE member_id = api_parameters->>'member_id') SUB;

    RETURN json_build_object('member', member_var);
END;
$$ LANGUAGE PLPGSQL;
