const express = require("express");
const router = express.Router();
//导入数据库 sqlFun('sql',[],res=>{})
const sqlFun = require("./mysql");

//安装并导入模块 JWT两个相关的包
const jwt = require("jsonwebtoken");
//定义密钥
const config = require("./secret");

//路由接口
/* 登录 */
router.post("/login", (req, res) => {
  let { user_name, user_password, user_identity } = req.body;
  let sql = `select * from user where user_name=? and user_password=? and user_identity=?`;
  let arr = [user_name, user_password, user_identity];
  sqlFun(sql, arr, (result) => {
    if (result.length > 0) {
      let token = jwt.sign(
        {
          user_name: result[0].user_name,
          user_id: result[0].user_id,
          user_identity: result[0].user_identity,
        },
        config.jwtSecert,
        { expiresIn: 20 * 1 }
      );
      res.send({
        status: 200,
        data: token,
      });
    } else {
      res.send({
        status: 404,
        msg: "信息错误",
      });
    }
  });
});
/* 注册 */
router.post("/signup", (req, res) => {
  let { user_name, user_password, user_identity } = req.body;
  let sql = `insert into user(user_name,user_password,user_identity) values(?,?,?)`;
  let arr = [user_name, user_password, user_identity];
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "注册成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "注册失败",
      });
    }
  });
});
/* 获取操作记录 */
router.get("/getRecords", (req, res) => {
  let role_id = req.query.role_id || " ";
  let role = req.query.role || " ";
  let sql;
  if (role === "admin") {
    sql = `select * from audit where admin_id = "${role_id}"`;
  } else if (role === "author") {
    sql = `select * from application where author_id = "${role_id}"`;
  }
  sqlFun(sql, null, (data) => {
    if (data.length > 0) {
      res.send({
        status: 200,
        msg: "有记录",
        data,
      });
    } else {
      res.send({
        status: 500,
        msg: "没有记录",
      });
    }
  });
});
/* 修改密码 */
router.get("/changePsw", (req, res) => {
  let user_id = req.query.user_id || "";
  let user_password = req.query.user_password || "";
  let sql = `UPDATE user SET user_password=? WHERE user_id=?`;
  let arr = [user_password, user_id];
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        result,
        status: 200,
        msg: "修改成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "修改失败",
      });
    }
  });
});
/* 用户列表 */
router.get("/user", (req, res) => {
  let page = req.query.page == undefined ? 0 : req.query.page;
  let startPage = page * 8;
  const sqlLen = "select * from user";
  sqlFun(sqlLen, null, (data) => {
    let len = data.length;
    const sql = `select * from user order by user_id limit ${startPage},8`;
    sqlFun(sql, null, (result) => {
      if (result.length > 0) {
        res.send({
          data: result,
          total: len,
          pageSize: 8,
        });
      } else {
        res.send({
          msg: "暂无数据",
        });
      }
    });
  });
});
/* 搜索用户 */
router.get("/search", (req, res) => {
  const search = req.query.search;
  const sql =
    `select * from user where concat(user_id,user_name) like '%` +
    search +
    `%'`;
  sqlFun(sql, null, (result) => {
    let len = result.length;
    if (result.length > 0) {
      res.send({
        result,
        total: len,
        pageSize: 8,
      });
    } else {
      res.send({
        msg: "暂无数据",
      });
    }
  });
});
/* 添加人员 */
router.get("/addUser", (req, res) => {
  let user_name = req.query.user_name || "";
  let user_password = req.query.user_password || "";
  let user_identity = req.query.user_identity || "";
  let sql = `insert into user(user_name,user_password,user_identity) values(?,?,?);`;
  let arr = [user_name, user_password, user_identity];
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});
/* 初始化密码 */
router.get("/initPsw", (req, res) => {
  let user_id = req.query.user_id;
  let sql = `update user set user_password='123' where user_id=?;`;
  sqlFun(sql, user_id, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "初始化密码成功！",
      });
    } else {
      res.send({
        status: 500,
        msg: "初始化失败！",
      });
    }
  });
});
/* 删除人员 */
router.get("/delUser", (req, res) => {
  let user_id = req.query.user_id;
  let sql = `delete from user where user_id=?;`;
  sqlFun(sql, user_id, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功！",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败！",
      });
    }
  });
});
/* 专题列表 */
router.get("/topic", (req, res) => {
  let page = req.query.page == undefined ? 0 : req.query.page;
  let startPage = page * 8;
  const sqlLen = "select * from topic";
  sqlFun(sqlLen, null, (data) => {
    let len = data.length;
    const sql = `select * from topic order by topic_id limit ${startPage},8`;
    sqlFun(sql, null, (result) => {
      if (result.length > 0) {
        res.send({
          data: result,
          total: len,
          pageSize: 8,
        });
      } else {
        res.send({
          msg: "暂无数据",
        });
      }
    });
  });
});
/* 搜索专题 */
router.get("/topicSearch", (req, res) => {
  const search = req.query.search;
  const sql =
    `select * from topic where concat(topic_id,topic_name) like '%` +
    search +
    `%'`;
  sqlFun(sql, null, (result) => {
    let len = result.length;
    if (result.length > 0) {
      res.send({
        result,
        total: len,
        pageSize: 8,
      });
    } else {
      res.send({
        msg: "暂无数据",
      });
    }
  });
});
/* 添加专题 */
router.get("/addTopic", (req, res) => {
  let topic_name = req.query.topic_name;
  let sql = `select * from topic where topic_name=?`;
  sqlFun(sql, topic_name, (result) => {
    if (result.length > 0) {
      res.send({
        status: 500,
        msg: "添加的专题名重复了！",
      });
    } else {
      let sql = `insert into topic(topic_name,topic_state) value(?,'正常');`;
      sqlFun(sql, topic_name, (result) => {
        if (result.affectedRows > 0) {
          res.send({
            status: 200,
            msg: "添加成功",
          });
        } else {
          res.send({
            status: 500,
            msg: "添加失败",
          });
        }
      });
    }
  });
});
/* 删除专题 */
router.get("/delTopic", (req, res) => {
  let topic_id = req.query.topic_id;
  let sql = `delete from topic where topic_id=?;`;
  sqlFun(sql, topic_id, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功！",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败！",
      });
    }
  });
});
/* 获取用户编号 */
router.get("/getId", (req, res) => {
  const user_name = req.query.user_name || "";
  const user_identity = req.query.user_identity || "";
  let arr = [user_name, user_identity];
  const sql = `select * from user where user_name=? and user_identity=?;`;
  sqlFun(sql, arr, (result) => {
    if (result.length > 0) {
      res.send({
        result,
        status: 200,
      });
    } else {
      res.send({
        msg: "暂无数据",
      });
    }
  });
});
/* 获取专题 */
router.get("/getTopics", (req, res) => {
  let id = req.query.id || "";
  const sql = `select * from topic where topic_id like "${id}";`;
  sqlFun(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        result,
        status: 200,
      });
    } else {
      res.send({
        msg: "暂无数据",
      });
    }
  });
});
/* 获取已审核表 */
router.get("/getAudit", (req, res) => {
  let topic_id = req.query.command;
  let role_id = req.query.role_id || " ";
  if (topic_id === "a") {
    topic_id = "%";
  }
  const sql = `SELECT *, a.user_name as author_name,b.user_name as admin_name 
                FROM user a,user b, application,audit 
               WHERE application.application_id=audit.application_id 
               AND application.topic_id LIKE "${topic_id}" 
               AND audit.admin_id like "${role_id}"
               AND a.user_id=application.author_id AND b.user_id=audit.admin_id;`;
  sqlFun(sql, null, (result) => {
    if (result.length >= 0) {
      res.send({
        result,
        status: 200,
      });
    } else {
      res.send({
        msg: "暂无数据",
      });
    }
  });
});
/* 获取作者姓名 */
router.get("/getAuthorName", (req, res) => {
  let name = req.query.name || "";
  // let topic_id = req.query.command;
  let id = req.query.id;
  const sql = `SELECT user_name ${name}
               FROM user
               WHERE user_id = ${id};`;
  sqlFun(sql, null, (result) => {
    if (result.length >= 0) {
      res.send({
        result,
        status: 200,
      });
    } else {
      res.send({
        msg: "暂无数据",
      });
    }
  });
});
/* 获取未审核表 */
router.get("/getUnAudit", (req, res) => {
  let topic_id = req.query.command;
  if (topic_id === "a") {
    topic_id = "%";
  }
  const sql = `SELECT *,user_name as author_name,topic_name
               FROM application,user,topic
               WHERE application.topic_id LIKE "${topic_id}"
                AND user.user_id=application.author_id
                AND application.topic_id=topic.topic_id
                AND application.application_id NOT IN(
                    SELECT audit.application_id FROM audit)`;
  sqlFun(sql, null, (result) => {
    if (result.length >= 0) {
      res.send({
        result,
        status: 200,
      });
    } else {
      res.send({
        msg: "暂无数据",
      });
    }
  });
});
/* 添加审核表记录 */
router.get("/addAudit", (req, res) => {
  let application_id = req.query.application_id || "";
  let admin_id = req.query.admin_id || "";
  let audit_result = req.query.audit_result || "";
  let audit_time = req.query.audit_time || "";
  let audit_info = req.query.audit_info || "";
  let sql = `insert into audit(application_id,admin_id,audit_result,audit_time,audit_info) values(?,?,?,?,?);`;
  let arr = [application_id, admin_id, audit_result, audit_time, audit_info];
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});
/* 添加申请表记录 */
router.get("/addApply", (req, res) => {
  let application_title = req.query.application_title || "";
  let author_id = req.query.author_id || "";
  let topic_id = req.query.topic_id || "";
  let application_time = req.query.application_time || "";
  let application_content = req.query.application_content || "";
  let sql = `insert into application(application_title,author_id,topic_id,application_time,application_content) values(?,?,?,?,?);`;
  let arr = [
    application_title,
    author_id,
    topic_id,
    application_time,
    application_content,
  ];
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "提交成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "提交失败",
      });
    }
  });
});
/* 获取申请记录 */
router.get("/getApplyRecord", (req, res) => {
  let audit_result = req.query.audit_result || "";
  let author_id = req.query.author_id || "";
  let sql;
  if (audit_result === "通过" || audit_result === "驳回") {
    sql = `SELECT *,user.user_name as admin_name FROM application,audit,topic,user 
            WHERE application.application_id=audit.application_id 
            AND application.topic_id=topic.topic_id
            AND audit.admin_id=user.user_id
            AND audit.audit_result LIKE "${audit_result}"
            AND application.author_id LIKE "${author_id}"`;
  } else if (audit_result === "待处理") {
    sql = `SELECT * FROM application,topic WHERE author_id LIKE "${author_id}"
            AND application.topic_id=topic.topic_id
            AND application_id NOT IN(SELECT application_id FROM audit);`;
  }
  sqlFun(sql, null, (result) => {
    if (result.length >= 0) {
      res.send({
        result,
        status: 200,
      });
    } else {
      res.send({
        msg: "暂无数据",
      });
    }
  });
});
/* 添加草稿 */
router.get("/addDraft", (req, res) => {
  let draft_title = req.query.draft_title || "";
  let topic_id = req.query.topic_id || "";
  let author_id = req.query.author_id || "";
  let draft_content = req.query.draft_content || "";
  let sql = `insert into draftbox(draft_title,topic_id,author_id,draft_content) values(?,?,?,?);`;
  let arr = [draft_title, topic_id, author_id, draft_content];
  sqlFun(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "添加成功",
      });
    } else {
      res.send({
        status: 500,
        msg: "添加失败",
      });
    }
  });
});
/* 删除申请表 */
router.get("/delApply", (req, res) => {
  let id = req.query.application_id || "";
  const sql = `DELETE FROM application WHERE application_id = ${id}`;
  sqlFun(sql, null, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功！",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败！",
      });
    }
  });
});
/* 展示草稿 */
router.get("/showDraft", (req, res) => {
  let id = req.query.author_id || " ";
  let sql = `select * from draftbox,topic
             where topic.topic_id=draftbox.topic_id and draftbox.author_id=?;`;
  sqlFun(sql, id, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        msg: "获取成功",
        data: result,
      });
    } else {
      res.send({
        status: 500,
        msg: "获取失败",
      });
    }
  });
});
/* 删除草稿 */
router.get("/delDraft", (req, res) => {
  let id = req.query.draft_id || "";
  const sql = `DELETE FROM draftbox WHERE draft_id = ${id}`;
  sqlFun(sql, null, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: "删除成功！",
      });
    } else {
      res.send({
        status: 500,
        msg: "删除失败！",
      });
    }
  });
});

module.exports = router;
