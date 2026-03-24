'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBookingSchema } from '../../schemas/bookingSchema';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './BookingForm.module.css';


export default function BookingForm() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch('/api/time-slots')
      .then(res => res.json())
      .then(data => setSlots(data))
      .catch(() => setSlots([]));
  }, [])

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(createBookingSchema(slots))
  })

  const onSubmit = () => alert("Booking successful!");

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGroup}>
        <label htmlFor="bookerName" className={styles.label}>
          Booker Name
        </label> 
        <input id="bookerName" name="bookerName" className={styles.input} {...register('bookerName')}/>
        <ErrorMessage message={errors.bookerName?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="bookerEmail" className={styles.label}>
          Booker Email
        </label>
        <input id="bookerEmail" name="bookerEmail" className={styles.input} type="email" {...register('bookerEmail')}/>
        <ErrorMessage message={errors.bookerEmail?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventName" className={styles.label}>
          Event Name
        </label>
        <input id="eventName" name="eventName" className={styles.input} {...register('eventName')}/>
        <ErrorMessage message={errors.eventName?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventDate" className={styles.label}>
          Event Date
        </label>
        <input id="eventDate" name="eventDate" className={styles.input} type="date" {...register('eventDate', {valueAsDate: true})}/>
        <ErrorMessage message={errors.eventDate?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="numberOfGuests" className={styles.label}>
          Number of Guests
        </label>
        <input id="numberOfGuests" name="numberOfGuests" className={styles.input} type="number" {...register('numberOfGuests')}/>
        <ErrorMessage message={errors.numberOfGuests?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="timeSlot" className={styles.label}>
          Time Slot
        </label>
        <select id="timeSlot" name="timeSlot" className={styles.input} {...register('timeSlot')}>
          <option value="">Select a time slot</option>
          {slots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
        <ErrorMessage message={errors.timeSlot?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventLink" className={styles.label}>
          Event Link (Online)
        </label>
        <input id="eventLink" name="eventLink" className={styles.input} type="url" {...register('eventLink')}/>
        <ErrorMessage message={errors.eventLink?.message} />
      </div>

      <button className={styles.button} type="submit">
        Book Event
      </button>
    </form>
  );
}
