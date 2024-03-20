import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './MoonIcon.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function MoonIcon(phase) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('MoonIcon Page');

  let imageURL = '';
  const waxingPhases = (phase.phase * 2).toFixed(3);
  let waningPhases = 2 - waxingPhases;
  let reduced = waningPhases.toFixed(3);
  console.log('phase is: ', phase.phase, waxingPhases, reduced);

  if (phase.phase <= 0.5) {
    imageURL = `https://www.timeanddate.com/scripts/moon.php?i=${waxingPhases}`;
  } else if (phase.phase > 0.5) {
    imageURL = `https://www.timeanddate.com/scripts/moon.php?i=${reduced}&r=3.14`;
  }

  https: return (
    <div>
      <p>Phase is:</p>
      <p>{phase.phase}</p>
      <img
        src={imageURL}
        alt="Loaded Moon Icon"
        style={phase.phase > 0.5 ? { transform: 'rotate(180deg)' } : null}
      />
    </div>
  );
}

export default MoonIcon;
