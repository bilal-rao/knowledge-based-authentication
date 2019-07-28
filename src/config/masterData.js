// export default () => {
//   const env = process.env.NODE_ENV;
//   if (env === 'development') {
//     return {
//       apiUrl: 'https://services-backend.online/masterdata/api'
//     }
//   } else {
//     return {
//       apiUrl: 'https://services-backend.online:8443/masterdata/api'
//     }
//   }
// };

export default () => {
    return {
      apiUrl: 'https://services-backend.online/masterdata/api'
    }
};

