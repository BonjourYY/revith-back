import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SM3 } from 'gm-crypto'; // Hypothetical SM3 library for Node.js

@Injectable()
export class SignatureValidatorService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private signatureStr: string = '';
  private readonly excludeFields: string[] = ['file', 'files', 'signature'];

  constructor(configService: ConfigService) {
    this.clientId = configService.get<string>('CLIENT_ID') || '';
    this.clientSecret = configService.get<string>('CLIENT_SECRET') || '';
  }

  /**
   * Verifies if the provided signature is valid.
   * @param data - Data to verify.
   * @param signature - Signature to verify against (optional, defaults to data.signature).
   * @returns Whether the signature matches.
   */
  verifySignature(data: Record<string, any>, signature?: string): boolean {
    const signToVerify = signature ?? data.signature ?? '';
    const generatedSign = this.generateSignature(data);
    return signToVerify.toUpperCase() === generatedSign.toUpperCase();
  }

  /**
   * Generates a signature for the provided data.
   * @param data - Data to sign.
   * @param withRawUrlencode - Whether to use raw URL encoding (kept for compatibility, defaults to false).
   * @returns Generated signature string.
   */
  generateSignature(
    data: Record<string, any>,
    withRawUrlencode = false,
  ): string {
    // Filter out keys starting with underscore
    let filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !key.startsWith('_')),
    );

    // Filter excluded fields
    filteredData = this.filterExcludedFields(filteredData);

    // Process values
    filteredData = this.processValues(filteredData, withRawUrlencode);

    // Sort by keys
    const sortedKeys = Object.keys(filteredData).sort();

    // Build signature parts
    const signParts = sortedKeys.map((key) => `${key}=${filteredData[key]}`);

    // Assemble final signature string: clientId + params + clientSecret
    this.signatureStr = `${process.env.CLIENT_ID}&${signParts.join('&')}&${process.env.CLIENT_SECRET}`;

    // Generate SM3 signature
    return SM3.digest(this.signatureStr, 'utf8', 'hex'); // Adjust based on actual SM3 library API
  }

  /**
   * Processes data values, handling arrays and primitive types.
   * @param data - Data to process.
   * @param withRawUrlencode - Whether to use raw URL encoding.
   * @returns Processed data.
   */
  private processValues(
    data: Record<string, any>,
    withRawUrlencode: boolean,
  ): Record<string, any> {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        let processedValue: string;
        if (Array.isArray(value)) {
          if (value.length === 0) {
            processedValue = '[]';
          } else {
            processedValue = JSON.stringify(
              this.sortArrayRecursively(value),
              null,
              0,
            );
          }
        } else {
          processedValue = this.normalizeValue(value);
        }
        return [key, processedValue]; // URL encoding skipped as per original
      }),
    );
  }

  /**
   * Recursively sorts arrays.
   * @param array - Array to sort.
   * @returns Sorted array.
   */
  private sortArrayRecursively(array: any[]): any[] {
    const processedArray = array.map((value) =>
      Array.isArray(value)
        ? this.sortArrayRecursively(value)
        : this.normalizeValue(value),
    );

    if (this.isAssociativeArray(array)) {
      // Convert to object, sort keys, and back to array if needed
      const obj = Object.fromEntries(
        processedArray.map((v, i) => [i.toString(), v]),
      );
      return Object.keys(obj)
        .sort()
        .map((key) => obj[key]);
    }

    return processedArray;
  }

  /**
   * Checks if an array is associative.
   * @param array - Array to check.
   * @returns Whether the array is associative.
   */
  private isAssociativeArray(array: any[]): boolean {
    if (array.length === 0) return false;
    return array.some((_, i) => !array.hasOwnProperty(i.toString()));
  }

  /**
   * Normalizes values to strings.
   * @param value - Value to normalize.
   * @returns Normalized string.
   */
  private normalizeValue(value: any): string {
    if (typeof value === 'boolean') {
      return value ? '1' : '0';
    }
    if (value === null || value === '' || value === undefined) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return value.toString();
      }
      // Handle floating-point numbers
      let str = value.toString();
      str = str.replace(/\.?0+$/, ''); // Remove trailing zeros and decimal point
      return str;
    }
    return String(value);
  }

  /**
   * Filters out excluded fields.
   * @param data - Data to filter.
   * @returns Filtered data.
   */
  private filterExcludedFields(data: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        if (this.excludeFields.includes(key)) {
          return false;
        }
        return (
          typeof value === 'boolean' ||
          value !== '' ||
          typeof value === 'number'
        );
      }),
    );
  }

  /**
   * Sets additional fields to exclude.
   * @param fields - Fields to exclude.
   */
  setExcludeFields(fields: string[]): void {
    this.excludeFields.push(...fields);
  }

  /**
   * Gets the last generated signature string.
   * @returns Signature string.
   */
  getSignatureStr(): string {
    return this.signatureStr;
  }
}
