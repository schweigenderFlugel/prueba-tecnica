/* eslint-disable prettier/prettier */
export default class HttpError extends Error {
  public status: number;
  public details: string | undefined;

  constructor(status: number = 500, details: string) {
    super();
    this.status = status,
    this.details = details ?? undefined;
  }
}