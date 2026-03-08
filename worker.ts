import {ExportedHandler} from "@cloudflare/workers-types";
export default {
  async fetch() {
    // assets should catchall so this worker should never be hit
    return Response.redirect(
      "https://github.com/hydrophobefireman/fonts",
      302,
    ) as any;
  },
} satisfies ExportedHandler;
