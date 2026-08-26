const prisma = require('../config/db.js');
const bcrypt = require('bcryptjs');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = parseInt(req.user.id, 10);
        const userEmail = req.user.email ? req.user.email.toLowerCase().trim() : null;

        let user = null;

        if (!isNaN(userId)) {
            user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
        }

        // Fallback to email lookup if not found by ID (e.g. after database re-seeding)
        if (!user && userEmail) {
            user = await prisma.user.findUnique({
                where: { email: userEmail },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            });
        }

        if (!user) {
            return res.status(401).json({ error: 'User account not found. Please log in again.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server configuration error.' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = parseInt(req.user.id, 10);
        const userEmail = req.user.email ? req.user.email.toLowerCase().trim() : null;

        // Find existing user by ID or email
        let existingUser = null;
        if (!isNaN(userId)) {
            existingUser = await prisma.user.findUnique({ where: { id: userId } });
        }
        if (!existingUser && userEmail) {
            existingUser = await prisma.user.findUnique({ where: { email: userEmail } });
        }

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found. Please log out and log in again.' });
        }

        const cleanEmail = email ? email.toLowerCase().trim() : undefined;

        if (cleanEmail && cleanEmail !== existingUser.email) {
            const emailInUse = await prisma.user.findUnique({
                where: { email: cleanEmail }
            });

            if (emailInUse) {
                return res.status(400).json({ error: 'This email address is already in use.' });
            }
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (cleanEmail) updateData.email = cleanEmail;
        
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await prisma.user.update({
            where: { id: existingUser.id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        res.status(200).json({
            message: 'Profile updated successfully!',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Failed to update database profile criteria.' });
    }
};