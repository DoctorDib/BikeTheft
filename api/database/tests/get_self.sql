DO
$$
DECLARE
    ret_var JSON;
BEGIN

    SELECT motorwatch.api(json_build_object('method', 'get_self', 'member_id', 'a1')) INTO ret_var;

    RAISE NOTICE 'RESULT %', ret_var;

END;
$$ LANGUAGE PLPGSQL;
