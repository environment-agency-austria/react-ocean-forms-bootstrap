// tslint:disable-next-line:naming-convention
export const createMockFormatter = (): jest.Mock => jest.fn().mockImplementation((id: string) => id);
