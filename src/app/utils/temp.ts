export const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
        for (let minute = 0; minute < 60; minute += 60) {
            slots.push({
                time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
                available: true, // 70% chance of being available
            });
        }
    }
    return slots;
};
