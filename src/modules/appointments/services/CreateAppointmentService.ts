import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

interface IRequest {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError({
        message: 'This appointment is already booked',
      });
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
