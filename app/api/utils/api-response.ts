import { NextResponse } from 'next/server';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export const successResponse = <T>(data: T, statusCode = 200): NextResponse => {
  return NextResponse.json({
    success: true,
    data,
  }, { status: statusCode });
};

export const errorResponse = (error: string, statusCode = 400): NextResponse => {
  return NextResponse.json({
    success: false,
    error,
  }, { status: statusCode });
};
