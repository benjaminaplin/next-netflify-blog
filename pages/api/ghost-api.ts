import { GhostPost } from "pages/ghost-posts";

import GhostContentAPI from "@tryghost/content-api";

const ghostApi = new GhostContentAPI({
  url: 'https://demo.ghost.io',
  key: '22444f78447824223cefc48062',
  version: "v3"
});

export default ghostApi