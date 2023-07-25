import { render, screen } from '@testing-library/react';
import Home from './Home';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));
  
  describe('Home component', () => {
    it('should render the "Add Post" button', () => {
      render(<Home />);
      const addButton = screen.getByRole('button', { name: /add post/i });
  
      expect(addButton).toBeInTheDocument();
    });
  
   
});
