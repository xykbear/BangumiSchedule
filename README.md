# BangumiSchedule
* [ ] 显示每周播放的番组（weekday）
* [ ] 过滤新番和继续播放的番（category）
* [ ] 完整模式和精简模式
* [ ] 高亮选择关注番组，并将结果保存至cookie
* [ ] 显示番组信息，并根据类型分色
* [ ] 显示在线观看链接

## Data Model
```javascript
onAirAnimeList = [{
  key: String, //anime category.id like 201610.01
  name: String, //anime name
  weekday: Number, //update on which weekday
  type: String, //like comic, novel
  startDate: String, //start date
  endDate: String, //end date
  description: String, //anime description
  image: String, //anime image
  tags: Array, //anime tag
  cast: Array, //main cast
  staft: Array, //main staff
  studio: String //anime studio
}]
```