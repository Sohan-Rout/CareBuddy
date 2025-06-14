import React from 'react';

const Features = () => {
  return (
    <section style={{ padding: '2rem' }}>
      <h2>Features</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>Automated Voice Call</li>
        <li>Mood Check-in Questions</li>
        <li>Speech-to-Text + Sentiment Analysis</li>
        <li>Caregiver Alerts: If mood is consistently low or “I feel alone” is detected → send SMS/email to registered contact.</li>
      </ul>
    </section>
  );
};

export default Features;