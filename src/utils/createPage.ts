import { nanoid } from "nanoid";
import type { Page } from "./types";

export const createPage = () => {
  const slug = nanoid();
  const id = nanoid();

  const page: Page = {
    title: "Untitiled",
    id,
    slug,
    nodes: [],
    cover: "cod_rink.png",
  };

  return page;
};