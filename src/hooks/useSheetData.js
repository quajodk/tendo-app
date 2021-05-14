import { useEffect, useState, useRef } from "react";
import axios from "axios";

const URL =
  "https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/productCatalogueGhana/resellerCatalog";
export default function useSheetData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const int = useRef({ data });

  useEffect(() => {
    const { data } = int.current;
    axios({
      method: "GET",
      url: URL,
      headers: {
        Authorization: "Bearer TEST_TOKEN",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res) {
          console.log(res.data);
          setLoading(false);
          setData([...data, ...res?.data?.resellerCatalog]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return [data, loading];
}
