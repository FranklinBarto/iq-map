const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export const THEME = {
  bg: "#121212",
  card: "#1E1E1E",
  text: "#E0E0E0",
  textMuted: "#A0A0A0",
  iqColor: "#00E5FF",
  eduColor: "#00FF7F",
  accessColor: "#FFAB40",
  baseMap: "#2A2A2A",
  stroke: "#121212"
};

export const styles = {
  container: {
    backgroundColor: THEME.bg,
    color: THEME.text,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    position: "relative"
  },
  header: {
    padding: isMobile ? "1rem" : "2rem",
    textAlign: "center",
    zIndex: 20, // Sit above the map
    width: "100%",
    maxWidth: "900px",
    background: isMobile ? `linear-gradient(to bottom, ${THEME.bg} 80%, transparent)` : "transparent"
  },
  title: {
    fontSize: isMobile ? "1.1rem" : "1.5rem",
    marginBottom: isMobile ? "0.8rem" : "1.5rem",
    fontWeight: 600,
    letterSpacing: "1px",
    textTransform: "uppercase"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: isMobile ? "0.4rem" : "0.8rem",
    marginBottom: "0.5rem",
    flexWrap: "wrap"
  },
  button: (isActive, color) => ({
    padding: isMobile ? "8px 12px" : "10px 20px",
    fontSize: isMobile ? "0.7rem" : "0.85rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: isActive ? color : THEME.card,
    color: isActive ? "#000" : THEME.textMuted,
    boxShadow: isActive ? `0 0 15px ${color}44` : "none",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  }),
  mapContainer: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1
  },
  tooltip: {
    backgroundColor: "rgba(30, 30, 30, 0.95)",
    color: "#fff",
    borderRadius: "8px",
    padding: isMobile ? "8px" : "12px",
    fontSize: isMobile ? "0.75rem" : "0.9rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    border: "1px solid #333",
    zIndex: 1000
  },
  sourceText: {
    fontSize: "0.7rem", 
    color: THEME.textMuted,
    marginTop: "0.3rem"
  }
};