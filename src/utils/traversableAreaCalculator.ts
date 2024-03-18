export const calculateTraversableArea = (building1Height: number, building2Height: number, distanceBetweenBuildings: number): number => {
    const angle: number = Math.atan(Math.abs(building2Height - building1Height) / distanceBetweenBuildings);
    const ropeLength: number = distanceBetweenBuildings / Math.cos(angle);
    const areaCovered: number = ropeLength * Math.min(building1Height, building2Height);
    return areaCovered;
};

