import axios from 'axios';
import Home from '../app/page';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

jest.mock('axios');

describe('Home component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should calculate traversable area', async () => {
        const mockResponse = { data: { area: 100 } };
        (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(mockResponse);

        render(<Home />);

        fireEvent.change(screen.getByLabelText('Building 1 Height:'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Building 2 Height:'), { target: { value: '20' } });
        fireEvent.change(screen.getByLabelText('Distance Between Buildings:'), { target: { value: '30' } });

        fireEvent.click(screen.getByRole('button', { name: 'Calculate Traversable Area' }));

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith('/api/calculateArea', {
            building1Height: 10,
            building2Height: 20,
            distanceBetweenBuildings: 30,
        });

        await waitFor(() => {
            expect(screen.getByText('Traversable Area: 100')).toBeInTheDocument();
        });
    });
});