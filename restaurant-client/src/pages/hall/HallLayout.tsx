import { useState } from 'react';
import { Box } from '@mui/material';
import Hall from '@/components/Hall';

const initialTables = [
    { id: '1', number: 1, x: 50, y: 50, isOccupied: false, createdAt: new Date().toString() },
    { id: '2', number: 2, x: 200, y: 80, isOccupied: true, createdAt: new Date().toString() },
    { id: '3', number: 3, x: 120, y: 200, isOccupied: false, createdAt: new Date().toString() },
  ];
  

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * HallLayout component that renders a responsive layout for displaying tables in a hall.
 * It uses the initialTables state to manage the table positions and passes them
 * to the Hall component for rendering and interaction.
 *
 * @component
 * @returns {JSX.Element} A Box component that centers the Hall component on the page.
 */

/*******  d0da65e0-4982-45b6-a690-d1bc45987279  *******/
const HallLayout = () => {
  const [tables, setTables] = useState(initialTables);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: '#EDEDED' }}
    >
      <Hall width={1000} height={700} tables={tables} setTables={setTables} />
    </Box>
  );
};

export default HallLayout;


