import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentRepository,
        );
    });

    it('should be able to list the day availability from provider', async () => {
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

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 7, 2, 11).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user',
            day: 2,
            month: 8,
            year: 2020,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 12, available: true },
                { hour: 13, available: false },
                { hour: 14, available: false },
                { hour: 15, available: true },
            ]),
        );
    });
});
