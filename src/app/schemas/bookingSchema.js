import { z } from 'zod';

// Starter schema for the task. Implement full validation rules from README.
export const createBookingSchema = (validSlots) =>
  z.object({
    bookerName: z.string().min(2, "Booker name must be at least 2 characters long").or(z.literal("")),
    bookerEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
    eventName: z.string("Event name is required").min(2, "Event name must be at least 2 characters long"),
    eventDate: z.date().min(new Date(), {message: "Event date must be in the future"}),
    numberOfGuests: z.coerce.number().int().min(1, "Number of Guests must be less than or equal to 10").max(10, "Number of Guests must be less than or equal to 10"),
    timeSlot: z.string().refine((val) => validSlots.includes(val), {
      message: "Selected time slot is unavailable",
    }),
    eventLink: z.url("Invalid URL. Please enter a valid event link"),
  });

