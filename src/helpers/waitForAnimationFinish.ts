import { loadingDuration } from "../constants/duration";

import { sleep } from "./sleep";

export const waitForAnimationFinish = async () => await sleep(loadingDuration);
