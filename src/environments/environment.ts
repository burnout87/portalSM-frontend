// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sms: "http://localhost:4000/api/sms",
  owners: "http://localhost:4000/api/owners",
  smsSearch:"http://localhost:4000/api/sms/search",
  updateCard:"http://localhost:4000/api/sms/update",

  // sms: "http://192.168.0.121:4000/api/sms",
  // owners: "http://192.168.0.121:4000/api/owners",
  // smsSearch:"http://192.168.0.121:4000/api/sms/search",
  // updateCard:"http://192.168.0.121:4000/api/sms/update",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
