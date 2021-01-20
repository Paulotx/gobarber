import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IfindAllInMonthFromProviderDTO from '../dtos/IfindAllInMonthFromProviderDTO';
import IfindAllInDayFromProviderDTO from '../dtos/IfindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: IfindAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>;
    findAllInDayFromProvider(
        data: IfindAllInDayFromProviderDTO,
    ): Promise<Appointment[]>;
}
