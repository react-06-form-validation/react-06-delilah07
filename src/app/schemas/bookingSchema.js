import { z } from 'zod';

// Starter schema for the task. Implement full validation rules from README.
export const createBookingSchema = (validSlots) =>
  z.object({
    bookerName: z.string().min(2, "Booker name must be at least 2 characters long").or(z.literal("")),
    bookerEmail: z.email("Invalid email address").optional().or(z.literal("")),
    eventName: z.string().min(2, "Event name is required"),
    eventDate: z.date().min(new Date(), {message: "Event date must be in the future"}),
    numberOfGuests: z.coerce.number("Number of Guests must be less than or equal to 10").int().min(1).max(10),
    timeSlot: z.string(validSlots),
    eventLink: z.url("Invalid URL. Please enter a valid event link"),
  });

