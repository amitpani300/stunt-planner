import { NextApiRequest } from "next";
import { Readable } from "stream"
import { POST } from "../route";


describe('POST API Handler', () => {

    it('should return 400 if parameters are missing', async () => {
        const req = {
            body: JSON.stringify({})
        };
        const response = await POST(req as any);
        expect(response.status).toBe(400);
    });

    it('should return 200 with calculated area', async () => {
        const req = {
            body: JSON.stringify({ building1Height: 10, building2Height: 20, distanceBetweenBuildings: 30 })
        };

        const response = await POST(req as any);
        expect(response.status).toBe(200);
    });
});
