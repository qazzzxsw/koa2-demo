<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>欢迎:{{name}}!你的待办事项是：</span>
      <!-- 用第三方组件或者UI框架会自带自身封装的事件，如keyup等，会覆盖原生的组件而无法起效果
      .native 修饰符就是用来注册元素的原生事件而不是组件自定义事件的-->
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done">
              <template v-for="(item,index) in list">
                <div class="todo-list" v-if="item.status == false" :key="item.status">
                  <span class="item">{{index + 1}}.{{item.content}}</span>
                  <span class="pull-right">
                    <el-button size="samll" type="primary" @click="finished(index)">完成</el-button>
                    <el-button size="samll" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template>
            </template>
            <div v-else-if="Done">暂无待办事项</div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <!-- template的作用是占位符，可帮助我们包裹元素，但在循环的过程当中，template不会被渲染到页面上
          用于v-for和v-if比较常用去掉多余的嵌套div-->
          <template v-if="count >0">
            <template v-for="(item,index) in list">
              <div class="todo-list" v-if="item.status == true" :key="index">
                <span class="item finished">{{index + 2}}.{{item.content}}</span>
                <span class="pull-right">
                  <el-button
                    size="samll"
                    class="restore-item"
                    type="primary"
                    @click="update(index)"
                  >还原</el-button>
                </span>
              </div>
            </template>
          </template>
          <div v-else>暂无完成事项</div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      name: 'MM',
      todos: '',
      activeName: 'first',
      list: [],
      count: 0
    }
  },
  computed: {
    //计算是否已经完成了所有任务
    Done () {
      let count = 0;
      let length = this.list.length;
      for (let i in this.list) {
        this.list[i].status === true ? count += 1 : '';
      }
      this.count = count;
      if (count === length || length === 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    addTodos () {
      if (this.todos === '') {
        return
      }
      let obj = {
        status: false,
        content: this.todos
      }
      this.list.push(obj);
      this.todos = '';
    },
    finished (index) {
      //通过set的方法让数组的变动能够让vue检测到
      this.$set(this.list[index], 'status', true);
      this.$message({
        type: 'success',
        message: '任务完成'
      })
    },
    remove (index) {
      this.list.splice(index, 1);
      this.$message({
        type: 'info',
        message: '任务删除'
      })
    },
    restore (index) {
      this.$set(this.list[index], 'status', false)
      this.$message({
        type: 'info',
        message: '任务还原'
      })
    }
  }
}

</script>
<style lang="stylus" scoped>
.el-input
  margin: 20px auto
.todo-list
  width: 100%
  margin-top: 8px
  padding-bottom: 8px
  border-bottom: 1px solid #eee
  overflow: hidden
  text-align: left
  .item
    font-size: 20px
    &.finished
      text-decoration: line-through
      color: #ddd
.pull-right
  float: right
</style>