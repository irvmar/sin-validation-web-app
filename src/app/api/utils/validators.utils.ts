
'use server'

/**
 * Luhn validator for SIN numbers
 * @param sin - The SIN number to validate
 * @returns true if the SIN is valid, false otherwise
 */

export async function luhnValidator(sin: string): Promise<boolean> {

    if (sin.length !== 9) return false;

    let sum = 0;
    let alternate = false;

    // Iterate over the SIN from right to left and double every second digit using alternate flag
    for (let i = sin.length - 1; i >= 0; i--) {
      let doubleNumber = parseInt(sin.charAt(i));
      if (alternate) {
        doubleNumber *= 2;
        if (doubleNumber >= 10) {
          doubleNumber = (doubleNumber % 10) + 1;
        }
      }
      sum += doubleNumber;
      alternate = !alternate;
    }

    // If the sum is divisible by 10 the SIN is valid
    return (sum % 10 === 0);

  }