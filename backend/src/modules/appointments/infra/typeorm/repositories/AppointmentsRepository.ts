import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IfindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IfindAllInMonthFromProviderDTO';
import IfindAllInDayFromProviderDTO from '@modules/appointments/dtos/IfindAllInDayFromProviderDTO';

import Appointment from '../entities/Appointments';

class AppointmentsRepository implements IAppointmentRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id },
        });

        return findAppointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IfindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const parseMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`,
                ),
            },
        });
        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
    }: IfindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parseDay = String(day).padStart(2, '0');
        const parseMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`,
                ),
            },
            relations: ['user'],
            order: { date: 'ASC' },
        });
        return appointments;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            user_id,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;