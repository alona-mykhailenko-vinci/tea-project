// Base API configuration and utility functions
const API_BASE_URL = 'http://localhost:3000/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export class ApiError extends Error {
  public status: number;
  public response?: any;

  constructor(
    message: string,
    status: number,
    response?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

/**
 * Generic API request handler with error handling and logging
 */
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  console.log(`🟦 FRONTEND: Making ${options.method || 'GET'} request to: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log('🟦 FRONTEND: Response status:', response.status);
    console.log('🟦 FRONTEND: Response ok:', response.ok);

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        await response.text()
      );
    }
    
    const data = await response.json();
    console.log('🟦 FRONTEND: Response data:', data);
    
    return data;
  } catch (error) {
    console.error('🟦 FRONTEND ERROR: API request failed:', error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'An unknown error occurred',
      0
    );
  }
};