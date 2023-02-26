import users from '../models/users.js'
import modules from '../models/modules.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    await users.create({
      account: req.body.account,
      nickname: req.body.nickname,
      password: req.body.password,
      email: req.body.email,
      dc_account: req.body.dc_account,
      dc_id: req.body.dc_id,
      image: req.file?.path || ''
    })
    res.status(200).json({ success: true, message: '註冊成功' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).json({ success: false, message: '帳號重複' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens.push(token)
    await req.user.save()
    res.status(200).json({
      success: true,
      message: '登入成功',
      result: {
        token,
        account: req.user.account,
        email: req.user.email,
        nickname: req.user.nickname,
        dc_account: req.user.dc_account,
        dc_id: req.user.dc_id,
        favorite: req.user.favorite,
        role: req.user.role,
        image: req.user.image
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens[idx] = token
    await req.user.save()
    res.status(200).json({ success: true, message: '', result: token })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getUser = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: '',
      result: {
        _id: req.user._id,
        account: req.user.account,
        email: req.user.email,
        image: req.user.image || '',
        nickname: req.user.nickname,
        dc_account: req.user.dc_account,
        dc_id: req.user.dc_id,
        favorite: req.user.favorite,
        role: req.user.role,
        freeTime: req.user.freeTime,
        intro: req.user.intro || ''
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editUser = async (req, res) => {
  try {
    const result = await users.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      nickname: req.body.nickname,
      dc_account: req.body.dc_account,
      dc_id: req.body.dc_id,

      image: req.file?.path || '',
      freeTime: req.body.freeTime,
      intro: req.body.intro || ''

    }, { new: true })
    if (!result) {
      res.status(404).json({ success: false, message: '找不到 user' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error)
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到 user' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

// 加最愛(缺測試)
export const editFavorite = async (req, res) => {
  try {
    // 找收藏有沒有此商品
    const idx = req.user.favorite.findIndex(favorite => favorite.m_id.toString() === req.body.m_id)

    if (idx > -1) {
      // 如果有，檢查新數量是多少
      const status = req.user.favorite[idx].status

      console.log(req.body.status)

      if (status <= 0) {
        // 如果新數量小於 0，從購物車陣列移除
        req.user.favorite.splice(idx, 1)
      } else {
        req.user.favorite[idx].status = status
      }
    } else {
      // 如果我的最愛內沒有此商品，檢查商品是否存在
      const module = await modules.findById(req.body.m_id)
      // 如果不存在，回應 404
      if (!module || !module.living) {
        res.status(404).send({ success: false, message: '找不到模組' })
        return
      }
      // 如果存在，加入購物車陣列
      req.user.favorite.push({
        m_id: req.body.m_id,
        status: parseInt(1)
      })
    }
    await req.user.save()
    res.status(200).json({ success: true, message: '', result: req.user.favorite })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getFavorite = async (req, res) => {
  try {
    const result = await users.findById(req.user._id, 'favorite').populate('favorite.m_id')
    res.status(200).json({ success: true, message: '', result: result.favorite })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
