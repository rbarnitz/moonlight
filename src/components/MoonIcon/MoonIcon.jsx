import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function MoonIcon(phase) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('MoonIcon Page');
  console.log('illum is: ', phase.phase);
  return (
    <div>
      <p>Phase is:</p>
      <p>{phase.phase}</p>
    </div>
  );
}

export default MoonIcon;
