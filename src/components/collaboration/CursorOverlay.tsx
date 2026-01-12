import { motion, AnimatePresence } from "framer-motion";

interface RemoteCursor {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
}

interface CursorOverlayProps {
  cursors: RemoteCursor[];
}

const CursorOverlay = ({ cursors }: CursorOverlayProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {cursors.map((cursor) => (
          <motion.div
            key={cursor.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: cursor.x,
              y: cursor.y
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className="absolute"
            style={{ left: 0, top: 0 }}
          >
            {/* Cursor arrow */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ 
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
              }}
            >
              <path
                d="M2.5 2L17.5 9.5L10.5 11.5L7.5 18L2.5 2Z"
                fill={cursor.color}
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            {/* Name label */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-5 top-4 px-2 py-0.5 rounded-md text-xs font-medium text-white whitespace-nowrap"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.name}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorOverlay;
