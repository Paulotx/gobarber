import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
            fakeAppointmentRepository,
        );
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 8, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 9, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 10, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 11, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 12, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 13, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 14, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 15, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 16, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 2, 17, 0, 0),
        });

        await fakeAppointmentRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 7, 3, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2020,
            month: 8,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 1, available: true },
                { day: 2, available: false },
                { day: 3, available: true },
                { day: 4, available: true },
            ]),
        );
    });
});
