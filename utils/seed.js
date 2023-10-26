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
            const fullName = getRandomName();
            const first = fullName.split(' ')[0];
            const last = fullName.split(' ')[1];

            users.push({
                first,
                last,
                age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
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
