// import axios from "axios"
import '../plugins/axios'


// 首页

// 获取轮播图
export const getBanners = () => 'https://yw.52kfw.cn/api/v1/banner/bypos?id=62a6f7e1e30a2c5a126f93e3';

// 城市列表
// export const getCityList = () => `https://apis.netstart.cn/driver/city-area.json`
export const getCityList = () => 'https://yw.52kfw.cn/api/v1/company/city-list'

// 岗位列表
export const getPositionList = (location,isNews=0,isRecommend=1,kw,page=1,size=19) => {
    return `https://yw.52kfw.cn/api/v1/company/work-list?kw=${kw}&isNews=${isNews}&isRecommend=${isRecommend}&location=${location}&page=${page}&size=${size}`
}

// 公司列表
export const getCompanyList = (page=1,size=7) => `https://yw.52kfw.cn/api/v1/company/company-list?page=${page}&size=${size}`

// 公司总数
export const getCompanyTotal = () => 'https://yw.52kfw.cn/api/v1/company/company-total'


// 手机号登录
export const SignIn = (phone='',code='') => `https://yw.52kfw.cn/api/user/phone-login?phone=${phone}&code=${code}`

// 岗位详情
export const getPositionDetail = (id) => `https://yw.52kfw.cn/api/v1/company/work-info?workid=${id}`

// 公司详情
export const getCompanyDetail = (id) => `https://yw.52kfw.cn/api/v1/company/company-info?companyid=${id}`

// 常见问题
export const getFAQ = () => `https://yw.52kfw.cn/api/v1/company/company-faq`
