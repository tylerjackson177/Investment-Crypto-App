import { useLouisianaNews } from "../hooks/useLouisianaNews";
import { Card, CardContent, Typography, Link, Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingNews() {
  const news = useLouisianaNews();

  return (
    <Box
      sx={{
        position: "absolute",
        right: 40,
        top: "55%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <AnimatePresence>
        {news.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              sx={{
                width: 300,
                background: "#ffffffcc",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {n.headline}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {n.source} • {new Date(n.datetime * 1000).toLocaleTimeString()}
                </Typography>
                <Link href={n.url} target="_blank" rel="noopener" underline="hover">
                  Read article →
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}
