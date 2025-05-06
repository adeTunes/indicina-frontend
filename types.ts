export interface EncodeResponse {
  shortUrl: string;
}

export type ListResponse = Record<
  string,
  {
    longUrl: string;
    createdAt: string;
    visits: number;
  }
>;
