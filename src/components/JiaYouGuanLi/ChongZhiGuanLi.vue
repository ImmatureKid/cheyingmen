


<template>
  <div class="ChongZhiGuanLi">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;充值管理</span>
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
            <th>充值金额</th>
            <th>折扣比例</th>
            <th>实付金额</th>
            <th>销售数量</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index">
            <td> ￥ {{list.gas_card_money}} </td>
            <td> {{list.gas_card_sales}}% </td>
            <td> ￥ {{list.gas_actually_money}} </td>
            <td> {{list.use_number}} </td>
            <td>
              <span v-if="list.state == 1"> 待启用 </span>
              <span v-else-if="list.state == 2"> 启用 </span>
            </td>
            <td>
              <span class="chakan" @click="qiyong(list.id,list.state)">{{list.state == '1' ? '启用' : '停用'}}</span>
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
    <div class="modal fade" id="myModal_1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 添加充值方案 </h4>
          </div>
          <div class="modal-body">
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                充值金额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_card_money">
                  <span class="input-group-addon">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                折扣比例：
              </li>
              <li class="two">
                <div class="input-group">
                  <input type="text" class="form-control w_200" v-model="gas_card_sales">
                </div>
              </li>

            </ul>

            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                实付金额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_actually_money">
                  <span class="input-group-addon">元</span>
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
            <h4 class="modal-title" id="myModalLabel"> 修改充值方案 </h4>
          </div>
          <div class="modal-body">
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                充值金额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_card_money">
                  <span class="input-group-addon">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                折扣比例：
              </li>
              <li class="two">
                <div class="input-group">
                  <input type="text" class="form-control w_200" v-model="gas_card_sales">
                </div>
              </li>

            </ul>

            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                实付金额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_actually_money">
                  <span class="input-group-addon">元</span>
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
            <h4 class="modal-title" id="myModalLabel"> 充值方案{{state == '1' ? '停用' : '启用'}} </h4>
          </div>
          <div class="modal-body text-center">
            是否{{state == '1' ? '停用' : '启用'}}此充值方案？

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
  name: 'ChongZhiGuanLi',
  data () {
    return {
      shaixuan_show: true, // 控制筛选的打开和隐藏
      userId: '',
      listsTable: [],
      total: '',
      pageSize: 10,
      curr: '',
      // 添加充值方案
      gas_card_money: '', // 充值金额
      gas_card_sales: '', // 折扣比例
      gas_actually_money: '', // 实付金额
      // 修改充值方案
      child_id: '',
      state: '',
      type: '',
      box: ''
    }
  },
  created () {
    var this_1 = this
    this_1.userId = sessionStorage.getItem('uid')
  },
  computed: {
    id () {
      return this.$route.params.id
    }
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
        gas_card_id: this_1.id,
        pageNum: curr || "1",
        pageSize: "10"
      }
      var url = '/backStage/gasCardChild/select'
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
        this_1.total = Number(json.data.total)
        this_1.pageSize = Number(json.data.pageSize)
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
      this.child_id = list.id
      this.gas_card_money = list.gas_card_money
      this.gas_card_sales = list.gas_card_sales
      this.gas_actually_money = list.gas_actually_money
      this.type = '1'
      this.box = $("#myModal_2")
      $("#myModal_2").modal('show')
    },
    qiyong: function (id, state) {
      this.empty_data()
      this.child_id = id
      this.type = '2'
      this.box = $("#myModal_3")
      $("#myModal_3").modal('show')
      state == '1' ? this.state = '2' : this.state = '1'
    },
    // 添加充值方案
    // 修改充值方案
    guanbi_post (num) {
      var this_1 = this
      var aaa = {}
      var url = null
      var lockMsg = true
      if (num) {
        // 修改充值方案
        aaa.type = this_1.type
        aaa.gas_card_child_id = this_1.child_id
        if (this.type == '1') {
          this_1.arguments(aaa)
          aaa.gas_card_money && !judge.isNum(aaa.gas_card_money) && lockMsg && msgFn('充值金额', 1)
          aaa.gas_card_sales && !judge.isNum(aaa.gas_card_sales) && lockMsg && msgFn('折扣比率', 1)
          aaa.gas_actually_money && !judge.isNum(aaa.gas_actually_money) && lockMsg && msgFn('实际付款金额', 1)
        }
        if (this.type == '2') aaa.state = this.state
        url = '/backStage/gasCardChild/update'
      } else {
        // 添加充值方案
        aaa.gas_card_id = this_1.id
        this_1.arguments(aaa)
        !aaa.gas_card_money && lockMsg && msgFn('充值金额')
        !aaa.gas_card_sales && lockMsg && msgFn('折扣比率')
        !aaa.gas_actually_money && lockMsg && msgFn('实际付款金额')
        !judge.isNum(aaa.gas_card_money) && lockMsg && msgFn('充值金额', 1)
        !judge.isNum(aaa.gas_card_sales) && lockMsg && msgFn('折扣比率', 1)
        !judge.isNum(aaa.gas_actually_money) && lockMsg && msgFn('实际付款金额', 1)
        this_1.curr = Math.ceil((this_1.total + 1) / this_1.pageSize)
        url = '/backStage/gasCardChild/insert'
      }
      function msgFn (msg, isTrue) {
        lockMsg = !lockMsg
        !isTrue ? layer.msg(msg + '不能为空') : layer.msg(msg + '不能为非数字')
      }
      lockMsg && post_ajax(url, aaa, function (json) {
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
    // 传参
    arguments (aaa) {
      var this_1 = this
      if (this_1.gas_card_money) aaa.gas_card_money = this_1.gas_card_money
      if (this_1.gas_card_sales) aaa.gas_card_sales = this_1.gas_card_sales
      if (this_1.gas_actually_money) aaa.gas_actually_money = this_1.gas_actually_money
    },
    empty_data () {
      this.gas_card_money = ''
      this.gas_card_sales = ''
      this.gas_actually_money = ''
      this.state = ''
    }


  },
  watch: {
    gas_card_money () {
      this.gas_card_money && !judge.isNum(this.gas_card_money) && layer.msg('充值金额不能为非数字')
    },
    gas_card_sales () {
      this.gas_card_sales && !judge.isNum(this.gas_card_sales) && layer.msg('折扣比率不能为非数字')
    },
    gas_actually_money () {
      this.gas_actually_money && !judge.isNum(this.gas_actually_money) && layer.msg('实际付款金额不能为非数字')
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
</style>
