<template>
    <div class="JiaYouQuanDingDan">
        <header class="content_title">
            <ul class="title_box">
                <li class="title_box_left">
                    <span class="line_title"></span>
                    <span class="name_title"> &nbsp;加油券订单</span>
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
            <ul class="search_ul dingdanjilu_ul">
                <li>
                    订单编号：
                    <input v-model="order_id" class="form-control line_input ">

                </li>
                <li>
                    创建日期：
                    <input id="first_time" class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;&nbsp; - &nbsp;&nbsp;
                    <input id="end_time" class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                </li>
                <li>
                    订单状态：
                    <select v-model="is_close" class="form-control  tem2 line_input">
                        <option value="">请选择</option>
                        <option value="1">待付款</option>
                        <option value="2">已完成</option>
                        <option value="3">已取消</option>
                    </select>
                </li>
                <li>
                    支付渠道：
                    <select v-model="pay_line" class="form-control  tem2 line_input">
                        <option value="">请选择</option>
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
                        <th>加油卷面额</th>
                        <th>购买数量</th>
                        <th>实付金额</th>
                        <th>支付渠道</th>
                        <th>订单状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.order_code_id}} </td>
                        <td> {{list.pay_time}} </td>
                        <td> {{list.user_name}} </td>
                        <td> {{list.gas_money}} </td>
                        <td> {{list.gas_num}} </td>
                        <td> {{list.gas_money_actually}} </td>
                        <td>
                            <span v-if="list.pay_way == 1">微信</span>
                            <span v-else-if="list.pay_way == 2">支付宝</span>
                            <br>{{list.pay_number}}
                        </td>
                        <td>
                            <span v-if="list.order_state == 1">待付款</span>
                            <span v-else-if="list.order_state == 2">已完成</span>
                            <span v-else-if="list.order_state == 3">已取消</span>
                        </td>
                        <td class="chakan" @click="see_it(list.id)">查看详情</td>
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
                        <h4 class="modal-title" id="myModalLabel"> 订单详情 </h4>
                    </div>
                    <div class="modal-body ">
                        <h3>基本信息</h3>
                        <div class="ml-20">
                            <label>订单编号:</label>&nbsp;&nbsp;{{basic.order_code_id}}
                        </div>
                        <div class="ml-20">
                            <label>付款金额:</label>&nbsp;&nbsp;{{basic.gas_money_actually}}
                        </div>
                        <div class="ml-20" v-if="basic.pay_way == 1">
                            <label>支付方式:</label>&nbsp;&nbsp;微信&nbsp;&nbsp;&nbsp;{{basic.pay_number}}
                        </div>
                        <div class="ml-20" v-else-if="basic.pay_way == 2">
                            <label>支付方式:</label>&nbsp;&nbsp;支付宝&nbsp;&nbsp;&nbsp;{{basic.pay_number}}
                        </div>
                        <div class="ml-20">
                            <label>提交时间:</label>&nbsp;&nbsp;{{basic.create_time}}
                        </div>
                        <div class="ml-20">
                            <label>供货商:</label>&nbsp;&nbsp;{{basic.supply}}
                        </div>
                        <div class="ml-20">
                            <label>用户信息:</label>&nbsp;&nbsp;{{basic.userName}}&nbsp;&nbsp;{{basic.phone}}
                        </div>
                        <h3>商品信息</h3>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>加油券ID</th>
                                    <th>有效期</th>
                                    <th>面额</th>
                                    <th>实付金额</th>
                                    <th>使用状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> {{coupon_list.gas_coupon_code}} </td>
                                    <td>
                                        <span v-if="coupon_list.time_type == 1"> 永久 </span>
                                        <span v-else-if="coupon_list.time_type == 2"> {{coupon_list.first_time}} —— {{coupon_list.end_time}} </span>
                                    </td>
                                    <td> {{coupon_list.gas_money}} </td>
                                    <td> {{coupon_list.gas_coupon_sale_money}} </td>
                                    <td>
                                        <span v-if="coupon_list.gas_state == 1"> 待使用 </span>
                                        <span v-else-if="coupon_list.gas_state == 2"> 已使用 </span>
                                        <span v-else-if="coupon_list.gas_state == 3"> 已过期 </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="close">关闭</button>
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
    name: 'JiaYouQuanDingDan',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            userId: '',
            listsTable: [],
            basic: '',
            coupon_list: '',
            // 搜索字段
            first_time: '',
            end_time: '',
            order_id: '',
            is_close: '',
            pay_line: ''

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
                userId: this_1.userId,
                pageNum: curr || "1",
                pageSize: "10"
            }
            // 搜索的 字段
            if ($("#first_time").val()) aaa.first_time = $("#first_time").val()
            if ($("#end_time").val()) aaa.end_time = $("#end_time").val()
            if (this_1.is_close !== '') aaa.state = this_1.is_close
            if (this_1.pay_line) aaa.pay_way = this_1.pay_line
            if (this_1.order_id) aaa.order_code_id = this_1.order_id
            // ajax-post
            var url = '/backStage/gasOrder/select'
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
        // 查看按钮
        see_it (id) {
            var this_1 = this
            var aaa = { order_id: id }
            // ajax-post
            var url = '/backStage/gasOrder/orderDetail'
            post_ajax(url, aaa, function (json) {
                // console.log('请求的页面的初始数据')
                // console.log(json)
                if (json.data.basic) this_1.basic = json.data.basic
                if (json.data.coupon_list) this_1.coupon_list = json.data.coupon_list[0]
                if (this_1.basic.create_time) this_1.basic.create_time = get_str_time(this_1.basic.create_time)
                if (this_1.coupon_list.first_time) this_1.coupon_list.first_time = get_str_time(this_1.coupon_list.first_time)
                if (this_1.coupon_list.end_time) this_1.coupon_list.end_time = get_str_time(this_1.coupon_list.end_time)
            })
            $("#myModal_1").modal('show')
        },
        // 关闭按钮
        close () {
            this.basic = ''
            this.coupon_list = ''
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
</style>
