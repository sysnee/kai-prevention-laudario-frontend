// Mock data for time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        available: Math.random() > 0.3, // 70% chance of being available
      });
    }
  }
  return slots;
};

export async function getTimeSlots(date: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateTimeSlots();
}

export async function createAppointment(appointmentData: {
  examId: string;
  date: string;
  time: string;
  patientData: {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    gender: string;
    cpf: string;
    address: string;
  };
}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a unique appointment ID
  const appointmentId = `APT-${Date.now()}`;
  
  return { 
    success: true, 
    data: appointmentData,
    appointmentId
  };
}

export async function sendConfirmationEmail(data: {
  email: string;
  name: string;
  examName: string;
  date: Date | null;
  time: string | null;
  anamnesisLink: string;
  consentLink: string;
}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, this would send an email
  console.log('Sending confirmation email to:', data.email);
  return { success: true };
}

export async function initializeTimeSlots(date: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateTimeSlots();
}