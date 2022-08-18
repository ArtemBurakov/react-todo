import axios from 'axios'

export default axios.create({
  baseURL: `http://192.168.88.23/php-yii2-todo/backend/web/v1/`,
  timeout: 10000,
})
