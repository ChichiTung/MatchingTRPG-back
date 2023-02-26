import { Schema, model } from 'mongoose'
// import validator from 'validator'
// import bcrypt from 'bcrypt'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少模組名稱']
  },

  gm: {
    type: String,
    ref: 'users',
    default: 'unknown'
    // required: [true, '缺少GM']
  },

  // TRY-TRY-SEE
  // 未公開： default 先給必填欄位空值 !!
  living: {
    type: Boolean,
    // 0 未公開, 1 公開
    default: 0
  },
  image: {
    type: [String],
    // required: [true, '缺少圖片'],
    default: []
  },
  minTime: {
    type: Number,
    // required: [true, '缺少最小預估時長'],
    min: [0, '預估時長不得小於 0']
  },
  ho: {
    type: Number,
    min: [1, 'HO不得小於 1']

    // required: [true, '缺少預估人數'],
    // enum: {
    //   values: [1, 2, 3, 4, 5],
    //   message: '人數分類錯誤'
    // }
  },
  // pc: {
  //   type: String,
  //   required: [true, '缺少角卡要求'],
  //   enum: {
  //     // 限舊卡(參閱注意事項)
  //     values: ['限新卡', '限舊卡', '新舊卡不限'],
  //     message: '分類錯誤'
  //   }
  // },
  // beginner: {
  //   type: Boolean,
  //   default: 0
  // },
  difficulty: {
    type: Number,
    // required: [true, '缺少難易度說明'],
    default: 0.5
  },
  // lost: {
  //   type: String,
  //   required: [true, '缺少 Lost 率說明'],
  //   enum: {
  //     values: ['低', '中', '高'],
  //     message: 'Lost 率錯誤'
  //   }
  // },

  // 劇本類型
  // secretHO: Boolean,
  // pvp: Boolean,
  // specialBG: Boolean,

  // 自訂義 # 標籤
  hashtag: {
    type: [String],
    default: []
  },

  info: {
    type: String,
    // required: [true, '缺少模組說明'],
    default: '建議這邊只放最簡單的模組介紹就好~'
  },

  notice: {
    type: String,
    default: '有關 HO情報、公開情報、紙娃娃素材...等，是放在這區喔 :))'
  },

  ccfoliaLink: {
    type: String,
    // required: [true, '缺少可可亞連結'],
    default: ''
  },
  discordLink: {
    type: String,
    default: ''
  }

  // date: {
  //   type: Date,
  //   default: Date.now
  // }

  // 給 GM 的備團 checklist 功能： 已完成的部分打勾

  // 劇本翻譯
  // translate: Boolean,
  // 劇本整理
  // script: Boolean,
  // npc 角卡
  // npc: Boolean,
  // BGM
  // BGN: Boolean,
  // 圖片
  // bg: Boolean,
  // 可可亞房間
  // ccfolia: Boolean

})

export default model('modules', schema)
