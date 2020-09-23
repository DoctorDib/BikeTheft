CREATE OR REPLACE FUNCTION bikebounty.log(log_message JSONB) RETURNS BIGINT AS
$$
DECLARE
    log_id_var BIGINT;
BEGIN

    INSERT INTO bikebounty.logs(log_message)
    SELECT log_message
    RETURNING log_id
    INTO log_id_var;

    RETURN log_id_var;
END;
$$
LANGUAGE PLPGSQL;
