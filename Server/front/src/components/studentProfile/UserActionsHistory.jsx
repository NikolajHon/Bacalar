// UserActionsHistory.jsx
import React from 'react';

const UserActionsHistory = ({ actions }) => {
  return (
    <div>
      <h2>История действий</h2>
      <ul>
        {actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserActionsHistory;
