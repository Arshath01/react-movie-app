import React, { useEffect, useState } from "react";

export default function UseFetch(URL) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(URL).then((response) => {
      setLoading(false);
      response.json().then((formattedData) => setData(formattedData));
    });
  }, [URL]);
  return { data, loading };
}
