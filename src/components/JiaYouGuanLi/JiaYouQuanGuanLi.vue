


<template>
  <div class="JiaYouQuanLieBiao">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;加油券管理</span>
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

    <div class="content_body">
      <table class="table table-bordered">
        <caption class="table_title clearfix">
          <span class="left">数据列表</span>
          <span class="right">
            <button @click="tianjia()" type="button" class="btn btn-outline btn-default">
              添加
            </button>
          </span>
        </caption>
        <thead>
          <tr>
            <th>加油券名称</th>
            <th>面额</th>
            <th>有效期</th>
            <th>销售数量</th>
            <th>使用数量</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index">
            <td> {{list.gas_coupon_name}} </td>
            <td> ￥ {{list.gas_coupon_money}} </td>
            <td>
              <span v-if="list.time_type == 1"> 永久 </span>
              <span v-else-if="list.time_type == 2"> {{list.first_time}} —— {{list.end_time}} </span>
            </td>
            <td> {{list.count_number}} </td>
            <td> {{list.user_number}} </td>
            <td>
              <span v-if="list.is_shelf"> 上架 </span>
              <span v-else> 下架 </span>
            </td>
            <td>
              <span class="chakan" @click="xiajia(list.id,list.is_shelf)">
                <span>{{!list.is_shelf ? '上架': '下架'}}</span>
              </span>
              <span class="chakan" @click="xiugai(list)">编辑</span>
              <span class="chakan" @click="shanchu(list.id)"> 删除 </span>
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
            <h4 class="modal-title" id="myModalLabel"> 添加加油券 </h4>
          </div>
          <div class="modal-body">
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                加油券名称：
              </li>
              <li class="two">
                <div class="input-group">
                  <input type="text" class="form-control w_200" v-model="gas_coupon_name">
                </div>
              </li>

            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                面额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_money">
                  <span class="input-group-addon btn_gray">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                销售金额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_sale_money">
                  <span class="input-group-addon btn_gray">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                有效期：
              </li>
              <li class="two">
                <div class="radio">
                  <label>
                    <input type="radio" name="optionsRadios0" id="optionsRadios1" value="1" checked style="margin-top:3px" v-model="time_type"> <span>永久有效</span>
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="optionsRadios0" id="optionsRadios2" value="2" style="margin-top:10px" v-model="time_type">日期范围
                    <input id="first_time" class="form-control line_input w_100" placeholder="开始日期" onclick="laydate({istime: true,min: laydate.now(), format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;- &nbsp;
                    <input id="end_time" class="form-control line_input w_100" placeholder="结束日期" onclick="laydate({istime: true,min: laydate.now(1), format: 'YYYY-MM-DD hh:mm:ss'})">
                  </label>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                商家分润比率：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_sale">
                  <span class="input-group-addon btn_gray">%</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                备注：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <textarea class="form-control" v-model="remark">
			           </textarea>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
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
            <h4 class="modal-title" id="myModalLabel"> 修改加油券 </h4>
          </div>
          <div class="modal-body">
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                加油券名称：
              </li>
              <li class="two">
                <div class="input-group">
                  <input type="text" class="form-control w_200" v-model="gas_coupon_name">
                </div>
              </li>

            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                面额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_money">
                  <span class="input-group-addon btn_gray">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                销售金额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_sale_money">
                  <span class="input-group-addon btn_gray">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                有效期：
              </li>
              <li class="two">
                <div class="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios1" value="1" checked style="margin-top:3px" v-model="time_type"> <span>永久有效</span>
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="2" style="margin-top:10px" v-model="time_type">日期范围
                    <input id="first_time_xiugai" class="form-control line_input w_100" placeholder="开始日期" onclick="laydate({istime: true, min: laydate.now(),format: 'YYYY-MM-DD hh:mm:ss'})">
                    &nbsp;- &nbsp;
                    <input id="end_time_xiugai" class="form-control line_input w_100" placeholder="结束日期" onclick="laydate({istime: true,min: laydate.now(1), format: 'YYYY-MM-DD hh:mm:ss'})">
                  </label>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                商家分润比率：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_sale">
                  <span class="input-group-addon btn_gray">%</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                备注：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <textarea class="form-control" v-model="remark">
			           </textarea>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button @click="guanbi_post(1)" type="button" class="btn btn-primary">确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>

    <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal_3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 加油券{{self ? '上架': '下架'}}</h4>
          </div>
          <div class="modal-body text-center">
            是否{{self ? '上架': '下架'}}此加油券？

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button @click="guanbi_post(1)" type="button" class="btn btn-primary">确定</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>

    <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal_4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 加油券删除 </h4>
          </div>
          <div class="modal-body text-center">
            是否删除此加油券？

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button @click="guanbi_post(1)" type="button" class="btn btn-primary">确定</button>
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
  name: 'JiaYouQuanLieBiao',
  data () {
    return {
      shaixuan_show: true, // 控制筛选的打开和隐藏
      userId: '',
      listsTable: [],
      curr: '',
      total: '',
      pageSize: 10,
      lock: true,
      // 添加参数
      gas_coupon_name: '',
      gas_money: '',
      gas_sale_money: '',
      time_type: '1',
      remark: '',
      gas_sale: '',
      // 加油券操作
      self: '',
      type: '',
      box: '',
      id: '',
    }
  },
  created () {
    var this_1 = this
    this_1.userId = sessionStorage.getItem('uid')
  },
  methods: {
    // 得到顶部的信息
    get_msg: function () {
      var this_1 = this
      var aaa = {
        userId: this_1.userId
      }
      var url = 'backStage/goodsOrderDetail/selectOrderStateCount'
      post_ajax(url, aaa, function (json) {
        // console.log('请求页面顶部的信息')
        // console.log(json)
        if (json.code == 0) {
          this_1.state_one = json.data.state_one
          this_1.state_two = json.data.state_two
          this_1.state_three = json.data.state_three
          this_1.state_four = json.data.state_four
          this_1.state_five = json.data.state_five
          this_1.state_six = json.data.state_six
        }
      })
    },
    init: function (curr) {
      var this_1 = this
      var aaa = {
        userId: this_1.userId,
        pageNum: curr || "1",
        pageSize: "10"
      }
      var url = '/backStage/gas/select'
      post_ajax(url, aaa, function (json) {
        // console.log('请求的页面的初始数据')
        // console.log(json)
        this_1.listsTable = json.list
        !this_1.listsTable.length && (this_1.listsTable = [{}])
        for (var i in this_1.listsTable) {
          if (this_1.listsTable[i].end_time) this_1.listsTable[i].end_time = get_str_time(this_1.listsTable[i].end_time)
          if (this_1.listsTable[i].first_time) this_1.listsTable[i].first_time = get_str_time(this_1.listsTable[i].first_time)
        }
        var pages = json.pages
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
        this_1.total = Number(json.total)
        this_1.pageSize = Number(json.pageSize)
      })
    },
    // 刷新按钮
    refresh_page: function () {
      location.reload()
    },
    tianjia: function () {
      this.empty_data()
      this.box = $("#myModal_1")
      $("#myModal_1").modal('show')
    },
    xiugai: function (list) {
      this.empty_data()
      this.id = list.id
      this.gas_coupon_name = list.gas_coupon_name
      this.gas_money = list.gas_coupon_money
      this.gas_sale_money = list.gas_coupon_sale_money
      this.time_type = list.time_type
      this.remark = list.remark
      if (list.time_type == '2') {
        $('#first_time_xiugai').val(list.first_time)
        $('#end_time_xiugai').val(list.end_time)
      }
      this.type = '1'
      this.box = $("#myModal_2")
      $("#myModal_2").modal('show')
    },
    xiajia: function (id, self) {
      this.empty_data()
      this.id = id
      this.type = '2'
      this.box = $("#myModal_3")
      self ? this.self = 0 : this.self = 1
      $("#myModal_3").modal('show')
    },
    shanchu: function (id) {
      this.empty_data()
      this.id = id
      this.type = '3'
      this.box = $("#myModal_4")
      $("#myModal_4").modal('show')
    },
    // 添加加油券
    // 修改加油券
    guanbi_post (num) {
      var this_1 = this
      var aaa = {}
      var url = null
      if (num) {
        // 修改加油券
        aaa.gas_id = this_1.id
        aaa.type = this_1.type
        if (this_1.type == '1') this_1.transimt_data(aaa, 1)
        if (this_1.type == '2') aaa.is_shelf = this_1.self
        url = '/backStage/gas/update'
      } else {
        // 添加加油券
        aaa.user_id = this_1.userId
        this_1.transimt_data(aaa, 0)
        this_1.curr = Math.ceil((this_1.total + 1) / this_1.pageSize)
        url = '/backStage/gas/insert'
      }
      this_1.lock && post_ajax(url, aaa, function (json) {
        // console.log('请求的页面的初始数据')
        // console.log(json)
        layer.msg(json.msg)
        if (json.code == 0) {
          this_1.box.modal('hide')
          this_1.empty_data()
          this_1.init(this_1.curr)
        }
      })
    },
    // 清空数据
    empty_data () {
      this.gas_coupon_name = ''
      this.gas_money = ''
      this.gas_sale_money = ''
      this.time_type = '1'
      this.remark = ''
      this.gas_sale = ''
      $('#end_time').val('')
      $('#first_time').val('')
      $('#end_time_xiugai').val('')
      $('#first_time_xiugai').val('')
    },
    // 传递参数
    transimt_data (aaa, lock) {
      var lockMsg = true
      if (this.gas_coupon_name) aaa.gas_coupon_name = this.gas_coupon_name
      if (this.gas_money) aaa.gas_money = this.gas_money
      if (this.gas_sale_money) aaa.gas_sale_money = this.gas_sale_money
      if (this.gas_sale) aaa.charge_rate = this.gas_sale
      if (this.remark) aaa.remark = this.remark
      aaa.time_type = this.time_type
      if (!lock) {
        !aaa.gas_coupon_name && lockMsg && msgFn('加油券名称')
        !aaa.gas_money && lockMsg && msgFn('面值')
        !aaa.gas_sale_money && lockMsg && msgFn('销售金额')
        !aaa.time_type && lockMsg && msgFn('有效期')
        !aaa.remark && lockMsg && msgFn('备注')
        !aaa.charge_rate && lockMsg && msgFn('商家分润比率')
      }
      aaa.gas_money && !judge.isNum(aaa.gas_money) && lockMsg && msgFn('面值', 1)
      aaa.gas_sale_money && !judge.isNum(aaa.gas_sale_money) && lockMsg && msgFn('销售金额', 1)
      aaa.charge_rate && !judge.isNum(aaa.charge_rate) && lockMsg && msgFn('商家分润比率', 1)
      if (this.time_type == '2') {
        if (lock) {
          if ($('#first_time_xiugai').val()) aaa.first_time = $('#first_time_xiugai').val()
          if ($('#end_time_xiugai').val()) aaa.end_time = $('#end_time_xiugai').val()
        } else {
          if ($('#first_time').val()) aaa.first_time = $('#first_time').val()
          if ($('#end_time').val()) aaa.end_time = $('#end_time').val()
        }
      }
      function msgFn (msg, isTrue) {
        lockMsg = !lockMsg
        !isTrue ? layer.msg(msg + '不能为空') : layer.msg(msg + '不能为非数字')
      }
      this.lock = lockMsg
    }
  },
  watch: {
    gas_money () {
      this.gas_money && !judge.isNum(this.gas_money) && layer.msg('面值不能为非数字')
    },
    gas_sale_money () {
      this.gas_sale_money && !judge.isNum(this.gas_sale_money) && layer.msg('销售金额不能为非数字')
    },
    charge_rate () {
      this.charge_rate && !judge.isNum(this.charge_rate) && layer.msg('商家分润比率不能为非数字')
    }
  },
  mounted () {
    var this_1 = this
    this_1.get_msg() // 请求头部信息
    this_1.init()
    // 鼠标悬浮到导航栏上让颜色河北边框变换
    $(".dingdanliebiao_nav").children('li').hover(function () {
      $(this).css({
        border: '1px solid #6dc0fe'
      })
    }, function () {
      $(this).css({
        border: '1px solid #e4e4e4'
      })
    })
    // 关闭模块数据清空
    $('button[data-dismiss="modal"]').click(() => this.empty_data())
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

th,
td {
  text-align: center;
  /** 设置水平方向居中 */
  vertical-align: middle;
  /** 设置垂直方向居中 */
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

.w_100 {
  width: 100px;
}
.w_200 {
  width: 200px;
}
.btn_gray {
  background-color: #d7d7d7;
}
</style>
