<template>
    <div class="JiaYouQuanHeXiao">
        <header class="content_title">
            <ul class="title_box">
                <li class="title_box_left">
                    <span class="line_title"></span>
                    <span class="name_title"> &nbsp;加油券核销</span>
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
                    加油券ID：
                    <input v-model="order_id" class="form-control line_input ">

                </li>
                <li>
                    持有人手机：
                    <input v-model="use_tep" class="form-control line_input ">

                </li>

            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>加油卡ID</th>
                        <th>面额</th>
                        <th>持有人</th>
                        <th>持有人电话</th>
                        <th>购买时间</th>
                        <th>使用时间</th>
                        <th>使用油站</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="list in listsTable">
                        <td> {{list.id}} </td>
                        <td> ￥ {{list.gas_money}} </td>
                        <td> {{list.userName}} </td>
                        <td> {{list.phone}} </td>
                        <td> {{list.create_time}} </td>
                        <td> {{list.use_time}} </td>
                        <td> {{list.company_name}} </td>
                        <td>
                            <span v-if="list.gas_state == 1"> 待使用 </span>
                            <span v-else-if="list.gas_state == 2"> 已使用 </span>
                            <span v-else-if="list.gas_state == 3"> 已过期 </span>
                        </td>
                        <td class="chakan" @click="see_it(list.id)">查看</td>
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
                        <h3>持有人信息</h3>

                        <table class="table table-bordered">

                            <tbody>
                                <tr>
                                    <td style="width:20%">姓名</td>
                                    <td style="width:80%"> {{userDetail.userName}} </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">电话</td>
                                    <td style="width:80%"> {{userDetail.phone}} </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>加油券信息</h3>

                        <table class="table table-bordered">

                            <tbody>
                                <tr>
                                    <td style="width:20%">ID</td>
                                    <td style="width:80%"> {{userDetail.gas_coupon_code}} </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">状态</td>
                                    <td style="width:80%" v-if="userDetail.gas_state == 1"> 待使用 </td>
                                    <td style="width:80%" v-else-if="userDetail.gas_state == 2"> 已使用 </td>
                                    <td style="width:80%" v-else-if="userDetail.gas_state == 3"> 已过期 </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">面额 </td>
                                    <td style="width:80%"> {{userDetail.gas_money}} </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">支付方式</td>
                                    <td style="width:80%" v-if="userDetail.pay_way == 1"> 微信 </td>
                                    <td style="width:80%" v-else-if="userDetail.pay_way == 2"> 支付宝 </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">支付金额</td>
                                    <td style="width:80%"> {{userDetail.gas_money_only_actually}} </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">有效期</td>
                                    <td style="width:80%" v-if="userDetail.time_type == 1"> 永久 </td>
                                    <td style="width:80%" v-else-if="userDetail.time_type == 2"> {{userDetail.first_time}} —— {{userDetail.end_time}} </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">购买日期</td>
                                    <td style="width:80%"> {{userDetail.create_time}} </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">使用日期</td>
                                    <td style="width:80%"> {{userDetail.use_time}} </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>服务商信息</h3>

                        <table class="table table-bordered">

                            <tbody>
                                <tr>
                                    <td style="width:20%">加油站名称</td>
                                    <td style="width:80%"> {{userDetail.company_name}} </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">加油站地址</td>
                                    <td style="width:80%"> {{userDetail.province_name}}{{userDetail.city_name}}{{userDetail.area_name}} </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">联系人</td>
                                    <td style="width:80%"> {{userDetail.linker_man}} </td>
                                </tr>
                                <tr>
                                    <td style="width:20%">联系电话</td>
                                    <td style="width:80%"> {{userDetail.linker_phone}} </td>
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
    name: 'JiaYouQuanHeXiao',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            userId: '',
            listsTable: [],
            userDetail: '', // 核销人详细信息
            // 搜索字段
            use_tep: '',
            order_id: '',
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
            if (this_1.order_id) aaa.gas_coupon_code = this_1.order_id
            if (this_1.use_tep) aaa.phone = this_1.use_tep
            // ajax-post
            var url = '/backStage/gasCouponUserGet/select'
            post_ajax(url, aaa, function (json) {
                // console.log('请求的页面的初始数据')
                // console.log(json)
                this_1.listsTable = json.data.list
                !this_1.listsTable.length && (this_1.listsTable = [{}])
                for (var i in this_1.listsTable) {
                    if (this_1.listsTable[i].create_time) this_1.listsTable[i].create_time = get_str_time(this_1.listsTable[i].create_time)
                    if (this_1.listsTable[i].use_time) this_1.listsTable[i].use_time = get_str_time(this_1.listsTable[i].use_time)
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
            var aaa = { id }
            // ajax-post
            var url = '/backStage/gasCouponUserGet/selectDetail'
            post_ajax(url, aaa, function (json) {
                // console.log('请求的页面的初始数据')
                // console.log(json)
                this_1.userDetail = json.data
                if (this_1.userDetail.first_time) this_1.userDetail.first_time = get_str_time(this_1.userDetail.first_time)
                if (this_1.userDetail.end_time) this_1.userDetail.end_time = get_str_time(this_1.userDetail.end_time)
                if (this_1.userDetail.create_time) this_1.userDetail.create_time = get_str_time(this_1.userDetail.create_time)
                if (this_1.userDetail.use_time) this_1.userDetail.use_time = get_str_time(this_1.userDetail.use_time)
            })
            $("#myModal_1").modal('show')
        },
        // 关闭按钮
        close () {
            this.userDetail = ''
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
