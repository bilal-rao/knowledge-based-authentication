// export default () => {
//   const env = process.env.NODE_ENV;
//   if (env === 'development') {
//     return {
//       apiUrl: 'https://services-backend.online/identity/api'
//     }
//   } else {
//     return {
//       apiUrl: 'https://services-backend.online:8443/identity/api'
//     }
//   }
// };

export default () => {
    return {
      apiUrl: 'https://services-backend.online/identity/api'
    }
};

