import { sendGAEvent } from "@next/third-parties/google";

export const event = (
    action: string,
    params: Record<string, string | number> = {}
): void => {
    sendGAEvent({ event: action, ...params });
};

export default event;
