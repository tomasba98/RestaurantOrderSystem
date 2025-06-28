import { useDraggable } from "@dnd-kit/core";
import { Box, Paper, Typography } from "@mui/material";

function DraggableTable({ id, x, y, onDragEnd }: any) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
    });
  
    const style: React.CSSProperties = {
        transform: transform
        ? `translate3d(${x + transform.x}px, ${y + transform.y}px, 0)`
        : `translate3d(${x}px, ${y}px, 0)`,
      position: 'absolute',
      width: 100,
      height: 100,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'move',
      userSelect: 'none', 
    };
    
  
    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <Paper elevation={3} sx={{ width: '100%', height: '100%', borderRadius: '50%' }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>Mesa {id}</Typography>
          </Box>
        </Paper>
      </div>
    );
  }

  export default DraggableTable;