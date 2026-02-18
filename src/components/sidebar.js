import React from 'react';
import { INSIGHTS } from '../data/data';
import { styles } from '../css/sidebar';

const Sidebar = ({ metric, onFocus }) => {
  const currentInsights = INSIGHTS[metric] || [];

  const activeColor = 
      metric === 'iq' ? "#00E5FF" : 
      metric === 'edu' ? "#00FF7F" : 
      "#FFAB40";

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {metric === 'iq' && '🧠 Cognitive Analysis'}
        {metric === 'edu' && '📊 Fiscal Analysis'}
        {metric === 'access' && '🌍 Infrastructure Analysis'}
      </div>
      
      {currentInsights.map((item) => (
        <div 
          key={item.id} 
          style={styles.card}
          onClick={() => onFocus(item.coordinates)}
          onMouseEnter={(e) => {
             e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
             e.currentTarget.style.borderColor = activeColor + "66"; 
             e.currentTarget.style.transform = "translateX(-5px)";
          }}
          onMouseLeave={(e) => {
             e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
             e.currentTarget.style.borderColor = "transparent";
             e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          {/* CALL THE FUNCTION HERE */}
          <div style={styles.cardTitle(activeColor)}>{item.title}</div>
          
          <div style={styles.region}>
            <span>📍 {item.region}</span>
            <span style={{color: "#FFF", fontWeight: "bold", fontSize: "0.75rem"}}>{item.stats}</span>
          </div>
          <div style={styles.desc}>{item.desc}</div>
          
          {/* CALL THE FUNCTION HERE */}
          <button 
            style={styles.button(activeColor)}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = activeColor;
              e.target.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = activeColor;
            }}
          >
            🔍 Zoom to Region
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;