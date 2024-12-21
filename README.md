# Expo News App

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

Extra dependencies added here

- [Axios](https://www.npmjs.com/package/axios)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/install/)
- [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- [Moment JS](https://www.npmjs.com/package/moment)

## Hướng dẫn cấu hình API URL

1. Mở file `config.js` trong thư mục dự án.
2. Tìm dòng:
   ``javascript
   API_URL: "http://localhost:3000"
3. Thay URL http://localhost:3000 thành URL của backend của bạn. Ví dụ: API_URL: "http://192.168.1.6:3000"

4. Nếu bạn muốn chuyên nghiệp hơn, bạn có thể dùng file `.env` để lưu URL backend. Ví dụ:

**Cài đặt thư viện `react-native-dotenv`**:
   ``bash
   npm install react-native-dotenv
