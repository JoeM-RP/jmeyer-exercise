import { Appointment, Doctor } from "@/types";

/*
225 E. Chicago Ave.
Chicago, Illinois 60611

Get Directions

Call: 312.227.4000
*/

// A list of doctors
export const DATA_DOC: Doctor[] = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Pediatrics",
    location: "Chicago",
    rating: 4.5,
    reviews: 120,
    imageUrl: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Pediatrics",
    location: "Chicago",
    rating: 4.7,
    reviews: 95,
    imageUrl: "https://randomuser.me/api/portraits/women/95.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    specialty: "Pediatrics",
    location: "Chicago",
    rating: 4.8,
    reviews: 150,
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

// A list of available appointment slots for each doctor
export const DATA_AVAIL: Appointment[] = [
  { id: 1, date: "2025-10-01", time: "09:00:00", doctorId: 1, booked: false },
  {
    id: 2,
    date: "2025-10-01",
    time: "10:00:00",
    doctorId: 1,
    booked: true,
  },
  {
    id: 3,
    date: "2025-10-01",
    time: "11:00:00",
    doctorId: 1,
    booked: true,
  },
  {
    id: 4,
    date: "2025-10-01",
    time: "12:00:00",
    doctorId: 1,
    booked: false,
  },
  {
    id: 5,
    date: "2025-10-01",
    time: "13:00:00",
    doctorId: 1,
    booked: false,
  },
  {
    id: 6,
    date: "2025-10-01",
    time: "14:00:00",
    doctorId: 1,
    booked: false,
  },
  {
    id: 7,
    date: "2025-10-01",
    time: "15:00:00",
    doctorId: 1,
    booked: false,
  },
  {
    id: 8,
    date: "2025-10-01",
    time: "09:00:00",
    doctorId: 2,
    booked: true,
  },
  {
    id: 9,
    date: "2025-10-01",
    time: "10:00:00",
    doctorId: 2,
    booked: false,
  },
  {
    id: 10,
    date: "2025-10-01",
    time: "11:00:00",
    doctorId: 2,
    booked: false,
  },
  {
    id: 11,
    date: "2025-10-01",
    time: "12:00:00",
    doctorId: 2,
    booked: true,
  },
  {
    id: 12,
    date: "2025-10-01",
    time: "13:00:00",
    doctorId: 2,
    booked: true,
  },
  {
    id: 13,
    date: "2025-10-01",
    time: "14:00:00",
    doctorId: 2,
    booked: true,
  },
  {
    id: 14,
    date: "2025-10-01",
    time: "15:00:00",
    doctorId: 2,
    booked: true,
  },
  {
    id: 15,
    date: "2025-10-01",
    time: "09:00:00",
    doctorId: 3,
    booked: false,
  },
  {
    id: 16,
    date: "2025-10-01",
    time: "10:00:00",
    doctorId: 3,
    booked: false,
  },
  {
    id: 17,
    date: "2025-10-01",
    time: "11:00:00",
    doctorId: 3,
    booked: false,
  },
  {
    id: 18,
    date: "2025-10-01",
    time: "12:00:00",
    doctorId: 3,
    booked: false,
  },
  {
    id: 19,
    date: "2025-10-01",
    time: "13:00:00",
    doctorId: 3,
    booked: false,
  },
  {
    id: 20,
    date: "2025-10-01",
    time: "14:00:00",
    doctorId: 3,
    booked: true,
  },
  {
    id: 21,
    date: "2025-10-01",
    time: "15:00:00",
    doctorId: 3,
    booked: true,
  },
];
