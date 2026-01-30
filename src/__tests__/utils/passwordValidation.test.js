import { validatePassword, passwordsMatch, getPasswordRequirements } from '../../utils/passwordValidation';

describe('validatePassword', () => {
  test('should return valid for a strong password', () => {
    const result = validatePassword('Test@1234');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should fail for password shorter than 8 characters', () => {
    const result = validatePassword('Test@1');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must be at least 8 characters long');
  });

  test('should fail for password without uppercase letter', () => {
    const result = validatePassword('test@1234');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one uppercase letter');
  });

  test('should fail for password without lowercase letter', () => {
    const result = validatePassword('TEST@1234');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one lowercase letter');
  });

  test('should fail for password without number', () => {
    const result = validatePassword('Test@word');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one number');
  });

  test('should fail for password without special character', () => {
    const result = validatePassword('Test1234');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one special character');
  });

  test('should fail for empty password', () => {
    const result = validatePassword('');
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('should return multiple errors for weak password', () => {
    const result = validatePassword('test');
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
  });
});

describe('passwordsMatch', () => {
  test('should return true for matching passwords', () => {
    expect(passwordsMatch('Test@1234', 'Test@1234')).toBe(true);
  });

  test('should return false for non-matching passwords', () => {
    expect(passwordsMatch('Test@1234', 'Test@4321')).toBe(false);
  });

  test('should return true for empty passwords', () => {
    expect(passwordsMatch('', '')).toBe(true);
  });
});

describe('getPasswordRequirements', () => {
  test('should return all requirements met for strong password', () => {
    const result = getPasswordRequirements('Test@1234');
    expect(result.hasMinLength).toBe(true);
    expect(result.hasUppercase).toBe(true);
    expect(result.hasLowercase).toBe(true);
    expect(result.hasNumber).toBe(true);
    expect(result.hasSpecialChar).toBe(true);
  });

  test('should return false for missing uppercase', () => {
    const result = getPasswordRequirements('test@1234');
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(true);
  });

  test('should return false for short password', () => {
    const result = getPasswordRequirements('Test@1');
    expect(result.hasMinLength).toBe(false);
  });

  test('should return false for missing special character', () => {
    const result = getPasswordRequirements('Test1234');
    expect(result.hasSpecialChar).toBe(false);
  });
});
