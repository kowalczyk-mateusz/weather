export interface ApiError {
  message: string;
  name: string;
  response: {
    data: {
      cod: string;
      message: string;
    };
  };
}
