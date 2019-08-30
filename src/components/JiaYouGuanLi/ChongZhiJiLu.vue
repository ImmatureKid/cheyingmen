<template>
    <div class="ChongZhiJiLu">
        <header class="content_title">
            <ul class="title_box">
                <li class="title_box_left">
                    <span class="line_title"></span>
                    <span class="name_title"> &nbsp;充值记录</span>
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
                    支付日期：
                    <input id="firstTime" class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;&nbsp; - &nbsp;&nbsp;
                    <input id="endTime" class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                </li>
                <li>
                    <div class="btn-group">
                        <button type="button" @click="day_btn(1)" class="btn btn-default whiteBlack">今天</button>
                        <button type="button" @click="day_btn(2)" class="btn btn-default whiteBlack">昨天</button>
                        <button type="button" @click="day_btn(3)" class="btn btn-default whiteBlack">本月</button>
                    </div>
                </li>
                <li>
                    用户手机：
                    <input class="form-control line_input " v-model="use_tep">
                </li>
                <li>
                    订单状态：
                    <select class="form-control  tem2 line_input" v-model="order_state">
                        <option value="">全部</option>
                        <option value="1">待支付</option>
                        <option value="2">已完成</option>
                        <option value="3">已取消</option>
                    </select>
                </li>
                <li>
                    支付渠道：
                    <select v-model="pay_way" class="form-control  tem2 line_input">
                        <option value="">全部</option>
                        <option value="1">微信</option>
                        <option value="2">支付宝</option>
                    </select>
                </li>
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>订单编号</th>
                        <th>付款时间</th>
                        <th>付款用户</th>
                        <th>充值金额</th>
                        <th>实付金额</th>
                        <th>支付渠道</th>
                        <th>订单状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='list in listsTable'>
                        <td> {{list.order_code_id}} </td>
                        <td> {{list.pay_time}} </td>
                        <td> {{list.userName}} </td>
                        <td> ￥ {{list.gas_card_child_money}} </td>
                        <td> ￥ {{list.gas_card_child_actually_money}} </td>
                        <td>
                            <span v-if="list.pay_way == 1">微信</span>
                            <span v-else-if="list.pay_way == 2"> 支付宝 </span>
                        </td>
                        <td>
                            <span v-if="list.order_state == 1"> 待支付 </span>
                            <span v-else-if="list.order_state == 2"> 已完成 </span>
                            <span v-else-if="list.order_state == 3"> 已取消 </span>
                        </td>
                        <td class="chakan" @click="see_it(list)">查看</td>
                    </tr>
                </tbody>
            </table>
            <div class="col-xs-12 Top20">
                <div id="page" style="text-align: center;"></div>
            </div>
        </div>

        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal_1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel"> 充值详情 </h4>
                    </div>
                    <div class="modal-body ">
                        <h3>基本信息</h3>
                        <div class="ml-20">
                            <label>订单编号:</label>&nbsp;&nbsp;{{order_list.order_code_id}}
                        </div>
                        <div class="ml-20">
                            <label>加油卡号:</label>&nbsp;&nbsp;{{order_list.card_number}}
                        </div>
                        <div class="ml-20">
                            <label>充值金额:</label>&nbsp;&nbsp;￥ {{order_list.gas_card_child_money}}
                        </div>
                        <div class="ml-20">
                            <label>实付金额:</label>&nbsp;&nbsp;￥ {{order_list.gas_card_child_actually_money}}
                        </div>
                        <div class="ml-20">
                            <label>支付方式:</label>&nbsp;&nbsp;{{order_list.pay_way == 1 ? '微信' : '支付宝'}}&nbsp;&nbsp;&nbsp;{{order_list.pay_number}}
                        </div>
                        <div class="ml-20">
                            <label>提交时间:</label>&nbsp;&nbsp;{{order_list.create_time}}
                        </div>
                        <div class="ml-20">
                            <label>供货商:</label>&nbsp;&nbsp;{{order_list.supply}}
                        </div>
                        <div class="ml-20">
                            <label>用户信息:</label>&nbsp;&nbsp;{{order_list.userName}}&nbsp;&nbsp;{{order_list.phone}}
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button @click="guanbi_post()" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

    </div>
</template>
<script>
export default {
    name: 'ChongZhiJiLu',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            userId: '',
            listsTable: [],
            // 搜索字段
            first_time: '',
            end_time: '',
            pay_way: '',
            use_tep: '',
            order_state: '',
            // 订单详情
            order_list: ''
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
                pageSize: "10"
            }
            // 搜索的 字段
            if ($("#first_time").val()) aaa.first_time = $("#first_time").val()
            if ($("#end_time").val()) aaa.end_time = $("#end_time").val()
            if (this_1.pay_way) aaa.pay_way = this_1.pay_way
            if (this_1.use_tep) aaa.phone = this_1.use_tep
            if (this_1.order_state) aaa.order_state = this_1.order_state
            // ajax-post
            var url = '/backStage/gasCardOrder/selectGasOrder'
            post_ajax(url, aaa, function (json) {
                // console.log('请求的页面的初始数据')
                // console.log(json)
                this_1.listsTable = json.data.list
                !this_1.listsTable.length && (this_1.listsTable = [{}])
                for (var i in this_1.listsTable) {
                    if (this_1.listsTable[i].pay_time) this_1.listsTable[i].pay_time = get_str_time(this_1.listsTable[i].pay_time)
                }
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
        empty_data () {
            var this_1 = this
            $("#first_time").val('')
            $("#end_time").val('')
            this_1.use_tep = ''
            this_1.pay_way = ''
            this_1.order_state = ''
        },
        // 查看按钮
        see_it (list) {
            var this_1 = this
            this_1.order_list = list
            $("#myModal_1").modal('show')
        },
        // 点击今天，昨天，本月的
        day_btn: function (num) {
            var this_1 = this
            if (num == 1) {
                // 今天的现在的时间
                var endTime = new Date()
                this_1.endTime = get_str_time(endTime)
                // console.log('今天的现在时间')
                // console.log(this_1.endTime)
                // 获取今天的零点的时间戳
                var firstTime = new Date()
                firstTime.setHours(0)
                firstTime.setMinutes(0)
                firstTime.setSeconds(0)
                firstTime.setMilliseconds(0)
                firstTime = firstTime.getTime()
                firstTime = get_str_time(firstTime)
                // console.log('今天的0点的时间戳')
                // console.log(firstTime)
                this_1.firstTime = firstTime
            } else if (num == 2) {

                // 获取昨天的零点的时间戳
                var firstTime = new Date()
                firstTime.setHours(24)
                firstTime.setMinutes(0)
                firstTime.setSeconds(0)
                firstTime.setMilliseconds(0)
                firstTime = firstTime.getTime()
                firstTime = firstTime - 24 * 60 * 60 * 1000 * 2
                firstTime = get_str_time(firstTime)
                // console.log('昨天的0点的时间戳')
                // console.log(firstTime)
                this_1.firstTime = firstTime

                // 昨天的24点的时间
                var endTime = new Date()
                endTime.setHours(24)
                endTime.setMinutes(0)
                endTime.setSeconds(0)
                endTime.setMilliseconds(0)
                endTime = endTime.getTime()
                endTime = endTime - 24 * 60 * 60 * 1000
                endTime = get_str_time(endTime)
                // console.log('昨天的24点的时间戳')
                // console.log(endTime)
                this_1.endTime = endTime

            } else if (num == 3) {
                // 获取本月第一天的零点的时间戳 开始时间
                var firstTime = new Date()
                firstTime.setDate(1)
                firstTime.setHours(0)
                firstTime.setMinutes(0)
                firstTime.setSeconds(0)
                firstTime.setMilliseconds(0)
                firstTime = firstTime.getTime()
                firstTime = get_str_time(firstTime)
                // console.log('本月第一天的0点的时间戳')
                // console.log(firstTime)
                this_1.firstTime = firstTime

                // 本月里现在的时间 结束时间
                var endTime = new Date()
                this_1.endTime = get_str_time(endTime)
                // console.log('本月里今天的现在时间')
                // console.log(this_1.endTime)
            }
            this_1.init()
        },
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
  padding: 5px 20px;
}
th,
td {
  text-align: center; /** 设置水平方向居中 */
  vertical-align: middle; /** 设置垂直方向居中 */
}
.color_169BD5 {
  color: #169bd5;
}
.ml-20 {
  margin-left: 20px;
}
.whiteBlack {
  background-color: white;
  color: black;
}
</style>
