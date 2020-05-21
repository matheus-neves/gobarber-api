import { inject, injectable } from 'tsyringe';

import { getDaysInMonth, getDate } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id, year, month },
    );

    // retorna o numero de dias no mês, exemplo: 31
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // agora que temos o numero de dias, vamos criar um array baseado nesse length
    // passamos no objeto do primeiro parametro do Array.from
    // no segundo parametro é possivel passar uma função
    // como não temos nenhum value(_), iremos utilizar somente o index
    // como o index começa em 0, e os dias começam em 1, precisamos adicionar + 1
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    // console.log('numberOfDaysInMonth', numberOfDaysInMonth);
    // console.log('eachDayArray', eachDayArray);

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      // console.log('appointmentsInDay', appointmentsInDay);

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    // console.log('availability', availability);

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
