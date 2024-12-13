'use server'

import { NextResponse } from 'next/server'
import { luhnValidator } from '../utils/validators.utils';
import { ValidateSinRequest, ValidateSinResponse } from '../types';

//Basic Post for validation, but can improve with encryption of SIN and a middleware to validate the request
export async function POST(request: Request) {
  try {

    const { sin }: ValidateSinRequest = await request.json();
    
    if (!sin || typeof sin !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    // Validate SIN
    const isValid = await luhnValidator(sin);

    const response: ValidateSinResponse = { isValid };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error during SIN validation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 