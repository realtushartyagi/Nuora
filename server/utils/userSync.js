import User from "../models/User.js";
import { clerkClient } from "@clerk/express";

export const syncUserWithClerk = async (userId) => {
    let user = await User.findById(userId);
    
    if (!user) {
        try {
            const clerkUser = await clerkClient.users.getUser(userId);
            if (clerkUser) {
                let username = clerkUser.emailAddresses[0].emailAddress.split('@')[0];
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    username = username + Math.floor(Math.random() * 10000);
                }
                const userData = {
                    _id: userId,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    full_name: clerkUser.firstName + " " + (clerkUser.lastName || ""),
                    profile_picture: clerkUser.imageUrl,
                    username
                };
                user = await User.create(userData);
            }
        } catch (error) {
            console.error(`Error syncing user ${userId} from Clerk:`, error.message);
        }
    }
    return user;
}
