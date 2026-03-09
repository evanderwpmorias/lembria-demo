import { eventHandler } from "h3";
import { defineNitroPlugin } from "nitropack/runtime";

import { corsHandler } from "#server/helpers/0.0.1/cors";

export default defineNitroPlugin((nitroApp) => {
	nitroApp.h3App.use(
		eventHandler((event) => {
			if (corsHandler(event)) {
				return;
			}
		}),
	);
});
