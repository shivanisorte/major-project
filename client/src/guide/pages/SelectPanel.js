import { useEffect, useState } from "react";

function SelectPanel() {
  const [submissions, setSubmissions] = useState();
  useEffect(() => {
    //check if panel selection is done.
  }, []);
  return <div>SelectPanel</div>;
}

export default SelectPanel;
