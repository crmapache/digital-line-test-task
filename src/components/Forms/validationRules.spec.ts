import validationRules from '@components/Forms/validationRules';

describe('Validation Rules', () => {
  test('required', () => {
    expect(validationRules.required({ value: '' })).toBe('This field is required');
    expect(validationRules.required({ value: '', error: 'x' })).toBe('x');
    expect(validationRules.required({ value: 'x' })).toBe(true);
  });

  test('email', () => {
    expect(validationRules.email({ value: '' })).toBe('Please enter your email');
    expect(validationRules.email({ value: 'spacenear@ya.r', error: 'x' })).toBe('x');
    expect(validationRules.email({ value: 'spacenear@ya.ru' })).toBe(true);
  });

  test('min', () => {
    expect(validationRules.min({ value: '', payload: 2 })).toBe('Minimum field value is 2');
    expect(validationRules.min({ value: 'x', payload: 2, error: 'x' })).toBe('x');
    expect(validationRules.min({ value: 'xx', payload: 2 })).toBe(true);
  });

  test('max', () => {
    expect(validationRules.max({ value: 'xxx', payload: 2 })).toBe('Maximum field value is 2');
    expect(validationRules.max({ value: 'xxx', payload: 2, error: 'x' })).toBe('x');
    expect(validationRules.max({ value: 'xx', payload: 2 })).toBe(true);
  });

  test('regex', () => {
    expect(validationRules.regex({ value: 'ss.xx-', payload: /.+\..+-/ })).toBe(true);
    expect(validationRules.regex({ value: '', payload: /.+\..+-/ })).toBe(
      'Field not match regex validation',
    );
    expect(validationRules.regex({ value: '', payload: /.+\..+-/, error: 'x' })).toBe('x');
  });

  test('checked', () => {
    expect(validationRules.checked({ value: false })).toBe('Field must be checked');
    expect(validationRules.checked({ value: false, error: 'x' })).toBe('x');
    expect(validationRules.checked({ value: true })).toBe(true);
  });

  test('selected', () => {
    expect(validationRules.selected({ value: '', payload: '' })).toBe('Select field error');
    expect(validationRules.selected({ value: '', payload: '', error: 'x' })).toBe('x');
    expect(validationRules.selected({ value: 'x', payload: '' })).toBe(true);
    expect(validationRules.selected({ value: 'x', payload: 'y', error: 'x' })).toBe('x');
    expect(validationRules.selected({ value: ['x', 'y'], payload: ['y'] })).toBe(true);
    expect(validationRules.selected({ value: ['x'], payload: ['y'], error: 'x' })).toBe('x');
  });
});
