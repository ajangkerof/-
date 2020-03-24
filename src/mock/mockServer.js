/*
  模拟后台数据
 */
import Mock from "mockjs"
import data from "./data.json"

/* 货物 */
Mock.mock('/shopGoods', {code: 0, data: data.goods})

/* 评价 */
Mock.mock('/shopAssess', {code: 0, data: data.assess})

/* 商家 */
Mock.mock('/shopDetail', {code: 0, data: data.detail})
