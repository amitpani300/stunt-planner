"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { ApiResponse, ErrorType } from '@/types';
import { InputField } from '@/components/InputField ';

const Home = () => {
    const [building1Height, setBuilding1Height] = useState<number>(0);
    const [building2Height, setBuilding2Height] = useState<number>(0);
    const [distanceBetweenBuildings, setDistanceBetweenBuildings] = useState<number>(0);
    const [traversableArea, setTraversableArea] = useState<number | null>(null);
    const [error, setError] = useState<ErrorType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>, setHeight: React.Dispatch<React.SetStateAction<number>>) => {
        const value = e.target.value.replace(/^0+/, '');
        if (value === '' || !isNaN(Number(value))) {
            setHeight(Number(value));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post<ApiResponse>('/api/calculateArea', {
                building1Height,
                building2Height,
                distanceBetweenBuildings,
            });

            setTraversableArea(response.data.area);
        } catch (err: any) {
            setError(err.response ? err.response.data : { message: err.message || 'An error occurred' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-lg">
                <div className="flex justify-between p-8">
                    <div className="w-1/2 pr-8">
                        <img src="/tightrope.jpg" alt="Image" className="w-full h-auto" />
                    </div>
                    <div className="w-1/2">
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 rounded-lg">
                            <InputField
                                label="Building 1 Height:"
                                value={building1Height}
                                onChange={(e) => handleHeightChange(e, setBuilding1Height)}
                            />
                            <InputField
                                label="Building 2 Height:"
                                value={building2Height}
                                onChange={(e) => handleHeightChange(e, setBuilding2Height)}
                            />
                            <InputField
                                label="Distance Between Buildings:"
                                value={distanceBetweenBuildings}
                                onChange={(e) => handleHeightChange(e, setDistanceBetweenBuildings)}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Calculating...' : 'Calculate Traversable Area'}
                            </button>
                        </form>
                        {error && <p className="mt-4 text-red-500 text-sm font-bold">{error.message}</p>}
                        {!error && traversableArea !== null && (
                            <p className="mt-4 text-sm">Traversable Area: {traversableArea}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;