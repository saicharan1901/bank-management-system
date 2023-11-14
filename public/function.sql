DELIMITER //

CREATE FUNCTION calculate_interest(loan_amount DECIMAL(10, 2), interest_rate DECIMAL(8, 2)) RETURNS DECIMAL(10, 2) DETERMINISTIC
BEGIN
    DECLARE calculated_interest DECIMAL(10, 2);
    SET calculated_interest = (loan_amount * interest_rate) / 100;
    RETURN calculated_interest;
END //

DELIMITER ;
