// Quick helper to detect mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export const styles = {
  container: {
    position: "absolute",
    // Desktop: Right side | Mobile: Bottom center
    right: isMobile ? "5%" : "20px",
    left: isMobile ? "5%" : "auto",
    bottom: isMobile ? "20px" : "auto",
    top: isMobile ? "auto" : "80px",
    
    width: isMobile ? "90%" : "300px",
    maxHeight: isMobile ? "35vh" : "80vh", // Shorter on mobile to see the map
    
    backgroundColor: "rgba(30, 30, 30, 0.92)",
    backdropFilter: "blur(12px)",
    borderRadius: "12px",
    border: "1px solid #444",
    padding: isMobile ? "15px" : "20px",
    color: "#E0E0E0",
    boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.5)", // Shadow pulls up on mobile
    zIndex: 100,
    fontFamily: "'Inter', sans-serif",
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch' // Smooth scroll for iOS
  },
  header: {
    fontSize: isMobile ? "0.75rem" : "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#888",
    marginBottom: "1rem",
    borderBottom: "1px solid #444",
    paddingBottom: "10px",
    textAlign: isMobile ? "center" : "left"
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "12px",
    transition: "all 0.2s ease",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.1)"
  },
  cardTitle: (color) => ({
    fontSize: isMobile ? "1rem" : "1.1rem",
    fontWeight: "bold",
    color: color, 
    marginBottom: "5px"
  }),
  region: {
    fontSize: "0.75rem",
    color: "#AAA",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  desc: {
    fontSize: "0.8rem",
    lineHeight: "1.4",
    color: "#CCC"
  },
  button: (color) => ({
    marginTop: "10px",
    width: "100%",
    padding: "10px", // Larger tap target for fingers
    backgroundColor: "transparent",
    border: `1px solid ${color}`,
    color: color,
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center"
  })
};