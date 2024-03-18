import { ChangeEvent } from "react";

export interface BuildingsDetailsRequest {
    building1Height: number;
    building2Height: number;
    distanceBetweenBuildings: number;
}

export interface ApiResponse {
    area: number;
}

export interface ErrorType {
    message: string;
}

export interface InputFieldProps {
    label: string;
    value: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ImageSection = () => (
    <div className= "w-1/2 pr-8" >
    <img src="/tightrope.jpg" alt = "Image" className = "w-full h-auto" />
        </div>
  );