import PropTypes from 'prop-types';
import React from 'react';
import { CardContent, Typography, Card } from '@mui/material';

export default function CardValues({ title, value }) {
  const colorCondition = () => {
    if (title === 'Ganho Líquido' || title === 'Valor Final Líquido') {
      return true;
    }
    return false;
  };
  return (
    <Card
      style={ {
        height: '80px',
        width: '200px',
        marginRight: '5%',
        marginBottom: '3%',
      } }
    >
      <CardContent
        style={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '80px',
          padding: '8px',
        } }
      >
        <Typography variant="h8" component="div" style={ { fontWeight: '700' } }>
          {title}
        </Typography>
        <Typography
          sx={ { mb: 1.5 } }
          color={ colorCondition() ? 'green' : 'black' }
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

CardValues.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
}.isRequired;
