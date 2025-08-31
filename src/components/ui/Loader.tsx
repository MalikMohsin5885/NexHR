import React from 'react';

const JellyOozeLoader = ({ size = 60, color = 'black', speed = 0.9 }) => {
  // Create dynamic styles
  const styles = {
    container: {
      position: 'relative',
      height: `${size / 2}px`,
      width: `${size}px`,
      filter: 'url(#uib-jelly-ooze)',
      animation: `rotate ${speed * 2}s linear infinite`,
      willChange: 'transform',
    },
    svg: {
      width: 0,
      height: 0,
      position: 'absolute',
    },
    pseudoElement: {
      content: '""',
      position: 'absolute',
      top: '0%',
      left: '25%',
      width: '50%',
      height: '100%',
      backgroundColor: color,
      borderRadius: '100%',
      willChange: 'transform',
      transition: 'background-color 0.3s ease',
    },
    before: {
      animation: `shift-left ${speed}s ease infinite`,
    },
    after: {
      animation: `shift-right ${speed}s ease infinite`,
    },
    // Keyframes as style tags
    keyframes: `
      @keyframes rotate {
        0%, 49.999%, 100% {
          transform: none;
        }
        50%, 99.999% {
          transform: rotate(90deg);
        }
      }
      @keyframes shift-left {
        0%, 100% {
          transform: translateX(0%);
        }
        50% {
          transform: scale(0.65) translateX(-75%);
        }
      }
      @keyframes shift-right {
        0%, 100% {
          transform: translateX(0%);
        }
        50% {
          transform: scale(0.65) translateX(75%);
        }
      }
    `,
    filter: `
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
        result="ooze"
      />
      <feBlend in="SourceGraphic" in2="ooze" />
    `,
  };

  return (
    <>
      {/* Add keyframes to style tag */}
      <style dangerouslySetInnerHTML={{ __html: styles.keyframes }} />
      
      <div 
        style={styles.container}
        className="jelly-ooze-container"
      >
        {/* Pseudo-elements can't be directly styled in React, so we use actual elements */}
        <div style={{ ...styles.pseudoElement, ...styles.before }} />
        <div style={{ ...styles.pseudoElement, ...styles.after }} />
      </div>
      
      <svg width="0" height="0" style={styles.svg}>
        <defs>
          <filter id="uib-jelly-ooze">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default JellyOozeLoader;