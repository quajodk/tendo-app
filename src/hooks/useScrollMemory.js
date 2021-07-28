import React from "react";
import { useHistory } from "react-router-dom";

function useScrollMemory() {
  const history = useHistory();

  React.useEffect(() => {
    const { push, replace } = history;

    // Override the history PUSH method to automatically set scroll state.
    history.push = (path) => {
      push(path, { scroll: window.scrollY });
    };
    // Override the history REPLACE method to automatically set scroll state.
    history.replace = (path) => {
      replace(path, { scroll: window.scrollY });
    };

    // Listen for location changes and set the scroll position accordingly.
    const unregister = history.listen((location, action) => {
      window.scrollTo(0, action !== "POP" ? 0 : location.state?.scroll ?? 0);
    });

    // Unregister listener when component unmount.
    return () => {
      unregister();
    };
  }, [history]);
}

export default useScrollMemory;
