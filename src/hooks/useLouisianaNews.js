import { useEffect, useState } from "react";
import { LOUISIANA_TICKERS } from "../constants/louisianaTickers";

export function useLouisianaNews(refreshMs = 60000) {
  const token = import.meta.env.VITE_FINNHUB_KEY;
  const [articles, setArticles] = useState([]);

  async function fetchNews() {
    try {
      const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${token}`);
      const data = await res.json();

      // Filter by Louisiana companies
      const filtered = data.filter(
        (n) =>
          LOUISIANA_TICKERS.some((t) =>
            n.related?.includes(t)
          ) ||
          /(Louisiana|Baton Rouge|New Orleans)/i.test(n.headline)
      );

      setArticles(filtered.slice(0, 5));
    } catch (err) {
      console.error("News fetch error", err);
    }
  }

  useEffect(() => {
    fetchNews();
    const id = setInterval(fetchNews, refreshMs);
    return () => clearInterval(id);
  }, []);

  return articles;
}
