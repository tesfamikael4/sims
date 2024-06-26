import { IsString, Matches } from 'class-validator';

export class ImportStudentsDto {
  @IsString()
  @Matches(/^\d{4}-\d{4}$/, {
    message: 'Academic year must be in YYYY-YYYY format',
  })
  academicYear: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_ \-]+\.(xls|xlsx)$/, {
    message: 'File name must be a valid Excel file with .xls or .xlsx extension',
  })
  fileName: string;
}
