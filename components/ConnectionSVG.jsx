const ConnectionSVG = ({ width = 400, height = 100, type = 'simple', lineId, className = '' }) => {
    const isAnimated = animatedLines.has(lineId);
    
    const addToRefs = (el) => {
      if (el && !lineRefs.current.includes(el)) {
        lineRefs.current.push(el);
      }
    };

    if (type === 'fork') {
      return (
        <div 
          ref={addToRefs}
          data-line-id={lineId}
          className={`flex justify-center ${className}`}
        >
          <svg width={Math.min(width, window.innerWidth - 40)} height={height} className="mx-auto">
            <defs>
              <linearGradient id={`lineGrad-${lineId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:'#94a3b8', stopOpacity:0.6}} />
                <stop offset="50%" style={{stopColor:'#64748b', stopOpacity:0.8}} />
                <stop offset="100%" style={{stopColor:'#94a3b8', stopOpacity:0.6}} />
              </linearGradient>
            </defs>
            
            {/* Main vertical line */}
            <line 
              x1={Math.min(width, window.innerWidth - 40)/2} 
              y1="0" 
              x2={Math.min(width, window.innerWidth - 40)/2} 
              y2="30" 
              stroke={`url(#lineGrad-${lineId})`} 
              strokeWidth="2"
              className={`transition-all duration-1000 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: isAnimated ? 'none' : '100',
                strokeDashoffset: isAnimated ? '0' : '100',
                transition: 'stroke-dashoffset 1000ms ease-in-out, opacity 500ms ease-in-out'
              }}
            />
            
            {/* Horizontal line */}
            <line 
              x1="80" 
              y1="30" 
              x2={Math.min(width, window.innerWidth - 40) - 80} 
              y2="30" 
              stroke={`url(#lineGrad-${lineId})`} 
              strokeWidth="2"
              className={`transition-all duration-1000 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: isAnimated ? 'none' : `${Math.min(width, window.innerWidth - 40) - 160}`,
                strokeDashoffset: isAnimated ? '0' : `${Math.min(width, window.innerWidth - 40) - 160}`,
                transition: 'stroke-dashoffset 1200ms ease-in-out 300ms, opacity 500ms ease-in-out 300ms'
              }}
            />
            
            {/* Left vertical */}
            <line 
              x1="80" 
              y1="30" 
              x2="80" 
              y2="60" 
              stroke={`url(#lineGrad-${lineId})`} 
              strokeWidth="2"
              className={`transition-all duration-800 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: isAnimated ? 'none' : '30',
                strokeDashoffset: isAnimated ? '0' : '30',
                transition: 'stroke-dashoffset 800ms ease-in-out 600ms, opacity 500ms ease-in-out 600ms'
              }}
            />
            
            {/* Right vertical */}
            <line 
              x1={Math.min(width, window.innerWidth - 40) - 80} 
              y1="30" 
              x2={Math.min(width, window.innerWidth - 40) - 80} 
              y2="60" 
              stroke={`url(#lineGrad-${lineId})`} 
              strokeWidth="2"
              className={`transition-all duration-800 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
              style={{
                strokeDasharray: isAnimated ? 'none' : '30',
                strokeDashoffset: isAnimated ? '0' : '30',
                transition: 'stroke-dashoffset 800ms ease-in-out 600ms, opacity 500ms ease-in-out 600ms'
              }}
            />
            
            {/* Connection dots with scale animation */}
            <circle 
              cx={Math.min(width, window.innerWidth - 40)/2} 
              cy="30" 
              r="3" 
              fill="#64748b" 
              className={`transition-all duration-500 ${isAnimated ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}
              style={{
                transition: 'opacity 500ms ease-in-out 800ms, transform 500ms ease-in-out 800ms',
                transformOrigin: 'center'
              }}
            />
            <circle 
              cx="80" 
              cy="30" 
              r="3" 
              fill="#64748b" 
              className={`transition-all duration-500 ${isAnimated ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}
              style={{
                transition: 'opacity 500ms ease-in-out 1000ms, transform 500ms ease-in-out 1000ms',
                transformOrigin: 'center'
              }}
            />
            <circle 
              cx={Math.min(width, window.innerWidth - 40) - 80} 
              cy="30" 
              r="3" 
              fill="#64748b" 
              className={`transition-all duration-500 ${isAnimated ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}
              style={{
                transition: 'opacity 500ms ease-in-out 1000ms, transform 500ms ease-in-out 1000ms',
                transformOrigin: 'center'
              }}
            />
          </svg>
        </div>
      );
    }
    
    return (
      <div 
        ref={addToRefs}
        data-line-id={lineId}
        className={`flex justify-center ${className}`}
      >
        <svg width="2" height={height} className="mx-auto">
          <defs>
            <linearGradient id={`simpleGrad-${lineId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:'#94a3b8', stopOpacity:0.3}} />
              <stop offset="50%" style={{stopColor:'#64748b', stopOpacity:0.8}} />
              <stop offset="100%" style={{stopColor:'#94a3b8', stopOpacity:0.3}} />
            </linearGradient>
          </defs>
          <line 
            x1="1" 
            y1="0" 
            x2="1" 
            y2={height} 
            stroke={`url(#simpleGrad-${lineId})`} 
            strokeWidth="2"
            className={`transition-all duration-1000 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
            style={{
              strokeDasharray: isAnimated ? 'none' : height,
              strokeDashoffset: isAnimated ? '0' : height,
              transition: 'stroke-dashoffset 1000ms ease-in-out, opacity 500ms ease-in-out'
            }}
          />
        </svg>
      </div>
    );
  };


  export default ConnectionSVG;