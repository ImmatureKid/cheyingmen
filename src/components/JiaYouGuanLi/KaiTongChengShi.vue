<template>
    <div class="KaiTongChengShi">
        <header class="content_title">
            <ul class="title_box">
                <li class="title_box_left">
                    <span class="line_title"></span>
                    <span class="name_title"> &nbsp;加油卡开通城市</span>
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
                    负责人：
                    <input v-model="order_id" class="form-control line_input ">

                </li>
                <li>
                    开通时间：
                    <input id="first_time" class="form-control line_input " placeholder="开始日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;&nbsp; - &nbsp;&nbsp;
                    <input id="end_time" class="form-control line_input " placeholder="结束日期" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})">
                </li>
                <li>
                    开通城市：
                    <div class="bs-chinese-region bs-chinese-region1 flat dropdown" data-submit-type="id" data-min-level="1" data-max-level="2">
                        <input type="text" class="form-control" name="address" id="address" placeholder="选择你的地区" data-toggle="dropdown" readonly="" value="440103">
                        <div class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                            <div>
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#province" data-next="city" role="tab" data-toggle="tab">省份</a></li>
                                    <li role="presentation"><a href="#city" data-next="district" role="tab" data-toggle="tab">城市</a></li>
                                    <!--<li role="presentation"><a href="#district" data-next="street" role="tab" data-toggle="tab">县区</a></li>-->
                                </ul>
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="province">--</div>
                                    <div role="tabpanel" class="tab-pane" id="city">--</div>
                                    <!--<div role="tabpanel" class="tab-pane" id="district">--</div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    启动状态：
                    <select v-model="pay_line" class="form-control  tem2 line_input">
                        <option value="">请选择</option>
                        <option value="1">待启用</option>
                        <option value="2">已启用</option>
                        <option value="2">关停</option>
                    </select>
                </li>
            </ul>
        </nav>

        <div class="content_body">
            <table class="table table-bordered">
                <caption class="table_title">数据列表</caption>
                <thead>
                    <tr>
                        <th>城市编号</th>
                        <th>省份</th>
                        <th>城市</th>
                        <th>负责人</th>
                        <th>负责人电话</th>
                        <th>开通时间</th>
                        <th>激活数量</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list, index) in listsTable" :key="index">
                        <td> {{list.city_id}} </td>
                        <td> {{list.province_name}} </td>
                        <td> {{list.city_name}} </td>
                        <td> {{list.duty_man}} </td>
                        <td> {{list.duty_phone}} </td>
                        <td> {{list.create_time}} </td>
                        <td> {{list.active_number}} </td>
                        <td>
                            <span v-if="list.state == 1"> 待启用 </span>
                            <span v-else-if="list.state == 2"> 启用 </span>
                        </td>
                        <td>
                            <span class="chakan" @click="qiyong(list.id,list.state)">{{list.state == 1 ? '启用' : '停用'}}</span>
                            <span class="chakan" @click="xiugai(list)">编辑</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-xs-12 Top20">
                <div id="page" style="text-align: center;"></div>
            </div>
        </div>

        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal_2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel"> 修改开通城市 </h4>
                    </div>
                    <div class="modal-body">
                        <ul class="ul_guanbi">
                            <li class="one">
                                <span style="color:red;">*</span>
                                城市：
                            </li>
                            <li class="two">
                                <div class="bs-chinese-region bs-chinese-region2 flat dropdown" data-submit-type="id" data-min-level="1" data-max-level="2">
                                    <input type="text" class="form-control w_200" name="address2" id="address2" placeholder="选择你的地区" data-toggle="dropdown" readonly="" value="440103" v-model='use_city'>
                                    <div class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                        <div>
                                            <ul class="nav nav-tabs" role="tablist">
                                                <li role="presentation" class="active"><a href="#provinces" data-next="citys" role="tab" data-toggle="tab">省份</a></li>
                                                <li role="presentation"><a href="#citys" data-next="district" role="tab" data-toggle="tab">城市</a></li>
                                                <!--<li role="presentation"><a href="#district" data-next="street" role="tab" data-toggle="tab">县区</a></li>-->
                                            </ul>
                                            <div class="tab-content">
                                                <div role="tabpanel" class="tab-pane active" id="provinces">--</div>
                                                <div role="tabpanel" class="tab-pane" id="citys">--</div>
                                                <!--<div role="tabpanel" class="tab-pane" id="district">--</div>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                        <ul class="ul_guanbi">
                            <li class="one">
                                <span style="color:red;">*</span>
                                联系人：
                            </li>
                            <li class="two">
                                <div class="input-group w_200">
                                    <input type="text" class="form-control" v-model="use_name">
                                </div>
                            </li>
                        </ul>
                        <ul class="ul_guanbi">
                            <li class="one">
                                <span style="color:red;">*</span>
                                联系人电话：
                            </li>
                            <li class="two">
                                <div class="input-group w_200">
                                    <input type="text" class="form-control" v-model.lazy="use_tep">
                                </div>
                            </li>
                        </ul>
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
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal_1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel"> {{state == '2' ? '启用' : '停用'}}详情 </h4>
                    </div>
                    <div class="modal-body text-center">
                        是否{{state == '2' ? '启用' : '停用'}}此城市？

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button @click="guanbi_post()" type="button" class="btn btn-primary">{{state == '2' ? '启用' : '停用'}}</button>
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
    name: 'KaiTongChengShi',
    data () {
        return {
            shaixuan_show: true, // 控制筛选的打开和隐藏
            userId: '',
            listsTable: [],
            // 搜索字段
            first_time: '',
            end_time: '',
            order_id: '',
            is_close: '',
            pay_line: '',
            curr: '',
            // 开通城市ID
            state: '',
            id: '',
            use_tep: '',
            use_name: '',
            use_city: '',
            province_number: '',
            city_number: ''
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
            if (this_1.pay_line) aaa.state = this_1.pay_line
            if (this_1.order_id) aaa.duty_man = this_1.order_id
            this_1.province_number && (aaa.province_id = this_1.province_number)
            this_1.city_number && (aaa.city_id = this_1.city_number)
            // ajax-post
            var url = '/backStage/gasStation/select'
            // var url = '/supply/shop/location/findCities'
            // console.log(aaa)
            post_ajax(url, aaa, function (json) {
                // console.log('请求的页面的初始数据')
                // console.log(json)
                this_1.listsTable = json.data.list
                !this_1.listsTable.length && (this_1.listsTable = [{}])
                for (var i in this_1.listsTable) {
                    if (this_1.listsTable[i].create_time) this_1.listsTable[i].create_time = get_str_time(this_1.listsTable[i].create_time)
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
                this_1.curr = curr
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
        qiyong (id, state) {
            this.empty_data()
            var this_1 = this
            this_1.id = id
            this_1.type = '2'
            this_1.box = $("#myModal_1")
            state == '1' ? this_1.state = '2' : this_1.state = '1'
            $("#myModal_1").modal('show')
        },
        xiugai (list) {
            this.empty_data()
            var this_1 = this
            this_1.id = list.id
            this_1.use_name = list.duty_man
            this_1.use_tep = list.duty_phone
            this_1.use_city = list.province_name + ' ' + list.city_name
            this_1.type = '1'
            this_1.box = $("#myModal_2")
            $("#myModal_2").modal('show')
        },
        // 修改按钮
        guanbi_post () {
            var this_1 = this
            var lockMsg = true
            var aaa = {
                gas_station_id: this_1.id,
                type: this_1.type
            }
            if (this_1.type == '2') aaa.state = this_1.state
            if (this_1.type == '1') {
                if (this_1.use_name) aaa.duty_name = this_1.use_name
                if (this_1.city_number) aaa.city_id = this_1.city_number
                if (this_1.province_number) aaa.province_id = this_1.province_number
                if (this_1.use_tep) {
                    judge.isPhone(this_1.use_tep) ? aaa.duty_phone = this_1.use_tep : lockMsg && msgFn('手机号格式不对')
                }
                if (this_1.use_city) {
                    let ary = String(this_1.use_city).split(' ')
                    if (ary.length > 0) aaa.province_name = ary[0]
                    if (ary.length > 1) aaa.city_name = ary[1]
                }
                function msgFn (msg) {
                    layer.msg(msg)
                    lockMsg = !lockMsg
                }
            }
            // ajax-post
            var url = '/backStage/gasStation/update'
            post_ajax(url, aaa, function (json) {
                // console.log('请求的页面的初始数据')
                // console.log(json)
                lockMsg && layer.msg(json.msg)
                if (json.code == 0 && lockMsg) {
                    this_1.box.modal('hide')
                    this_1.empty_data()
                    this_1.init(this_1.curr)
                }
            })
        },
        // 清空数据
        empty_data () {
            this.state = ''
            this.use_name = ''
            this.use_tep = ''
            this.use_city = ''
            this.city_number = ''
            this.use_city = ''
            this.province_number = ''
            $('input[name="address"]').val('')
        }
    },
    watch: {
        use_tep () {
            this.use_tep && !judge.isPhone(this.use_tep) && layer.msg('手机号格式不对')
        }
    },
    mounted () {
        var this_1 = this
        this_1.init()
        $.getJSON('../../../static/bootstrap-chinese-region-master/src/sql_areas.json', function (data) {

            /**重定义数据结构**/
            /**
             * id 键,name 名字,level 层级,parentId 父级
             */
            for (var i = 0; i < data.length; i++) {
                var area = { id: data[i].id, name: data[i].cname, level: data[i].level, parentId: data[i].upid };
                data[i] = area;
            }
            $('.bs-chinese-region1').chineseRegion('source', data).on('completed.bs.chinese-region', function (e, areas) {
                //areas是已选择的地区数据，按先选择的在最前的方式排序。
                areas.length > 0 && (this_1.province_number = areas[0].id) && (this_1.use_city = areas[0].name)
                areas.length > 1 && (this_1.city_number = areas[1].id) && (this_1.use_city += ' ' + areas[1].name)
            });//导入数据并实例化
            $('.bs-chinese-region2').chineseRegion('source', data).on('completed.bs.chinese-region', function (e, areas) {
                //areas是已选择的地区数据，按先选择的在最前的方式排序。
                areas.length > 0 && (this_1.province_number = areas[0].id) && (this_1.use_city = areas[0].name)
                areas.length > 1 && (this_1.city_number = areas[1].id) && (this_1.use_city += ' ' + areas[1].name)
            });//导入数据并实例化
        })
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
.dingdanliebiao_nav {
  display: flex;
  border: 0;
}

.dingdanliebiao_nav > li {
  margin: 5px 10px;
  padding: 5px 30px;
  border: 1px solid #e4e4e4;
}

.left {
  display: inline-block;
  float: left;
}

.right {
  display: inline-block;
  float: right;
  padding-right: 20px;
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
.line_h34 {
  line-height: 34px;
}
.color_169BD5 {
  color: #169bd5;
}
.ml-20 {
  margin-left: 20px;
}
.w_100 {
  width: 100px;
}
.w_200 {
  width: 200px;
}
</style>
