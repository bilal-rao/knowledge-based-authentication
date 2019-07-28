// export default () => {
//   const env = process.env.NODE_ENV;
//   if (env === 'development') {
//     return {
//       apiUrl: 'https://services-backend.online/identity/api/v1.0/oauth2'
//     }
//   } else {
//     return {
//       apiUrl: 'https://services-backend.online:8443/identity/api/v1.0/oauth2'
//     }
//   }
// };

export default () => {
    return {
      apiUrl: 'https://services-backend.online/identity/api/v1.0/oauth2'
    }
};

