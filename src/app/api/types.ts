
export type ValidateSinRequest = {
    sin: string;
}

export type ValidateSinResponse = {
    isValid: boolean;
    error?: string;
}