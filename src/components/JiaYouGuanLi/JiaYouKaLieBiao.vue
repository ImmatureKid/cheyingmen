


<template>
  <div class="JiaYouKaLieBiao">
    <header class="content_title">
      <ul class="title_box">
        <li class="title_box_left">
          <span class="line_title"></span>
          <span class="name_title"> &nbsp;加油卡列表</span>
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
            <th>加油卡名称</th>
            <th>加油卡图片</th>
            <th>开通城市</th>
            <th>开卡费用</th>
            <th>首充金额</th>
            <th>首充优惠</th>
            <th>激活数量</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listsTable" :key="index">
            <td> {{list.card_name}} </td>
            <td> <img :src='list.card_image' class='card_image'></img> </td>
            <td> {{list.city_number}} </td>
            <td> ￥ {{list.first_money}} </td>
            <td> ￥ {{list.first_recharge_money}} </td>
            <td> ￥ {{list.first_recharge_sale}} </td>
            <td> {{list.active_number}} </td>
            <td>
              <span v-if="list.state == 1"> 待启用 </span>
              <span v-else-if="list.state == 2"> 启用 </span>
            </td>
            <td>
              <span class="chakan" @click="qiyong(list.id,list.state)">{{list.state == 1 ? '启用' : '停用'}}</span>
              <span class="chakan" @click="xiugai(list)">编辑</span>
              <span class="chakan" @click="guanli(list.id)"> 充值管理 </span>
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
            <button type="button" class="close closes" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 添加加油卡 </h4>
          </div>
          <div class="modal-body">
            <ul class="ul_guanbi">
              <li class="one">
                加油卡名称：
              </li>
              <li class="two">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="card_name">
                </div>
              </li>

            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                加油卡图片：
              </li>
              <li class="two">
                <div @click="img_addBtn()">
                  <img style="max-width:300px;max-height:170px;" v-if="card_image" :src='card_image'>
                  <span class="jiahao" v-else>+</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                适用省市：
              </li>
              <li class="two">
                <div class="bs-chinese-region bs-chinese-region1 flat dropdown" data-submit-type="id" data-min-level="1" data-max-level="2">
                  <input type="text" class="form-control w_200" name="address" id="address" placeholder="选择你的地区" data-toggle="dropdown" readonly="" value="440103" v-model='use_city'>
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
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                开卡费用：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="first_money">
                  <span class="input-group-addon">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                是否可充值：
              </li>
              <li class="two">
                <label>
                  <input type="radio" name="optionsRadios1" id="optionsRadios1" value="1" style="margin-top:3px" v-model="is_child"> <span>是</span>
                </label>
                &nbsp;&nbsp;
                <label>
                  <input type="radio" name="optionsRadios1" id="optionsRadios2" value="0" style="margin-top:10px" v-model="is_child">否
                </label>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                首充金额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="first_recharge_money">
                  <span class="input-group-addon">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                首充优惠：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="first_recharge_sale">
                  <span class="input-group-addon">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                结算比例：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_sale_jiesuan">
                  <span class="input-group-addon btn_gray">%</span>
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
                使用须知：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <textarea class="form-control" v-model="user_remark">
			           </textarea>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default closes" data-dismiss="modal">取消</button>
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
            <button type="button" class="close closes" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 修改加油卡 </h4>
          </div>
          <div class="modal-body">
            <ul class="ul_guanbi">
              <li class="one">
                加油卡名称：
              </li>
              <li class="two">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="card_name">
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                加油卡图片：
              </li>
              <li class="two">
                <div @click="img_addBtn()">
                  <img style="max-width:300px;max-height:170px;" v-if="card_image" :src="card_image">
                  <span class="jiahao" v-else>+</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                适用省市：
              </li>
              <li class="two">
                <div class="bs-chinese-region bs-chinese-region2 flat dropdown" data-submit-type="id" data-min-level="1" data-max-level="2">
                  <input type="text" class="form-control w_200" name="address" id="address" placeholder="选择你的地区" data-toggle="dropdown" readonly="" value="440103" v-model='use_city'>
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
                开卡费用：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="first_money">
                  <span class="input-group-addon">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                是否可充值：
              </li>
              <li class="two">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" value="1" checked style="margin-top:3px" v-model="is_child"> <span>是</span>
                </label>
                &nbsp;&nbsp;
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" value="0" style="margin-top:10px" v-model="is_child">否
                </label>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                首充金额：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="first_recharge_money">
                  <span class="input-group-addon">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                首充优惠：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="first_recharge_sale">
                  <span class="input-group-addon">元</span>
                </div>
              </li>
            </ul>
            <ul class="ul_guanbi">
              <li class="one">
                <span style="color:red;">*</span>
                结算比例：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <input type="text" class="form-control" v-model="gas_sale_jiesuan">
                  <span class="input-group-addon btn_gray">%</span>
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
                使用须知：
              </li>
              <li class="two">
                <div class="input-group w_200">
                  <textarea class="form-control" v-model="user_remark">
			           </textarea>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default closes" data-dismiss="modal">取消</button>
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
            <button type="button" class="close closes" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel"> 加油卡{{state == 2 ? '启用' : '停用'}} </h4>
          </div>
          <div class="modal-body text-center">
            是否{{state == 2 ? '启用' : '停用'}}此加油卡？

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
  name: 'JiaYouKaLieBiao',
  data () {
    return {
      shaixuan_show: true, // 控制筛选的打开和隐藏
      userId: '',
      listsTable: [],
      curr: "",
      total: '',
      pageSize: 10,
      // 加油卡参数
      state: '',
      type: '',
      box: '',
      id: '',
      // 添加加油卡
      province_number: '',
      city_number: '',
      card_name: '',
      card_image: '',
      use_city: '',
      first_money: '',
      first_recharge_money: '',
      first_recharge_sale: '',
      user_remark: '',
      is_child: '1',
      gas_sale: '',
      gas_sale_jiesuan: ''
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

      var url = '/backStage/gasCardInfo/select'
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
    // 上传图片
    img_addBtn: function () {
      var this_1 = this
      baiduupload({}, function (url) {
        // console.log(url)
        this_1.card_image = url
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
      this.card_name = list.card_name
      this.card_image = list.card_image
      this.first_money = list.first_money
      this.first_recharge_money = list.first_recharge_money
      this.first_recharge_sale = list.first_recharge_sale
      this.user_remark = list.user_remark
      this.is_child = list.is_child
      this.use_city = list.city_number
      this.type = '1'
      this.box = $("#myModal_2")
      $("#myModal_2").modal('show')
    },
    qiyong: function (id, state) {
      this.empty_data()
      this.id = id
      this.type = '2'
      this.box = $("#myModal_3")
      state == 1 ? this.state = 2 : this.state = 1
      $("#myModal_3").modal('show')
    },
    guanli: function (id) {
      this.id = id
      this.$router.push({
        name: "ChongZhiGuanLi",
        params: { id }
      })
    },
    // 添加加油卡
    // 修改加油卡
    guanbi_post (num) {
      var this_1 = this
      var aaa = {}
      var url = null
      var lockMsg = true
      if (num) {
        aaa.gas_card_id = this_1.id
        aaa.type = this_1.type
        if (this_1.type == '1') {
          this_1.arguments(aaa)
          aaa.first_money && !judge.isNum(aaa.first_money) && lockMsg && msgFn('开卡费用', 1)
          aaa.charge_rate && !judge.isNum(aaa.charge_rate) && lockMsg && msgFn('商家分润比率', 1)
          aaa.close_rate && !judge.isNum(aaa.close_rate) && lockMsg && msgFn('结算比例', 1)
          aaa.first_recharge_money && !judge.isNum(aaa.first_recharge_money) && lockMsg && msgFn('首充金额', 1)
          aaa.first_recharge_sale && !judge.isNum(aaa.first_recharge_sale) && lockMsg && msgFn('首充优惠', 1)
        }
        if (this_1.type == '2') aaa.state = this_1.state
        url = '/backStage/gasCardInfo/update'
      } else {
        this_1.arguments(aaa)
        !aaa.card_name && lockMsg && msgFn('加油卡名称')
        !aaa.card_image && lockMsg && msgFn('加油卡图片')
        // !aaa.province_name && lockMsg && msgFn('省名称')
        // !aaa.province_id && lockMsg && msgFn('省ID')
        // !aaa.city_name && lockMsg && msgFn('城市名称')
        // !aaa.city_id && lockMsg && msgFn('市ID')
        !aaa.first_money && lockMsg && msgFn('开卡费用')
        !aaa.charge_rate && lockMsg && msgFn('商家分润比率')
        !aaa.close_rate && lockMsg && msgFn('结算比例')
        !aaa.is_child && lockMsg && msgFn('是否可充值')
        !aaa.first_recharge_money && lockMsg && msgFn('首充金额')
        !aaa.first_recharge_sale && lockMsg && msgFn('首充优惠')
        !aaa.user_remark && lockMsg && msgFn('使用须知')
        !judge.isNum(aaa.first_money) && lockMsg && msgFn('开卡费用', 1)
        !judge.isNum(aaa.charge_rate) && lockMsg && msgFn('商家分润比率', 1)
        !judge.isNum(aaa.close_rate) && lockMsg && msgFn('结算比例', 1)
        !judge.isNum(aaa.first_recharge_money) && lockMsg && msgFn('首充金额', 1)
        !judge.isNum(aaa.first_recharge_sale) && lockMsg && msgFn('首充优惠', 1)
        this_1.curr = Math.ceil((this_1.total + 1) / this_1.pageSize)
        url = '/backStage/gasCardInfo/insert'
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
    // 参数
    arguments (aaa) {
      var this_1 = this
      if (this_1.city_number) aaa.city_id = this_1.city_number
      if (this_1.province_number) aaa.province_id = this_1.province_number
      if (this_1.card_name) aaa.card_name = this_1.card_name
      if (this_1.card_image) aaa.card_image = this_1.card_image
      if (this_1.first_money) aaa.first_money = this_1.first_money
      if (this_1.first_recharge_money) aaa.first_recharge_money = this_1.first_recharge_money
      if (this_1.first_recharge_sale) aaa.first_recharge_sale = this_1.first_recharge_sale
      if (this_1.user_remark) aaa.user_remark = this_1.user_remark
      if (this_1.is_child) aaa.is_child = this_1.is_child
      if (this_1.gas_sale) aaa.charge_rate = this_1.gas_sale
      if (this_1.gas_sale_jiesuan) aaa.close_rate = this_1.gas_sale_jiesuan
      if (this_1.use_city) {
        let ary = String(this_1.use_city).split(' ')
        if (ary.length > 0) aaa.province_name = ary[0]
        if (ary.length > 1) aaa.city_name = ary[1]
      }
    },
    empty_data () {
      this.state = ''
      this.type = ''
      this.box = ''
      this.id = ''
      this.use_city = ''
      this.province_number = ''
      this.city_number = ''
      this.card_name = ''
      this.card_image = ''
      this.first_money = ''
      this.first_recharge_money = ''
      this.first_recharge_sale = ''
      this.user_remark = ''
      this.is_child = '1'
      $('input[name="address"]').val('')
    }




  },
  watch: {
    first_money () {
      this.first_money && !judge.isNum(this.first_money) && layer.msg('开卡费用不能为非数字')
    },
    charge_rate () {
      this.charge_rate && !judge.isNum(this.charge_rate) && layer.msg('商家分润比率不能为非数字')
    },
    close_rate () {
      this.close_rate && !judge.isNum(this.close_rate) && layer.msg('结算比例不能为非数字')
    },
    first_recharge_money () {
      this.first_recharge_money && !judge.isNum(this.first_recharge_money) && layer.msg('首充金额不能为非数字')
    },
    first_recharge_sale () {
      this.first_recharge_sale && !judge.isNum(this.first_recharge_sale) && layer.msg('首充优惠不能为非数字')
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
    $('.closes').click(() => {
      this_1.empty_data()
    })
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
.card_image {
  width: 150px;
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
.jiahao {
  display: block;
  font-size: 50px;
  line-height: 170px;
  text-align: center;
  border: 1px solid black;
  width: 300px;
  height: 170px;
  cursor: pointer;
}
.btn_gray {
  background-color: #d7d7d7;
}
</style>
