import PasswordValidator from 'password-validator';

export default new PasswordValidator()
    .is().min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digits
    .has()
    .symbols()
    .has()
    .not()
    .spaces(); // Should not have spaces
