<template>
    <div class="XiuLiChangShouKuanJieSuan">
        <header class="content_title">
            <ul class="title_box">
                <li class="title_box_left">
                    <span class="line_title"></span>
                    <span class="name_title"> &nbsp;加油券账单</span>
                </li>
                <li class="title_box_right">
                    <span class="shuaxin">
                        <button @click="refresh_page()" type="button" class="btn btn-outline btn-default">
                            <span class="glyphicon glyphicon-refresh"></span>
                            刷新
                        </button>
                    </span>
                </li>
            </ul>
        </header>

        <nav class="content_nav">
            <ul class="content_nav_box">
                <li class="content_nav_left">
                    <span class="shujuliebiao">筛选查询</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;

                </li>
                <li class="content_nav_right">
                    <span @click="shaixuan_showBtn">
                        <span v-if="shaixuan_show"> 收起筛选</span>
                        <span v-else>打开筛选</span>
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button @click="init()" type="button" class="btn btn-outline btn-default">
                        查询结果
                    </button>
                </li>
            </ul>
            <ul class="search_ul">
                <li>
                    加油站名称：
                    <input v-model="jia_name" type="text" class="form-control line_input">
                </li>
                <li>
                    核销日期：
                    <input id="first_time" class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;&nbsp; - &nbsp;&nbsp;
                    <input id="end_time" class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                </li>
                <li>
                    结算状态：
                    <select class="form-control  tem2 line_input" v-model="jie_state">
                        <option value="">全部</option>
                        <option value="1">待结算</option>
                        <option value="2">已结算</option>
                    </select>
                </li>
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>加油券编码</th>
                        <th>面额</th>
                        <th>销售金额</th>
                        <th>用户手机</th>
                        <th>核销日期</th>
                        <th>加油站</th>
                        <th>加油站结算净额</th>
                        <th>商家佣金</th>
                        <th>净利润</th>
                        <th>结算状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.gas_coupon_code}} </td>
                        <td> {{list.gas_coupon_money}} </td>
                        <td> {{list.gas_coupon_sale_money}} </td>
                        <td> {{list.phone}} </td>
                        <td> {{list.use_time}} </td>
                        <td> {{list.company_name}} </td>
                        <td> {{list.gas_coupon_close_money}} </td>
                        <td> {{list.charge_money}} </td>
                        <td> {{list.profit}} </td>
                        <td>
                            <span v-if="list.close_state == 1">未结算</span>
                            <span v-else-if="list.close_state == 2">已结算</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-xs-12 Top20">
                <div id="page" style="text-align: center;"></div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'XiuLiChangShouKuanJieSuan',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            userId: '',
            listsTable: [],
            // 搜索的字段
            jia_name: '',
            jie_state: ''
        }
    },
    created () {
        var this_1 = this
        this_1.userId = sessionStorage.getItem('uid')
    },
    methods: {
        init: function (curr) {
            var this_1 = this
            var aaa = {
                pageNum: curr || "1",
                pageSize: "10",
            }
            // 搜索的 字段
            if (this_1.jia_name) aaa.coupon_name = this_1.jia_name
            if (this_1.jie_state) aaa.card_state = this_1.jie_state
            if ($('#first_time').val()) aaa.first_time = $('#first_time').val()
            if ($('#end_time').val()) aaa.end_time = $('#end_time').val()
            // ajax-post
            var url = '/backStage/gasCardClose/selectCoupon'
            post_ajax(url, aaa, function (json) {
                // console.log('请求的页面的初始数据')
                // console.log(json)
                this_1.listsTable = json.data.list
                !this_1.listsTable.length && (this_1.listsTable = [{}])
                this_1.listsTable.forEach(item => {
                    item.use_time && (item.use_time = get_str_time(item.use_time))
                });
                var pages = json.data.pages
                laypage({
                    cont: 'page',
                    pages: pages,
                    curr: curr || 1,
                    jump: function (e, first) {
                        if (!first) {
                            var curr = e.curr;
                            this_1.init(curr);
                        }
                    }
                })
            })
        },
        // 筛选框的显示隐藏
        shaixuan_showBtn: function () {
            var this_1 = this
            this_1.shaixuan_show = !this_1.shaixuan_show
            $(".search_ul").toggle(300)
        },
        // 刷新按钮
        refresh_page: function () {
            location.reload()
        },
        // 清空数据
        empty_data () {
            this.jie_state = ''
            this.jia_name = ''
            $('#end_time').val('')
            $('#first_time').val('')
        },
        // 查看按钮
        see_it () {
            var this_1 = this
        }
    },
    mounted () {
        var this_1 = this
        this_1.init()
    }
}
</script>
<style scoped>
.line_input {
  width: 200px;
  display: inline-block;
}
.search_ul > li {
  display: inline-block;
  margin-right: 20px;
}
.search_ul > li:nth-child(1) {
  text-indent: 20px;
}
.color_r {
  color: red;
}
th,
td {
  text-align: center; /** 设置水平方向居中 */
  vertical-align: middle; /** 设置垂直方向居中 */
}
</style>
