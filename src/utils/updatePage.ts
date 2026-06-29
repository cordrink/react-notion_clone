import { supabase } from "../supabaseClient";
import { debounce } from "./debounce";
import type { Page } from "./types";

export const updatePage = debounce(
  async (page: Partial<Page> & Pick<Page, "id">) => {
    await supabase.from("page").update(page).eq("id", page.id);
  },
  500,
);
