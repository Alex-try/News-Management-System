<template>
  <div class="writenews">
    <div class="writeinfo">
      <el-form :inline="true" :model="applicationForm">
        <el-form-item label="新闻标题">
          <el-input
            v-model="applicationForm.application_title"
            style="width: 600px"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属专题">
          <el-select v-model="applicationForm.topic_id">
            <el-option
              v-for="item in topics"
              :key="item.topic_id"
              :value="item.topic_id"
              :label="item.topic_name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="write-content">
      <div style="width: 750px">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 280px; overflow-y: hidden"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </div>
      <div style="margin-left: 30px">
        <textarea
          v-model="html"
          readonly
          style="width: 100%; height: 360px; outline: none; border: 0"
        ></textarea>
      </div>
    </div>
    <el-form class="operation">
      <el-form-item>
        <el-button type="primary" @click="submitForm()" class="btn"
          >提交申请</el-button
        >
        <el-button class="btn">存入草稿箱</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    let author_id = JSON.parse(window.localStorage.getItem("user")).user_id;
    return {
      editor: null,
      html: "<p>hello</p>",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      applicationForm: {
        application_title: "",
        topic_id: "",
        author_id: author_id,
        application_time: new Date(),
      },
      topics: [],
      msg: "",
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    onSubmit() {
      console.log("submit!");
    },
    http() {
      this.$api.getTopics({ id: "%" }).then((res) => {
        this.topics = res.data.result;
      });
    },
    submitForm() {
      let { application_title, author_id, topic_id, application_time } =
        this.applicationForm;
      this.$api
        .addApply({
          application_title,
          author_id,
          topic_id,
          application_time,
          application_content: this.html,
        })
        .then((res) => {
          console.log(res.data.msg);
          this.msg = res.data.msg;
        });
      alert(this.msg);
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = "<p>请输入内容</p>";
    }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  created() {
    this.http();
  },
});
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="less" scoped>
.writenews {
  padding: 20px 20px 0px 20px;
  .writeinfo {
    width: 100%;
    display: flex;
  }
  .write-content {
    width: 100%;
    display: flex;
  }
  .operation {
    display: flex;
    justify-content: center;
    margin: 9px;
    .btn:nth-child(1) {
      color: #4a653a;
      background: #f7ef6a;
      border-color: #d6ce45;
    }
    .btn:nth-child(2) {
      color: #4a653a;
      border-color: #d6ce45;
    }
  }
}
</style>
