import Home from '@/app/page';
import { logRoles, render, screen } from '@testing-library/react';

describe('Home Component', () => {
  test('jest 테스트', () => {
    render(<Home />);
    const welcomeElement = screen.getByText(/Hello/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  test('msw 테스트', async () => {
    const { container } = render(<Home />);
    const messageElement = await screen.findByText('Test message');
    logRoles(container);
    expect(messageElement).toBeInTheDocument();
  });
});
