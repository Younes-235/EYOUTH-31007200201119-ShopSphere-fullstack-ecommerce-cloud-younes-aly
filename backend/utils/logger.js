const mongoose = require('mongoose');
const ActivityLog = require('../models/ActivityLog');

const logActivity = async ({ action, user, targetType, targetId, details = {} }) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    // Determine target entity type
    let entityType = targetType;
    if (!entityType) {
      if (action.startsWith('USER_')) entityType = 'USER';
      else if (action.startsWith('ORDER_')) entityType = 'ORDER';
      else if (action.startsWith('PRODUCT_')) entityType = 'PRODUCT';
      else entityType = 'USER';
    }

    await ActivityLog.create({
      action,
      performedBy: {
        userId: String(user?.id || user?._id || 'SYSTEM'),
        email: user?.email || 'N/A',
        role: user?.role || 'N/A',
      },
      targetEntity: {
        type: entityType,
        id: String(targetId || user?.id || 'N/A'),
      },
      details,
    });
  } catch (error) {
    console.error('Failed to save activity log:', error.message);
  }
};

module.exports = logActivity;