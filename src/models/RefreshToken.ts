// In-memory RefreshToken store (placeholder for DB-backed implementation)
export interface RefreshTokenRecord {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  jti: string;
}

export class RefreshTokenModel {
  private static store: RefreshTokenRecord[] = [];

  static async create(record: RefreshTokenRecord): Promise<void> {
    this.store.push(record);
  }

  static async findOne(filter: Partial<RefreshTokenRecord>): Promise<RefreshTokenRecord | null> {
    const rec = this.store.find((r) => {
      return Object.entries(filter).every(([k, v]) => (r as any)[k] === v);
    });
    return rec ?? null;
  }

  static async findAll(filter: Partial<RefreshTokenRecord>): Promise<RefreshTokenRecord[]> {
    return this.store.filter((r) => {
      return Object.entries(filter).every(([k, v]) => (r as any)[k] === v);
    });
  }

  static async deleteOne(filter: Partial<RefreshTokenRecord>): Promise<void> {
    const idx = this.store.findIndex((r) => {
      return Object.entries(filter).every(([k, v]) => (r as any)[k] === v);
    });
    if (idx >= 0) this.store.splice(idx, 1);
  }

  static async deleteMany(filter: Partial<RefreshTokenRecord>): Promise<void> {
    this.store = this.store.filter((r) => {
      // remove tokens that match all filter criteria
      const matches = Object.entries(filter).every(([k, v]) => (r as any)[k] === v);
      return !matches;
    });
  }

  static async deleteExpired(): Promise<void> {
    const now = new Date();
    this.store = this.store.filter((r) => r.expiresAt > now);
  }
}
