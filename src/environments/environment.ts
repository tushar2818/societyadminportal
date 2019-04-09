// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export enum DateFormat {
  DDMMYYYY = "DD/MM/YYYY",
  ddMMyyyy = "dd/MM/yyyy",

  MMDDYYYY = "MM/DD/YYYY",
  MMddyyyy = "MM/dd/yyyy"
}

export enum TimeFormat {
  HHmm = "HH:mm",
  hhmma = "hh:mm a"
}

export const environment = {
  production: false,
  BASE_API_ENDPOINT_IDENTITY: 'http://localhost:31713/api/',
  BASE_API_ENDPOINT_CITY: 'http://localhost:31497/api/',
  BASE_API_ENDPOINT_SOCIETY: 'http://localhost:44354/api/',
  DATE_FORMAT: DateFormat.DDMMYYYY,
  DATE_FORMAT_PIPE: DateFormat.ddMMyyyy,
  TIME_FORMAT: TimeFormat.HHmm
};
