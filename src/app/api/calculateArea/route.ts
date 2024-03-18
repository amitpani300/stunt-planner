import { NextResponse } from "next/server";
import { calculateTraversableArea } from "../../../utils/traversableAreaCalculator";
import { NextApiRequest } from 'next';
import { customReadStreamToString, readStreamToString } from "../../../utils/utils";

export const POST = async (req: NextApiRequest): Promise<NextResponse> => {
    try {
        const bodyString = await customReadStreamToString(req.body);
        const { building1Height, building2Height, distanceBetweenBuildings } = JSON.parse(bodyString);

        if (!building1Height || !building2Height || !distanceBetweenBuildings) {
            return NextResponse.json({ message: 'Mandatory field(s) missing' }, { status: 400 });
        }
        const traversableArea = calculateTraversableArea(building1Height, building2Height, distanceBetweenBuildings);
        if (isNaN(traversableArea)) {
            return NextResponse.json({ message: "Error: Traversable area is NaN" }, { status: 500 });
        }
        const area = parseFloat(traversableArea.toFixed(2));
        return NextResponse.json({ area }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
};

