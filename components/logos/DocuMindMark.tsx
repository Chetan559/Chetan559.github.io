type DocuMindMarkProps = {
  size?: number;
  className?: string;
};

/**
 * Abstract mark for DocuMind: a 3x3 grid where squares progressively
 * rotate and solidify — structure emerging from noise. No literal
 * document/brain/chat imagery by design.
 */
export function DocuMindMark({ size = 40, className }: DocuMindMarkProps) {
  const cells: React.ReactNode[] = [];
  const positions = [3, 19, 35];

  positions.forEach((cy, row) => {
    positions.forEach((cx, col) => {
      const idx = row * 3 + col;
      const t = idx / 8;
      const rotation = t * 45;
      const opacity = 0.25 + t * 0.75;
      const isFinal = idx === 8;
      const isAccent = idx === 5;

      cells.push(
        <rect
          key={idx}
          x={cx}
          y={cy}
          width={10}
          height={10}
          fill={isFinal ? "#2557A7" : isAccent ? "#F5A623" : "currentColor"}
          opacity={isFinal || isAccent ? 1 : opacity}
          transform={`rotate(${rotation} ${cx + 5} ${cy + 5})`}
        />
      );
    });
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="DocuMind logo"
    >
      {cells}
    </svg>
  );
}
