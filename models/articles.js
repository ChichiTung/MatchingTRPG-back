import { Schema, model, ObjectId } from 'mongoose'

const schema = new Schema({
  user_id: {
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少作者']
  },
  article: {
    type: String,
    required: [true, '缺少內容']
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['角色扮演', '帶團經驗', '劇本暴雷', '資源分享'],
      message: '文章分類錯誤'
    }
  },
  beginner: Boolean

})

export default model('articles', schema)