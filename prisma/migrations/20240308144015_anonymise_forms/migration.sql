CREATE EVENT anonymise_feedback_form
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    UPDATE Feedback
    SET updatedAt = NOW(),
        fullName = 'REDACTED',
        emailAddress = 'REDACTED'
    WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 YEAR);
END;

CREATE EVENT anonymise_contact_support_form
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    UPDATE SupportRequest
    SET updatedAt = NOW(),
        fullName = 'REDACTED',
        emailAddress = 'REDACTED',
        phoneNumber = 'REDACTED',
        jobRole = 'REDACTED'
    WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 YEAR);
END;

CREATE EVENT anonymise_contact_frf_form
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    UPDATE FrfTeamRequest
    SET updatedAt = NOW(),
        fullName = 'REDACTED',
        emailAddress = 'REDACTED',
        phoneNumber = 'REDACTED',
        jobRole = 'REDACTED'
    WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 YEAR);
END;

CREATE EVENT anonymise_contact_dsp_form
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    UPDATE DataServiceProviderRequest
    SET updatedAt = NOW(),
        fullName = 'REDACTED',
        emailAddress = 'REDACTED',
        phoneNumber = 'REDACTED',
        jobRole = 'REDACTED'
    WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 YEAR);
END;