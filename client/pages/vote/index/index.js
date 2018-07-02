var app = getApp()
Page({
  data: {
    currentTab: 0,
    joinData: '',
    createData: '',
    groupData: ''
  },
  onShow: function () {
    var that = this;
    that.updateData();
  },
  updateData: function () {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({  //请求我参加的投票
      url: app.globalData.host + '/application/vote/myJoin',
      data: {
        openid: app.globalData.openid,
      },
      dataType: 'JSONP',
      success: function (res) {
        wx.hideLoading();
        that.setData({
          joinData: JSON.parse(res.data)
        })
      }
    });
    wx.request({  //请求我创建的接龙列表
      url: app.globalData.host + '/application/vote/myCreate',
      data: {
        openid: app.globalData.openid,
      },
      dataType: 'JSONP',
      success: function (res) {
        wx.hideLoading();
        that.setData({
          createData: JSON.parse(res.data)
        })
      }
    });
    wx.request({  //请求该群的taskid数据列表
      url: app.globalData.host + '/application/vote/getGIDTask',
      data: {
        gid: app.globalData.enterGId,
      },
      dataType: 'JSONP',
      success: function (res) {
        wx.hideLoading();
        console.log("app.globalData.enterGId=" + app.globalData.enterGId)
        console.log('请求到的群taskid', JSON.parse(res.data))
        that.setData({
          groupData: JSON.parse(res.data)
        })
      }
    });
  },
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current,
    })
  },
  creat: function () {
    var that = this;
    wx.navigateTo({
      url: '../create/create'
    })
  },
  gotoEnroll: function (e) {
    var that = this;
    //console.log("跳转带的数据:" + e)
    console.log(e)
    wx.navigateTo({
      url: '../choose/choose?voteid=' + e.currentTarget.dataset.voteid
    })
  }
})