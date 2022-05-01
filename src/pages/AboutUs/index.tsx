import React from 'react';

export default function AboutUs() {
  return (
    <div className="about-section">
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, fontSize: 32, minWidth: 300,
      }}
      >
        <h1 className="about-title">About Us</h1>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 2, minWidth: 300, fontSize: 32,
      }}
      >
        <p style={{ color: '#b3b0aa' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aenean tempus eu dolor ac pretium. Donec aliquam,
          lacus pretium gravida interdum, orci enim imperdiet orci,
          et iaculis lectus risus et ligula. Donec nunc nisl,
          convallis commodo finibus euismod, ultricies eget ante.
          Morbi sollicitudin porta leo, ac lacinia ipsum convallis nec. Nullam rutrum aliquam arcu,
          non faucibus massa dictum id. Suspendisse ipsum mauris, vehicula non porttitor vel,
          vulputate id nulla. Fusce consectetur velit et erat gravida pharetra.
          Fusce in urna convallis, sollicitudin orci sed,
          efficitur est. Mauris tincidunt, nunc vehicula bibendum ullamcorper,
          justo orci maximus tellus, sed pellentesque erat sem suscipit velit.
          Cras at urna vel urna tincidunt tempor.

        </p>
      </div>
    </div>

  );
}
