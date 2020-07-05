// pages/index/introduction/introduction.js
Page({



  /**
   * 页面的初始数据
   */
  data: {
    introductionTextHeight: "300rpx",
    showMoreAndLessPicture: "/images/showMore.png",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  jumpToNavigation: function() {
    var o = {
      name: '红满堂',
      location: {
        lat: '23.162125',
        lng: '113.358389'
      }
    };
    wx.navigateToMiniProgram({
      appId: 'wx7643d5f831302ab0',
      envVersion: 'release',
      path: "pages/multiScheme/multiScheme?endLoc=" + JSON.stringify(o) + "&qbMode=0",
      success(res) {
        // 打开成功
      }
    })

  },
  /*地图组件就改了这里和app.json "usingComponents"以下全部内容，删了就可以重写 */


  showMoreAndLess: function() {
    if (this.data.introductionTextHeight == "100%") {
      this.setData({
        introductionTextHeight: "300rpx",
        showMoreAndLessPicture: "/images/showMore.png"
      })
    } else {
      this.setData({
        introductionTextHeight: "100%",
        showMoreAndLessPicture: "/images/showLess.png"
      })
    }

  },

  
  bindGetUserInfo: function(event) {
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.login({
            //wx.login才能调用code，后面用得上code，code是登录凭证
            success: function(res) {
              var code = res.code;
              if (code) {
                wx.getUserInfo({
                  success: function(res) {
                    console.log(code);
                    wx.request({
                      url: 'https://scaudachuang.xyz:8080/login/decodeUserInfo',
                      method: 'post',
                      header: {
                        'Content-Type': 'application/json'
                      },
                      data: {
                        code: code,
                        iv: res.iv,
                        encryptedData: res.encryptedData,
                      },
                      success: function(res) {
                        console.log("code上传成功,开始接收返回数据")
                        console.log(res);
                      },
                      fail: function() {
                        console.log("code上传失败")
                      }
                    })
                  }
                })
              }
            }
          })
        } else {
          console.log("未授权，数据不够");
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // // 查看是否授权
    // wx.getSetting({
    //   success: function(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       //  已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       console.log("用户已授权,可以直接调用 getUserInfo 获取头像昵称，不会弹框")
    //       wx.getUserInfo({
    //         success: function(res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
    wx.request({
      url: 'https://scaudachuang.xyz:8080/comment/commentsDivideIntoPages',
      method: 'post',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        buildingId: 1,
        page: 0,
        size: 5,
        sortKey: 'timeOfCommentary',
      },
      success: function(res) {
        console.log("服务器返回数据成功");
        console.log(res)
      },
      fail: function(res) {
        console.log("服务器返回数据失败");
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})