import { Schema, model, ObjectId } from 'mongoose'

// const orderSchema = new Schema({
//   m_id: {
//     type: ObjectId,
//     ref: 'modules'
//     // required: [true, '缺少模組']
//   },
//   m_name: {
//     type: String,
//     ref: 'modules'
//   },
//   gm: {
//     type: String,
//     ref: 'users',
//     required: [true, '缺少 GM']
//   }
// })

// const plSchema = new Schema({
//   pl_id: {
//     type: ObjectId,
//     ref: 'users'
//     // required: [true, '缺少模組']
//   },
//   pl_nickname: {
//     type: String,
//     ref: 'users'
//   },
//   pl_dc_account: {
//     type: String,
//     ref: 'users'
//   },
//   pl_dc_id: {
//     type: Number,
//     ref: 'users'
//   }
// })

const schema = new Schema({
  // pls: {
  //   type: [plSchema],
  //   default: [],
  //   required: [true, '缺少PL']
  // },
  pl_id: {
    type: ObjectId,
    ref: 'users',
    default: ''
    // required: [true, '缺少模組']
  },
  pl_nickname: {
    type: String,
    ref: 'users',
    default: ''
  },
  pl_dc_account: {
    type: String,
    ref: 'users',
    default: ''
  },
  pl_dc_id: {
    type: Number,
    ref: 'users',
    default: ''
  },
  m_id: {
    type: ObjectId,
    ref: 'modules',
    default: ''
    // required: [true, '缺少模組']
  },
  m_name: {
    type: String,
    ref: 'modules',
    default: ''
  },
  gm: {
    type: String,
    ref: 'modules',
    default: ''
    // required: [true, '缺少 GM']
  },

  ho: {
    type: Number,
    ref: 'modules',
    default: 1
  },

  date: {
    type: Date,
    default: Date.now
  },
  public: Boolean

}, { versionKey: false })

export default model('orders', schema)
