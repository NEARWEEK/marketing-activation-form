import { matchPath } from "react-router";

export const pathMatched = (path, locationPathName) => {
  return matchPath(
    {
      path,
      exact: true,
    },
    locationPathName,
  );
}
