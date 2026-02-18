import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Tooltip } from 'react-tooltip';
import Sidebar from './sidebar';
import { GLOBAL_DATA } from '../data/data';
import worldMap from "../data/countries-110m.json";
import { styles, THEME } from "../css/MapDashboard.js";

const GEO_URL = worldMap;

const MapDashboard = () => {
  // Metric state now supports 'iq', 'edu', or 'access'
  const [metric, setMetric] = useState('iq');
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1.4 });

  // 4. Color Scale Logic (Updated with Access branch)
  const colorScale = useMemo(() => {
    if (metric === 'iq') {
      return scaleLinear()
        .domain([65, 85, 105])
        .range(["#37474F", "#00BCD4", THEME.iqColor]);
    } else if (metric === 'edu') {
      return scaleLinear()
        .domain([2, 5, 8])
        .range(["#1B5E20", "#66BB6A", THEME.eduColor]);
    } else {
      // Access to Education Scale (0-100)
      return scaleLinear()
        .domain([30, 65, 95])
        .range(["#ff4d00", "#ffd000", THEME.accessColor]);
    }
  }, [metric]);

  const handleFocus = (coords) => {
    setPosition({ coordinates: coords.center, zoom: coords.zoom });
  };

  const getActiveColor = () => {
    if (metric === 'iq') return THEME.iqColor;
    if (metric === 'edu') return THEME.eduColor;
    return THEME.accessColor;
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Global Metrics Dashboard</h1>

        <div style={styles.buttonGroup}>
          <button
            style={styles.button(metric === 'iq', THEME.iqColor)}
            onClick={() => setMetric('iq')}
          >
            🧠 IQ Scores
          </button>
          <button
            style={styles.button(metric === 'edu', THEME.eduColor)}
            onClick={() => setMetric('edu')}
          >
            🎓 GDP Spending
          </button>
          <button
            style={styles.button(metric === 'access', THEME.accessColor)}
            onClick={() => setMetric('access')}
          >
            🌍 Access to EDU
          </button>
        </div>

        <div style={{ fontSize: "0.8rem", color: THEME.textMuted }}>
          Viewing: <strong style={{ color: getActiveColor() }}>
            {metric === 'iq' && 'Average IQ Score'}
            {metric === 'edu' && 'Govt. Education Spending (% GDP)'}
            {metric === 'access' && 'Education Access Index (0-100)'}
          </strong>
        </div>
      </header>

      <Sidebar metric={metric} onFocus={handleFocus} />

      <div style={styles.mapContainer}>
        <ComposableMap
          // Reduced scale from 140 to 125 to ensure all continents fit 
          // Adjusted rotate to center the Pacific/Atlantic better
          projectionConfig={{
            scale: 125,
            rotate: [-10, 0, 0]
          }}
          // These attributes ensure the SVG scales correctly to its container
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ZoomableGroup zoom={position.zoom} center={position.coordinates}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  let d = GLOBAL_DATA[geo.properties.name];
                  const hasData = d && d[metric] !== null && d[metric] !== undefined;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (hasData) {
                          const val = metric === 'edu' ? d.edu + '%' : d[metric];
                          const label = metric === 'iq' ? 'IQ Score' : (metric === 'edu' ? 'Edu. Inv.' : 'Access Index');

                          setTooltipContent(`
                            <div style="font-weight:bold; font-size:1.1em; margin-bottom:4px">${d.name}</div>
                            <div>${label}: 
                              <span style="color:${getActiveColor()}; font-weight:bold;">${val}</span>
                            </div>
                            <div style="font-size:0.7em; color:#aaa; margin-top:4px">Source: ${d.source}</div>
                          `);
                        } else {
                          setTooltipContent(`
                            <div style="font-weight:bold; color:#888">${geo.properties.name}</div>
                            <div style="font-size:0.8em; color:#666">No reliable data available</div>
                          `);
                        }
                      }}
                      onMouseLeave={() => setTooltipContent("")}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-html={tooltipContent}
                      style={{
                        default: {
                          fill: hasData ? colorScale(d[metric]) : "#1F1F1F",
                          stroke: "#121212",
                          strokeWidth: 0.5,
                          outline: "none",
                          transition: "fill 0.5s ease"
                        },
                        hover: {
                          fill: hasData ? "#FFFFFF" : "#2A2A2A",
                          stroke: "#FFF",
                          strokeWidth: 1,
                          outline: "none",
                          cursor: hasData ? "pointer" : "not-allowed"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <Tooltip
        id="my-tooltip"
        style={styles.tooltip}
        place="top"
        opacity={1}
      />
    </div>
  );
};

export default MapDashboard;