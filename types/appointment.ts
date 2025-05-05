export default interface Appointment {
  id: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  doctorId: number;
  booked: boolean;
}
