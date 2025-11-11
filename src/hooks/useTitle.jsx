import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | LearnHub`;
  }, [title]);
};

export default useTitle;
