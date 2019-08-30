<template>
    <div class="JiaYouQuanHeXiao">
        <header class="content_title">
            <ul class="title_box">
                <li class="title_box_left">
                    <span class="line_title"></span>
                    <span class="name_title"> &nbsp;加油站管理</span>
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
                    加油站名称：
                    <input v-model="order_id" class="form-control line_input ">
                </li>
                <li>
                    联系人：
                    <input v-model="use_name" class="form-control line_input ">
                </li>
                <li>
                    联系电话：
                    <input v-model="use_tep" class="form-control line_input ">
                </li>
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title clearfix">
                    <span class="left">数据列表</span>
                    <span class="right">
                        <select class="form-control  tem2 line_input w_120" v-model="pageSize">
                            <option value="">显示条数</option>
                            <option value="5">5条数据</option>
                            <option value="10">10条数据</option>
                            <option value="15">15条数据</option>
                        </select>
                    </span>
                    <!-- <span class="right">
                        <button @click="tianjia()" type="button" class="btn btn-outline btn-default">
                            添加
                        </button>
                    </span> -->
                </caption>
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>加油站名称</th>
                        <th>地址</th>
                        <th>联系人</th>
                        <th>联系电话</th>
                        <th>装态</th>
                        <th>管理人</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.gas_code}} </td>
                        <td> {{list.company_name}} </td>
                        <td> {{list.province_name}}{{list.city_name}}{{list.area_name}} </td>
                        <td> {{list.linker_man}} </td>
                        <td> {{list.linker_phone}} </td>
                        <td>
                            <span v-if="list.is_use">启用</span>
                            <span v-else="list.is_use">停用</span>
                        </td>
                        <td> {{list.leading_official}} </td>
                        <td>
                            <span class="chakan" @click="chakan(0,list)" v-if="list.is_use"> 审核 </span>
                            <span class="chakan" @click="chakan(1,list)"> 查看 </span>
                        </td>
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
                        <h4 class="modal-title" id="myModalLabel"> 添加加油站 </h4>
                    </div>
                    <div class="modal-body modal_title">
                        <ul>
                            <h5>引进信息</h5>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    引进/负责人：
                                </span>
                                <input type="text" class="form-control w_200" placeholder="与供货商沟通职员">
                            </li>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    加油站编号：
                                </span>
                                <input type="text" class="form-control w_200">
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    供货系统初始密码：
                                </span>
                                000000
                            </li>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    加油站来源：
                                </span>
                                <input type="text" class="form-control w_200">
                            </li>
                        </ul>
                        <ul>
                            <h5>企业信息</h5>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    公司名称：
                                </span>
                                <input type="text" class="form-control w_200">
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    公司简称：
                                </span>
                                <input type="text" class="form-control w_200">
                            </li>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    所在省市：
                                </span>
                                <input type="text" class="form-control w_200">
                            </li>
                            <li>
                                <span class="sub">经营范围：</span>
                                <input type="text" class="form-control w_550">
                            </li>
                            <li>
                                <span class="sub">详细地址：</span>
                                <input type="text" class="form-control w_550">
                            </li>
                            <li>
                                <span class="sub">公司网址：</span>
                                <input type="text" class="form-control w_550">
                            </li>
                        </ul>
                        <ul>
                            <h5>联系信息</h5>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    联系人：
                                </span>
                                <input type="text" class="form-control w_200">
                                <span class="sub">身份证号：</span>
                                <input type="text" class="form-control w_200">
                            </li>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    手机号：
                                </span>
                                <input type="text" class="form-control w_200">
                                <span class="sub">联系电话：</span>
                                <input type="text" class="form-control w_200">
                            </li>
                            <li>
                                <span class="sub">公司邮箱：</span>
                                <input type="text" class="form-control w_200">
                                <span class="sub">微信：</span>
                                <input type="text" class="form-control w_200">
                            </li>
                        </ul>
                    </div>
                    <div class="table table-bordered modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button @click="guanbi_post(0)" type="button" class="btn btn-primary">确定</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal_2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel"> {{is_state ? '加油站信息查看' : '加油站信息审核'}} </h4>
                    </div>
                    <div class="modal-body modal_title">
                        <ul>
                            <h5>企业信息</h5>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    负责人：
                                </span>
                                <span v-if="is_state">{{listDetail.leading_official}}</span>
                                <input type="text" class="form-control w_200" v-model="principal" v-else>
                            </li>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    加油站编号：
                                </span>
                                <span class="w_200">{{listDetail.gas_code}}</span>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    初始密码：
                                </span>000000
                            </li>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    公司名称：
                                </span>
                                <span class="w_200">{{listDetail.company_name}}</span>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    所在省市：
                                </span>{{listDetail.province_name}}{{listDetail.city_name}}
                            </li>
                            <li>
                                <span class="sub">详细地址：</span>{{listDetail.detail_location}}
                            </li>
                        </ul>
                        <ul>
                            <h5>联系信息</h5>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    联系人：
                                </span>{{listDetail.linker_man}}
                                <span class="sub">身份证号：</span>{{listDetail.identity_card}}
                            </li>
                            <li>
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    手机号：
                                </span>{{listDetail.linker_phone}}
                            </li>
                        </ul>
                        <ul>
                            <h5>社会统一信用证</h5>
                            <li>
                                <span class="sub">编号:</span>{{listDetail.license_code}}
                                <span class="sub">法人:</span>{{listDetail.company_legal_person}}
                            </li>
                            <li style="padding-left:120px">
                                <img :src="listDetail.license_image" alt="" style="max-width:300px">
                            </li>
                        </ul>
                        <ul>
                            <h5>结算收款账号</h5>
                            <li v-if="!is_state">
                                <span class="sub">
                                    <span style="color:red;">*</span>
                                    结算比例:
                                </span>
                                <div class="input-group w_200">
                                    <input type="text" class="form-control" v-model="gas_sale_jiesuan">
                                    <span class="input-group-addon btn_gray">%</span>
                                </div>
                            </li>
                            <li>
                                <span class="sub">开户名称:</span>{{listDetail.card_name}}
                                <span class="sub">开户行:</span>{{listDetail.bankName}}
                            </li>
                            <li>
                                <span class="sub">银行账号:</span>{{listDetail.card_number}}
                            </li>
                        </ul>
                    </div>
                    <div class="table table-bordered modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-if="!is_state">返回</button>
                        <button @click="guanbi_post(1)" type="button" class="btn btn-primary" v-if="!is_state">审核</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-else>返回</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
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
            listDetail: '',
            is_state: '',
            curr: '',
            pages: '',
            // 搜索字段
            use_tep: '',
            order_id: '',
            use_name: '',
            pageSize: '',
            // 审核
            principal: '',
            list: '',
            gas_sale_jiesuan: ''
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
                pageSize: this_1.pageSize || "10"
            }
            // 搜索的 字段
            if (this_1.order_id) aaa.company_name = this_1.order_id
            if (this_1.use_tep) aaa.linker_phone = this_1.use_tep
            if (this_1.use_name) aaa.linker_man = this_1.use_name
            // ajax-post
            var url = '/backStage/gasAuditInfo/select'
            post_ajax(url, aaa, function (json) {
                // console.log('请求的页面的初始数据')
                // console.log(json)
                this_1.listsTable = json.data.list
                !this_1.listsTable.length && (this_1.listsTable = [{}])
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
                this_1.curr = curr
                this_1.pages = json.data.pages
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
        tianjia: function () {
            this.empty_data()
            $('#myModal_1').modal('show')
        },
        chakan: function (state, list) {
            this.empty_data()
            this.see_it(list.id)
            this.list = list
            this.is_state = state
            $('#myModal_2').modal('show')
        },
        guanbi_post (lock) {
            var lockMsg = true
            var this_1 = this
            var url = null
            var aaa = {}
            if (lock) {
                // 审核逻辑
                aaa.id = this_1.list.id
                aaa.gas_info_id = this_1.list.gas_info_id
                aaa.user_id = this_1.userId
                this_1.principal ? aaa.duty_man = this_1.principal : lockMsg && msgFn('负责人')
                this_1.gas_sale_jiesuan ? aaa.close_rate = this_1.gas_sale_jiesuan : lockMsg && msgFn('结算比例')
                aaa.audit_state = '2'
                url = '/backStage/gasAuditInfo/audit'
            } else {
                // 添加加油卡逻辑
            }
            function msgFn (msg) {
                layer.msg(msg + '不能为空')
                lockMsg = !lockMsg
            }
            // console.log(aaa)
            lockMsg && post_ajax(url, aaa, function (json) {
                console.log(json)
                layer.msg(json.msg)
                json.code == 0 && $('#myModal_2').modal('hide')
            })
        },
        see_it (id) {
            var this_1 = this
            var aaa = { id }
            var url = '/backStage/gasAuditInfo/auditSelect'
            post_ajax(url, aaa, function (json) {
                // console.log('请求的页面的初始数据')
                // console.log(json)
                this_1.listDetail = json.data
            })
        },
        empty_data () {
            this.listDetail = ''
            this.is_state = ''
            this.use_tep = ''
            this.order_id = ''
            this.use_name = ''
            this.pageSize = ''
            this.principal = ''
            this.curr = ''
            this.pages = ''
            this.list = ''
            this.gas_sale_jiesuan = ''
        }
    },
    watch: {
        pageSize () {
            this.init()
        },
        gas_sale_jiesuan () {
            this.gas_sale_jiesuan && !judge.isNum(this.gas_sale_jiesuan) && layer.msg('结算比例不能为非数字')
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
.ul_guanbi {
  display: flex;
}
.one {
  width: 30%;
  text-align: right;
}
.two {
  width: 60%;
}
.ml-20 {
  margin-left: 20px;
}
.right {
  display: inline-block;
  float: right;
  padding-right: 20px;
}
.left {
  display: inline-block;
  float: left;
}
.w_120 {
  width: 120px;
}
.w_200 {
  width: 200px;
}
.w_100 {
  width: 100px;
}
.w_550 {
  width: 550px;
}
.modal_title {
  width: 100%;
  padding: 0;
}
.modal_title h5 {
  padding: 15px 0;
  font-weight: 500;
  padding-left: 30px;
  background-color: #f3f3f3;
}
.modal_title li {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.sub {
  width: 130px;
  text-align: right;
  margin: 0 5px 0 15px;
}
.btn_gray {
  background-color: #d7d7d7;
}
@media (min-width: 768px) {
  .modal-dialog {
    width: 725px;
    margin: 30px auto;
  }
}
</style>
