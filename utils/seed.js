const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

(async () => {
    try {
        const users = [];
        const thoughts = getRandomThoughts(10);

        // Delete existing collections
        await Thought.collection.drop();
        await User.collection.drop();

        for (let i = 0; i < 20; i++) {
            const username = getRandomName();
            users.push({
                username,
                email: `${username}@gmail.com`
            });
        }

        await User.collection.insertMany(users);
        await Thought.collection.insertMany(thoughts);

        console.table(users);
        console.table(thoughts);
        console.info('Seeding complete! 🌱');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        connection.close();
    }
})();
