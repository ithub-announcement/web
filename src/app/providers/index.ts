import { compose } from "@reduxjs/toolkit";

import { withStore } from "./with-store.provider";
import { withRouter } from "./with-router.provider";

export const withProviders = compose<React.FC>(withStore, withRouter);
