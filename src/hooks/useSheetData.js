import { useEffect, useState, useRef } from "react";
import axios from "axios";

const BASE_URL =
  "https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/productCatalogueGhana/";
export default function useSheetData({ sheet }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const int = useRef({ data, sheet });

  useEffect(() => {
    const { data, sheet } = int.current;
    axios({
      method: "GET",
      baseURL: BASE_URL,
      url: sheet,
      credentials: "same-origin",
      headers: {
        Authorization: "Bearer TEST_TOKEN",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res) {
          setLoading(false);
          setData([...data, ...res?.data?.[sheet]]);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [sheet]);

  return [data, loading];
}
