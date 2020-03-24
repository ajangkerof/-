/*
  自定义日期过滤器
 */
import Vue from "vue"
// 引入日期处理插件
// import moment from "moment"

// 换成体积更小的日期处理插件date-fns
import Format from "date-fns/format"

Vue.filter("date-filter", (value, format) => {
  // return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
  return Format(value, format || 'yyyy-MM-dd HH:mm:ss')
})
