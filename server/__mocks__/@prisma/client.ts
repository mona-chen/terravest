export const mockFindUnique = jest.fn();
export const mockFindMany = jest.fn();
export const mockCreate = jest.fn();
export const mockUpdate = jest.fn();
export const mockDelete = jest.fn();
export const mockCount = jest.fn();
export const mockAggregate = jest.fn();
export const mockGroupBy = jest.fn();

export class PrismaClient {
  user = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete,
    count: mockCount,
    groupBy: mockGroupBy,
  };
  investor = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    count: mockCount,
  };
  company = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete,
    count: mockCount,
    groupBy: mockGroupBy,
  };
  notification = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete,
    count: mockCount,
  };
  message = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    count: mockCount,
  };
  document = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete,
    count: mockCount,
  };
  opportunity = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    count: mockCount,
  };
  capitalCall = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    count: mockCount,
  };
  portfolioHolding = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete,
    count: mockCount,
    aggregate: mockAggregate,
  };
  refreshToken = {
    findUnique: mockFindUnique,
    findMany: mockFindMany,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete,
    count: mockCount,
  };

  $connect = jest.fn().mockResolvedValue(undefined);
  $disconnect = jest.fn().mockResolvedValue(undefined);
}
