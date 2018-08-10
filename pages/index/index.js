const newsTypeMap ={
  0 : 'gn',
  1 : 'gj',
  2 : 'cj',
  3 : 'yl',
  4 : 'js',
  5 : 'ty',
  6 : 'other',
}

var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    newslist: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    currentTab: 0,
    length: 0,
    essay: [],
    head_id: '',
    head_title: '',
    head_source: '',
    head_date: '',
    head_firstImage:'',
    default_img: '/images/default-img.png',
    newsType: 'gn',
  },
  onLoad() {
    this.getMessage()
  },
  onPullDownRefresh(){
    wx.showToast({
      title: '新闻加载中...',
      duration: 500
    })
    this.getMessage(() => {
      wx.stopPullDownRefresh()
    })
  },

  //获取新闻列表
  getMessage(callback) {
    wx.showToast({
      title: '新闻加载中...',
      duration: 500
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.newsType,
      },
      success: res => {
        let result = res.data
        this.getNews(result)
      },
      complete: () => {
        callback && callback() 
      }
    })
  },
  //获取新闻详情
  onTapNewsDetail: function(event){
    let id = event.currentTarget.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  //获取新闻
  getNews(result) {
    let essay = result.result
    this.setArticle(result.result)
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    let newsType = newsTypeMap[e.currentTarget.dataset.idx]
    this.setData({
      newsType: newsType
    })
    this.getMessage()
  },
  
  //设定新闻
  setArticle(result){
    let essay = []
    for(let i = 0;i < result.length; i +=1 ){
      essay.push({
        id: result[i].id,
        title: result[i].title,
        date: util.setTime(result[i].date),
        source: result[i].source,
        firstImage: result[i].firstImage
      })
    }
    this.setData({
      head_id:result[0].id,
      head_title: result[0].title,
      head_date: util.setTime(result[0].date),
      head_source: result[0].source,
      head_firstImage: result[0].firstImage,
      essay: essay
    })
  },
})