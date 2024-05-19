import {useTheme} from "@mui/material/styles";
const MissShotAnimation = () => {
    const theme = useTheme();
    const svgWidth = "100%";
    const viewBoxWidth = 500;
    const viewBoxHeight = 400;
    const gateLeftX = 100;
    const gateRightX = 400;
    const gateY = 100;
    const gateWidth = gateRightX - gateLeftX;
    const gateHeight = 100;
    const netPatternWidth = 10;
    const netPatternHeight = 10;

    const ballColor = theme.palette.primary.main;
    const gateColor = theme.palette.primary.main;
    return (
        <svg
            width={svgWidth}
            height={viewBoxHeight}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            preserveAspectRatio="xMidYMin meet"
        >
            <defs>
                <pattern
                    id="netPattern"
                    patternUnits="userSpaceOnUse"
                    width={netPatternWidth}
                    height={netPatternHeight}
                    patternTransform={`translate(${gateLeftX},${gateY})`}
                >
                    <line
                        x1="0"
                        y1="0"
                        x2={netPatternWidth}
                        y2="0"
                        stroke={gateColor}
                        strokeWidth="2"
                    />
                    <line
                        x1="0"
                        y1={netPatternHeight}
                        x2="0"
                        y2="0"
                        stroke={gateColor}
                        strokeWidth="2"
                    />
                </pattern>
            </defs>

            {/* Left bar */}
            <line
                x1={gateLeftX}
                y1={gateY}
                x2={gateLeftX}
                y2={gateY + gateHeight}
                stroke={gateColor}
                strokeWidth="10"
            />

            {/*Right bar */}
            <line
                x1={gateRightX}
                y1={gateY}
                x2={gateRightX}
                y2={gateY + gateHeight}
                stroke={gateColor}
                strokeWidth="10"
            />

            {/* Crossbar */}
            <line
                x1={gateLeftX}
                y1={gateY}
                x2={gateRightX}
                y2={gateY}
                stroke={gateColor}
                strokeWidth="10"
            />

            {/* Net */}
            <rect
                x={gateLeftX}
                y={gateY}
                width={gateWidth}
                height={gateHeight}
                fill="url(#netPattern)"
            />

            {/* Ball */}
            <circle id="ball" fill={ballColor}>
                <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
                    <mpath href="#path" />
                    <animate
                        href="#ball"
                        attributeName="r"
                        from="10"
                        to="3"
                        begin="0s"
                        repeatCount="indefinite"
                        dur="3s"
                    />
                </animateMotion>
            </circle>

            {/* Ball path */}
            <path id="path" d="M250,380 Q250,300 150,100 T0,0" fill="none" />
        </svg>
    );
};

export default MissShotAnimation;
