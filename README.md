# BangumiSchedule
* [x] 显示每周播放的番组（weekday）
* [x] 过滤新番和继续播放的番（category）
* [x] 新番详情页面(外部链接)
* [x] 高亮选择关注番组，并将结果保存至cookie
* [ ] 显示在线观看链接

## Data Model
```javascript
onAirAnimeList = [{
  key: String, //anime category.id like 201610.01
  name: String, //anime name
  weekday: Number, //update on which weekday
  startDate: String, //start date
  endDate: String, //end date
  description: String, //anime description
  image: String, //anime image
  link: String //link to extra info
}]
```