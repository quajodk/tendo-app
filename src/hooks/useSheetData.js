import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function useSheetData({ sheet, method }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const key = sheet.includes("?") ? sheet.split("?")[0] : sheet;
  const init = useRef({ method, key, sheet });

  useEffect(() => {
    const { method, key, sheet } = init.current;
    setLoading(true);
    axios({
      method,
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoNigeriaResellerApp/${sheet}`,
      credentials: "same-origin",
      headers: {
        Authorization: "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res) {
          setLoading(false);
          setData([...res?.data?.[key]]);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  return [data, loading];
}
