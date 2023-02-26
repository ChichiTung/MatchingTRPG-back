import { Schema, model, ObjectId, Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const favoriteSchema = new Schema({
  m_id: {
    type: ObjectId,
    ref: 'modules',
    required: [true, '缺少模組']
  },
  status: {
    type: Boolean,
    required: [true, '缺少收藏狀態']
  }
})

const schema = new Schema({
  account: {
    type: String,
    required: [true, '缺少帳號'],
    minlength: [5, '帳號太短'],
    maxlength: [20, '帳號太長'],
    unique: true,
    // 這邊直接用 mongoose 做初步驗證
    // 用 $ 做結尾
    match: [/^[A-Za-z0-9]+$/, '帳號格式錯誤，只能有英數字']
  },
  nickname: {
    type: String,
    required: [true, '缺少對您的稱呼'],
    unique: true,
    maxlength: [20, '您的稱呼過長了...']
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, '缺少信箱'],
    unique: true,
    validate: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式錯誤'
    }
  },
  dc_account: {
    type: String,
    required: [true, '缺少 DC 使用者名稱'],
    unique: true
  },
  dc_id: {
    type: Number,
    required: [true, '缺少 DC 使用者名稱 # 後 4 碼數字']
    // unique: true
    // validate: {
    //   validator: function (dcId) {
    //     if (dcId.length === 4) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   },
    //   message: 'DC 使用者名稱 # 後只有 4 位數字'
    // }
  },

  tokens: {
    type: [String],
    default: []
  },
  // 老師的 cart 21:52
  favorite: {
    type: [favoriteSchema],
    default: []
  },
  role: {
    type: Number,
    // 0:使用者, 1:管理者
    default: 0
  },

  // 探索者檔案 add

  freeTime: {
    type: [String],
    default: []
  },
  image: {
    type: [String],
    default: ['https://source.boringavatars.com/beam/256/${account.value}?colors=ffffff,eed7c5,9ec4bb,abe4ff,d9abff']
  },
  intro: {
    type: String
  }

}, { versionKey: false })

// 密碼加鹽
schema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

schema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password) {
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

export default model('users', schema)
