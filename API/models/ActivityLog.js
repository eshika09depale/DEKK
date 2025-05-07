// F:/CDGI/myapp/API/models/ActivityLog.js
import mongoose from 'mongoose';

// Define a schema for ActivityLog
const activityLogSchema = new mongoose.Schema({
    activity: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Create a model based on the schema
const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

// Function to log activity in the database
const logActivity = async (activity) => {
    try {
        const newActivity = new ActivityLog({ activity });
        await newActivity.save(); // Save to MongoDB
        console.log(`Logged activity: ${activity}`);
    } catch (error) {
        console.error('Error logging activity:', error);
    }
};

// Function to get all logged activities from the database
const getAllActivities = async () => {
    try {
        return await ActivityLog.find(); // Fetch all activities from DB
    } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
    }
};

export { logActivity, getAllActivities };
export default ActivityLog;