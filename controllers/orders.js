import orders from '../models/orders.js'
// import users from '../models/users.js'

export const createOrder = async (req, res) => {
  try {
    const result = await orders.create({
      // orderSchema
      m_id: req.body.m_id,
      m_name: req.body.m_name,
      gm: req.body.gm,

      // plSchema
      pl_id: req.user._id,
      pl_nickname: req.user.nickname,
      pl_dc_account: req.user.dc_account,
      pl_dc_id: req.user.dc_id,

      // schema
      ho: req.body.ho
      // date: req.body.date
    })
    res.status(200).json({ success: true, message: '成功報名', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤500' })
    }
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const result = await orders.find({ pl_id: req.user._id }).populate('m_id')
    res.status(200).json({ success: true, message: '終於成功了~', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤-My' })
  }
}

export const getAllOrdersGM = async (req, res) => {
  try {
    // .populate(關聯資料路徑, 取的欄位)
    // 只能看的到自己是 gm 的團
    const result = await orders.find({ gm: req.user.nickname }).populate('m_id')
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤-GM' })
  }
}

export const getAllOrders = async (req, res) => {
  try {
    // .populate(關聯資料路徑, 取的欄位)
    // 只能看的到自己是 gm 的團
    const result = await orders.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤-All' })
  }
}

export const editOrder = async (req, res) => {
  try {
    const result = await orders.findByIdAndUpdate(req.params.id, {
      m_id: req.body.m_id,
      m_name: req.body.m_name,
      gm: req.body.gm,

      // plSchema
      pl_id: req.user._id,
      pl_nickname: req.user.nickname,
      pl_dc_account: req.user.dc_account,
      pl_dc_id: req.user.dc_id,

      // schema
      ho: req.body.ho
    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到訂單' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到訂單' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
