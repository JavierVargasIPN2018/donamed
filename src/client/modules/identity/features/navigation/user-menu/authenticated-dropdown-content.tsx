import { Fragment } from "react";

import { SignOutMenuItem } from "./sign-out-menu-item";

export function AuthenticatedDropdownContent() {
  return (
    <Fragment>
      <SignOutMenuItem />
    </Fragment>
  );
}
