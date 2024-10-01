import { splitTextByCaret } from "../utils/splitTextByCaret";
import { ActionCreatorWithOptionalPayload } from "@reduxjs/toolkit/react";

export const create = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  create: ActionCreatorWithOptionalPayload<
    string | undefined,
    "editor/slice/create"
  >
): void => {
  const element = ref.current;
  if (!element) return;

  const line = splitTextByCaret(ref);

  if (line) {
    element.textContent = line.before;
    create(line.after);

    return;
  }

  create();
};
