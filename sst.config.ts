/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "fonts",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
    };
  },
  async run() {
    const {readFile} = await import("node:fs/promises");
    const worker = new sst.cloudflare.Worker("Fonts", {
      handler: "./worker.ts",
      url: true,
      domain: "fonts.hpfm.dev",
      transform: {
        worker: {
          assets: {
            directory: "../../css",
            config: {
              headers: (await readFile("_headers")).toString(),
            },
          },
        },
      },
    });

    return {
      site: worker.url,
    };
  },
});
