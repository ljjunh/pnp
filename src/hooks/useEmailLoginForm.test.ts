import { useEmailLoginForm } from '@/hooks/useEmailLoginForm';

// handleEmailLogin 모킹
jest.mock('@/apis/signin/action', () => ({
  handleEmailLogin: jest.fn()
}));

// useFormState 모킹
jest.mock('react-dom', () => ({
  useFormState: jest.fn(() => [{
    success: false,
    errors: { email: [], server: [] },
    email: ''
  }, jest.fn()])
}));

describe('useEmailLoginForm', () => {
  it('should return expected object shape', () => {
    const hook = useEmailLoginForm();
    
    expect(hook).toHaveProperty('dispatch');
    expect(hook).toHaveProperty('email');
    expect(hook).toHaveProperty('success');
    expect(hook).toHaveProperty('errors');
    
    expect(hook.email).toBe('');
    expect(hook.success).toBe(false);
    expect(hook.errors).toEqual({
      email: [],
      server: []
    });
  });
});