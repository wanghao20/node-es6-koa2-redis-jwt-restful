/*
 Navicat Premium Data Transfer

 Source Server         : 腾讯云
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : 148.70.34.67:3307
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 09/09/2020 15:37:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for base_game
-- ----------------------------
DROP TABLE IF EXISTS `base_game`;
CREATE TABLE `base_game`  (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `appid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'appid',
  `gameId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'gameid',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '游戏图标',
  `gameName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '游戏名称',
  `doc` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述信息',
  `gamePath` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文件路径',
  `config` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '游戏配置',
  `version` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '版本号',
  `status` int(0) NULL DEFAULT NULL COMMENT '当前状态:0:立项,1:开发,2:测试,3:上线,4下线',
  `team` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '公司团队',
  `staffGear` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '人员安排',
  `isDelete` int(0) NULL DEFAULT 0,
  `createdBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `updatedTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `updatedBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `createdTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_game
-- ----------------------------
INSERT INTO `base_game` VALUES ('0850a4c2-5949-4723-86be-0b63dc4584f3', '', '1234', 'g6vplakz206.jpg', '菊花', '打发的掉分爱迪生发的安抚打算', 'test', '', '1.0', 0, 'test', '特提示', 0, 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', '', '', '2020-09-08 20:33:08');
INSERT INTO `base_game` VALUES ('7da375a8-5c4d-477d-becb-4cde63238172', '', '23414', 'vpl88dgigj.jpg', '微信小游戏', '测试写入,图标和配置没有上传', 'root/path', '', '0.01', 1, '测试团队', '负责人：王五；策划：卢凯；开发：史蒂夫；美术：姜山', 0, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '2020-09-09 10:36:49', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '2020-09-07 16:12:01');
INSERT INTO `base_game` VALUES ('ca7e5982-d153-46c5-8adb-bbf676237288', '', '', '4rcfbk55883.jpg', '测试', '', '', '', '', 3, '', '', 0, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '2020-09-08 20:30:52', 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', '2020-09-07 14:09:41');

-- ----------------------------
-- Table structure for base_mod
-- ----------------------------
DROP TABLE IF EXISTS `base_mod`;
CREATE TABLE `base_mod`  (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '父节点id',
  `pName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '父节点名称',
  `label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模块名称',
  `icon` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'icon',
  `modPath` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模块地址',
  `modtTitle` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模块标题',
  `component` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'vueComponent对应地址',
  `isDelete` int(0) NULL DEFAULT 0 COMMENT '是否删除,0:否1:是',
  `disabled` int(0) NULL DEFAULT 0 COMMENT '是否禁止操作,0否1:是',
  `createdTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '创建时间',
  `createdBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updatedBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updatedTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_mod
-- ----------------------------
INSERT INTO `base_mod` VALUES ('0', NULL, NULL, '根', NULL, NULL, NULL, NULL, 0, 1, '', NULL, NULL, NULL);
INSERT INTO `base_mod` VALUES ('08591bd4-f5c3-4084-ab1e-82cd4a622bba', 'fde7c1bc-7fb3-45d1-812c-430abb15c0c5', 'cdn应急刷新', 'cdn应急刷新', 'el-icon-refresh', 'cdn', 'cdn应急刷新', 'dashboard/index.vue', 0, 0, '1599530669917', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '', '');
INSERT INTO `base_mod` VALUES ('12a90106-8221-4731-9147-ab7d66a15f74', '0', '根', '主页', 'el-icon-house', '/dashboard', '主页', 'Layout', 0, 0, '1599136206538', NULL, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599616477501');
INSERT INTO `base_mod` VALUES ('19298dd9-0af2-4885-b33d-38926a3d1e9f', '982d83ec-9bb4-4b5e-86b9-27e0cfb4fcda', '配置', '分享信息配置', '', 'game2', '分享信息配置', 'dashboard/index.vue', 0, 0, '1599482911808', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599483224305');
INSERT INTO `base_mod` VALUES ('243c05d8-d9dd-43d4-9015-30964b828da5', '94190e42-d799-40b7-846d-05abe234bb5b', '系统管理', '用户管理', 'el-icon-user-solid', 'user', '用户管理', 'auth/users.vue', 0, 0, '', NULL, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599567957553');
INSERT INTO `base_mod` VALUES ('26032ec3-db76-4fa4-88ba-46e25f3d2ac6', '982d83ec-9bb4-4b5e-86b9-27e0cfb4fcda', '配置', '服务开关配置', '', 'game3', '服务开关配置', 'dashboard/index.vue', 0, 0, '1599482995550', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599483216738');
INSERT INTO `base_mod` VALUES ('3', '94190e42-d799-40b7-846d-05abe234bb5b', '系统管理', '模块管理', 'el-icon-menu', 'Mod', '模块管理', 'auth/modMgmt.vue', 0, 0, '', NULL, NULL, NULL);
INSERT INTO `base_mod` VALUES ('34234', '12a90106-8221-4731-9147-ab7d66a15f74', '主页', '主页', 'el-icon-house', 'dashboard', '主页', 'dashboard/index.vue', 0, 0, '1599136206538', NULL, NULL, NULL);
INSERT INTO `base_mod` VALUES ('52566270-28c0-47d6-8d38-2ef6d06da1aa', '94190e42-d799-40b7-846d-05abe234bb5b', '系统管理', '角色权限', 'el-icon-lock', 'role', '角色权限', 'auth/role.vue', 0, 0, '', NULL, NULL, NULL);
INSERT INTO `base_mod` VALUES ('852ac375-11b5-4624-8b38-6daaf7476477', '0', '根', 'app热更新管理', 'd', '/hotUpdate', 'app热更新管理', 'Layout', 0, 0, '1599531431607', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599531514459');
INSERT INTO `base_mod` VALUES ('8ec76308-c995-48fa-ba61-6d9adccbce3d', '982d83ec-9bb4-4b5e-86b9-27e0cfb4fcda', '配置', '导出配置', '', 'game4', '导出配置', 'dashboard/index.vue', 0, 0, '1599483012677', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599483207092');
INSERT INTO `base_mod` VALUES ('94190e42-d799-40b7-846d-05abe234bb5b', '0', '根', '系统管理', 'el-icon-s-tools', '/system', '系统管理', 'Layout', 0, 0, '1599136206539', NULL, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599567953661');
INSERT INTO `base_mod` VALUES ('982d83ec-9bb4-4b5e-86b9-27e0cfb4fcda', 'a06bce44-e4a4-43af-a082-0b12b6572401', '游戏管理', '游戏配置', 'el-icon-s-operation', '/config', '游戏配置', 'dashboard/index.vue', 0, 0, '1599482680394', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599531730753');
INSERT INTO `base_mod` VALUES ('a06bce44-e4a4-43af-a082-0b12b6572401', '0', '根', '游戏管理', 'el-icon-s-grid', '/game', '游戏管理', 'Layout', 0, 0, '1599205735666', '1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599482623607');
INSERT INTO `base_mod` VALUES ('af6be946-c0b5-4e95-8579-f40da1ca4466', '982d83ec-9bb4-4b5e-86b9-27e0cfb4fcda', '配置', '前端开关配置', '', 'game1', '前端开关配置', 'dashboard/index.vue', 0, 0, '1599482845605', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599483313408');
INSERT INTO `base_mod` VALUES ('b0158ff5-642d-4547-8a2d-d957ac029032', '0', '根', '系统操作记录', 'el-icon-s-order', '/systemLog', '系统操作记录', 'Layout', 0, 0, '1599483092760', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599530035341');
INSERT INTO `base_mod` VALUES ('b5b4d66a-c682-401f-82f3-131429588225', '0', '根', '预警设置', 'el-icon-warning', '/warn', '预警设置', 'Layout', 0, 0, '1599530767853', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599530783948');
INSERT INTO `base_mod` VALUES ('b9a7c2f4-3aec-4cf7-86cd-2e77ad2f8285', '852ac375-11b5-4624-8b38-6daaf7476477', 'app热更新管理', 'app热更新管理', 'el-icon-loading', 'hotUpdata', 'app热更新管理', 'dashboard/index.vue', 0, 0, '1599531498011', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '', '');
INSERT INTO `base_mod` VALUES ('bf2265b6-317f-4108-8d50-a8046b3718d0', 'b0158ff5-642d-4547-8a2d-d957ac029032', '系统操作记录', '后台操作记录', 'el-icon-s-order', 'syatemLog', '后台操作记录', 'log/systemLog.vue', 0, 0, '1599483151675', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599532398424');
INSERT INTO `base_mod` VALUES ('bfbc56ae-0b61-4194-b026-ef42c58678c9', 'a06bce44-e4a4-43af-a082-0b12b6572401', '游戏管理', '游戏列表', 'el-icon-s-unfold', 'game', '游戏列表', 'game/games.vue', 0, 0, '1599205945504', '1', '', '');
INSERT INTO `base_mod` VALUES ('d14be607-3081-43ad-9331-326ea7e97c35', '0', '根', '封号系统', 'el-icon-lock', '/seal', '封号系统', 'Layout', 0, 0, '1599530294071', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599530456555');
INSERT INTO `base_mod` VALUES ('da56785c-0d7c-4735-be21-5d7f69009372', '982d83ec-9bb4-4b5e-86b9-27e0cfb4fcda', '配置', '广告配置', '广告配置', '/game5', '广告配置', 'dashboard/index.vue', 0, 0, '1599483023276', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1599483190902');
INSERT INTO `base_mod` VALUES ('dc13b8bf-710d-4970-a65a-d97047592331', 'd14be607-3081-43ad-9331-326ea7e97c35', '封号系统', '封号系统', 'el-icon-lock', 'seal', '封号系统', 'dashboard/index.vue', 0, 0, '1599530490512', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '', '');
INSERT INTO `base_mod` VALUES ('f1eb72e2-5440-4b65-a9f8-37a329f25db2', 'b5b4d66a-c682-401f-82f3-131429588225', '预警设置', '预警设置', 'el-icon-warning', 'wran', '预警设置', 'dashboard/index.vue', 0, 0, '1599531237378', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '', '');
INSERT INTO `base_mod` VALUES ('fde7c1bc-7fb3-45d1-812c-430abb15c0c5', '0', '根', 'cdn应急刷新', 'el-icon-refresh', '/cdn', 'cdn应急刷新', 'Layout', 0, 0, '1599530641463', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '', '');

-- ----------------------------
-- Table structure for base_role
-- ----------------------------
DROP TABLE IF EXISTS `base_role`;
CREATE TABLE `base_role`  (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `roleName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `mods` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '权限对应的模块ids',
  `isDelete` int(0) NULL DEFAULT 0,
  `createdTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `createdBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `updatedTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `updatedBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_role
-- ----------------------------
INSERT INTO `base_role` VALUES ('1', '管理员', 'all', 0, '2020-08-31 11:17:33', NULL, NULL, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1');
INSERT INTO `base_role` VALUES ('1a17e1ce-f877-46b3-a1ba-882ff1441ba0', '访客', NULL, 1, '', '1', '', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1');
INSERT INTO `base_role` VALUES ('b6363d60-71aa-4489-b784-4effa01dffd2', '访客', NULL, 0, '', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1');

-- ----------------------------
-- Table structure for base_tp_log
-- ----------------------------
DROP TABLE IF EXISTS `base_tp_log`;
CREATE TABLE `base_tp_log`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作用户id',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户账号',
  `createdTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `operationType` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作;类型:查询、新增、删除、修改',
  `operationMod` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作模块',
  `ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '操作ip地址',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  FULLTEXT INDEX `ft_index2`(`username`, `operationType`, `operationMod`) WITH PARSER `ngram`,
  FULLTEXT INDEX `ft_name`(`username`) WITH PARSER `ngram`
) ENGINE = MyISAM AUTO_INCREMENT = 157 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_tp_log
-- ----------------------------
INSERT INTO `base_tp_log` VALUES (8, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:01:07', '查询', '/auth/role', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (7, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:01:07', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (6, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '2020-09-08 19:59:46', '查询', '/auth/role', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (5, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '2020-09-08 19:59:46', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (9, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:07:16', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (10, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:08:12', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (11, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:08:33', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (12, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin123456', '2020-09-08 20:19:47', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (13, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin123456', '2020-09-08 20:19:50', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (14, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin123456', '2020-09-08 20:19:50', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (15, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin123456', '2020-09-08 20:19:52', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (16, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin123456', '2020-09-08 20:19:55', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (17, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:25:49', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (18, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:25:58', '更新', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (19, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:25:58', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (20, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:02', '更新', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (21, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:02', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (22, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:05', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (23, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:05', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (24, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:07', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (25, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:10', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (26, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:12', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (27, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:12', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (28, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:12', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (29, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:22', '更新', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (30, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:32', '更新', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (31, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:45', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (32, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:45', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (33, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:26:50', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (34, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:27:54', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (35, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:27:54', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (36, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:27:55', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (37, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:27:56', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (38, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:27:57', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (39, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:27:58', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (40, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:27:58', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (41, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:27:59', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (42, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:00', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (43, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:00', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (44, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:01', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (45, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:02', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (46, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:04', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (47, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:05', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (48, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:07', '删除', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (49, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:24', '新增', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (50, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:45', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (51, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:48', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (52, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:48', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (53, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:50', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (54, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:28:52', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (55, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:29:09', '更新', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (56, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:29:14', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (57, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:29:14', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (58, 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', 'test12345', '2020-09-08 20:30:52', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (59, 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', 'test12345', '2020-09-08 20:30:57', '更新', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (60, 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', 'test12345', '2020-09-08 20:33:13', '新增', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (61, 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', 'test12345', '2020-09-08 20:33:37', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (62, 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', 'test12345', '2020-09-08 20:34:39', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (63, 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', 'test12345', '2020-09-08 20:36:33', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (64, 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', 'test12345', '2020-09-08 20:38:23', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (65, 'a7aa7e57-3a06-431c-b4a2-bef6e34e3064', 'test12345', '2020-09-08 20:38:26', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (66, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:54:49', '查询', '游戏', '::ffff:172.16.3.19');
INSERT INTO `base_tp_log` VALUES (67, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:55:10', '查询', '模块', '::ffff:172.16.3.19');
INSERT INTO `base_tp_log` VALUES (68, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:55:22', '查询', '模块', '::ffff:172.16.3.19');
INSERT INTO `base_tp_log` VALUES (69, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:59:09', '查询', '游戏', '::ffff:172.16.3.19');
INSERT INTO `base_tp_log` VALUES (70, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-08 20:59:13', '查询', '模块', '::ffff:172.16.3.19');
INSERT INTO `base_tp_log` VALUES (71, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:50:07', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (72, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:53:43', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (73, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:53:49', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (74, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:53:54', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (75, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:54:12', '更新', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (76, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:54:12', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (77, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:54:16', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (78, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:54:19', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (79, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:54:29', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (80, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:54:42', '更新', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (81, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 09:54:42', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (82, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:07:04', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (83, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:07:13', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (84, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:14:32', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (85, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:14:49', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (86, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:15:21', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (87, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:28:44', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (88, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:28:46', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (89, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:24', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (90, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:26', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (91, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:27', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (92, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:29', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (93, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:29', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (94, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:30', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (95, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:31', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (96, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:32', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (97, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:32', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (98, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:33', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (99, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:34', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (100, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:35', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (101, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:35', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (102, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:36', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (103, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:38', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (104, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:39', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (105, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:39', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (106, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:43', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (107, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:31:46', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (108, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:36:35', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (109, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:36:54', '更新', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (110, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:36:57', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (111, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:36:59', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (112, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:37:00', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (113, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:37:00', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (114, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:37:02', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (115, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:42:10', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (116, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 10:42:24', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (117, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:27:09', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (118, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:28:33', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (119, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:28:36', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (120, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:41:11', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (121, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:41:14', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (122, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:41:16', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (123, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:41:18', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (124, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:41:19', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (125, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:41:19', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (126, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:42:09', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (127, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 11:42:09', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (128, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 13:48:13', '查询', '游戏', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (129, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:06:08', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (130, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:06:08', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (131, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:06:09', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (132, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:06:10', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (133, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:06:17', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (134, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:06:17', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (135, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:07:45', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (136, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:07:45', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (137, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:08:32', '更新', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (138, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:08:42', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (139, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:08:43', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (140, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:09:34', '更新', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (141, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:09:36', '更新', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (142, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:12:23', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (143, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:12:23', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (144, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:12:54', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (145, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:12:54', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (146, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:14:37', '更新', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (147, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:14:40', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (148, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:14:40', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (149, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:15:55', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (150, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:15:55', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (151, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:16:13', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (152, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:16:13', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (153, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:16:21', '查询', '模块', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (154, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:16:25', '查询', '用户', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (155, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:16:26', '查询', '角色', '::ffff:192.168.12.245');
INSERT INTO `base_tp_log` VALUES (156, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin', '2020-09-09 14:16:29', '查询', '模块', '::ffff:192.168.12.245');

-- ----------------------------
-- Table structure for base_user
-- ----------------------------
DROP TABLE IF EXISTS `base_user`;
CREATE TABLE `base_user`  (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `roles` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '角色id',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isDelete` int(0) NULL DEFAULT 0 COMMENT '是否删除,0:否1:是',
  `avatar` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '头像',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '邮箱',
  `rolesName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '角色名称',
  `updatedTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '修改时间',
  `createdTime` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '创建时间',
  `createdBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `updatedBy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `roles`(`id`, `name`) USING BTREE,
  FULLTEXT INDEX `ft_index`(`name`) WITH PARSER `ngram`
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of base_user
-- ----------------------------
INSERT INTO `base_user` VALUES ('135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '1', 'admin', 'e4cffb4cdc16bed9bb79a9ef7e7bc38b', 0, NULL, 'wanghaonetcn@Gmail.com', NULL, '2020-09-09 14:09:30', '2020-09-04 17:40:53', '1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1');
INSERT INTO `base_user` VALUES ('1ed269f3-bcbf-4821-b977-72ec0c44661b', 'b6363d60-71aa-4489-b784-4effa01dffd2', '666666', '1111111', 1, NULL, NULL, '访客', '2020-09-08 20:26:17', '2020-09-08 20:27:50', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1');
INSERT INTO `base_user` VALUES ('2c4e0df5-f5a5-416d-9ab4-70666cd458ac', '1', 'admin3', '11111111', 1, NULL, '3232df23@qq.com', NULL, '2020-09-08 20:26:27', '2020-09-08 20:26:45', NULL, '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1');
INSERT INTO `base_user` VALUES ('38750ca5-bb7b-4647-8300-0bce3dd583b0', 'b6363d60-71aa-4489-b784-4effa01dffd2', '4444', '4444444', 1, NULL, NULL, NULL, '', '2020-09-08 20:27:51', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '');
INSERT INTO `base_user` VALUES ('58f82c1a-78f8-42e6-823d-84d8942b021e', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin3', '111111', 1, NULL, '32323@qq.com', NULL, NULL, '2020-09-08 20:27:52', NULL, NULL);
INSERT INTO `base_user` VALUES ('74d7eecf-ee30-4d01-a61c-6c703970c550', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin3', '111111', 1, NULL, '323223@qq.com', NULL, NULL, '2020-09-08 20:27:52', NULL, NULL);
INSERT INTO `base_user` VALUES ('806f333e-ede9-4fc0-87f4-0c8f6bf296a6', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin3', '111111', 1, NULL, '3df2132df23@qq.com', NULL, NULL, '2020-09-08 20:27:53', NULL, NULL);
INSERT INTO `base_user` VALUES ('871f9022-d694-4f1f-9de9-44546ed55cda', '1a17e1ce-f877-46b3-a1ba-882ff1441ba0', 'admin2', '111111', 1, NULL, '506255207@qq.com', NULL, NULL, '2020-09-04 17:49:19', NULL, NULL);
INSERT INTO `base_user` VALUES ('a7aa7e57-3a06-431c-b4a2-bef6e34e3064', 'b6363d60-71aa-4489-b784-4effa01dffd2', 'test12345', 'e4cffb4cdc16bed9bb79a9ef7e7bc38b', 0, NULL, '1111@qq.com', '访客', '2020-09-09 14:14:32', '2020-09-08 20:28:18', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1');
INSERT INTO `base_user` VALUES ('a9f2cc65-9a03-4eef-94ed-31fc65783610', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', 'admin3', '111111', 1, NULL, '3df232df23@qq.com', NULL, NULL, '2020-09-08 20:27:54', NULL, NULL);
INSERT INTO `base_user` VALUES ('c0ec0ba0-05f9-43de-a5bb-15ca91bce11b', '03e0560e-baa6-4763-8b0f-66993da06f63', 'admin2', '111111', 1, NULL, 'wanghaonetcn@Gmail.com', NULL, NULL, '2020-09-04 17:49:29', NULL, NULL);
INSERT INTO `base_user` VALUES ('e2f460d3-c185-47ac-8788-c5103b85e6d5', 'b6363d60-71aa-4489-b784-4effa01dffd2', 'test', '111111', 1, NULL, '1111@qq.com', NULL, NULL, '2020-09-08 20:27:55', NULL, NULL);
INSERT INTO `base_user` VALUES ('ec735c80-aa4a-4679-b8c6-d3d00721c789', 'b6363d60-71aa-4489-b784-4effa01dffd2', '222222', '222222', 1, NULL, '12111@qq.com', NULL, NULL, '2020-09-08 20:27:55', NULL, NULL);
INSERT INTO `base_user` VALUES ('ec9a3a12-3a1c-4ade-ae2b-e2e041223b41', 'b6363d60-71aa-4489-b784-4effa01dffd2', '111111', '111111', 1, NULL, '11111@qq.com', NULL, NULL, '2020-09-08 20:27:56', NULL, NULL);
INSERT INTO `base_user` VALUES ('ed34fc52-c638-4249-88df-c437bda5daa6', 'b6363d60-71aa-4489-b784-4effa01dffd2', '666666', '666666', 1, NULL, NULL, NULL, '', '2020-09-08 20:27:59', '135e4f69-8e69-4dfc-a153-3fbaed1ee9c1', '');
INSERT INTO `base_user` VALUES ('ed56c273-9e52-43e6-b2db-d87e1a4fcaef', 'b6363d60-71aa-4489-b784-4effa01dffd2', 'admin4', '111111', 1, NULL, '3df2dfa132df23@qq.com', NULL, NULL, '2020-09-08 20:28:00', NULL, NULL);
INSERT INTO `base_user` VALUES ('f158a3f0-acc6-4521-920f-a0183bb39df1', '1a17e1ce-f877-46b3-a1ba-882ff1441ba0', 'admin2', '111111', 1, NULL, '2319512282@qq.com', NULL, NULL, '2020-09-08 20:28:01', NULL, NULL);

-- ----------------------------
-- Table structure for mod_role
-- ----------------------------
DROP TABLE IF EXISTS `mod_role`;
CREATE TABLE `mod_role`  (
  `mod_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mod_role
-- ----------------------------
INSERT INTO `mod_role` VALUES ('0', '1');
INSERT INTO `mod_role` VALUES ('94190e42-d799-40b7-846d-05abe234bb5b', '1');
INSERT INTO `mod_role` VALUES ('52566270-28c0-47d6-8d38-2ef6d06da1aa', '1');
INSERT INTO `mod_role` VALUES ('34234', '1');
INSERT INTO `mod_role` VALUES ('12a90106-8221-4731-9147-ab7d66a15f74', '1');
INSERT INTO `mod_role` VALUES ('3', '1');
INSERT INTO `mod_role` VALUES ('243c05d8-d9dd-43d4-9015-30964b828da5', '1');
INSERT INTO `mod_role` VALUES ('a06bce44-e4a4-43af-a082-0b12b6572401', '1');
INSERT INTO `mod_role` VALUES ('bfbc56ae-0b61-4194-b026-ef42c58678c9', '1');
INSERT INTO `mod_role` VALUES ('12a90106-8221-4731-9147-ab7d66a15f74', '1a17e1ce-f877-46b3-a1ba-882ff1441ba0');
INSERT INTO `mod_role` VALUES ('34234', '1a17e1ce-f877-46b3-a1ba-882ff1441ba0');
INSERT INTO `mod_role` VALUES ('0', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('12a90106-8221-4731-9147-ab7d66a15f74', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('34234', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('982d83ec-9bb4-4b5e-86b9-27e0cfb4fcda', '1');
INSERT INTO `mod_role` VALUES ('af6be946-c0b5-4e95-8579-f40da1ca4466', '1');
INSERT INTO `mod_role` VALUES ('19298dd9-0af2-4885-b33d-38926a3d1e9f', '1');
INSERT INTO `mod_role` VALUES ('26032ec3-db76-4fa4-88ba-46e25f3d2ac6', '1');
INSERT INTO `mod_role` VALUES ('8ec76308-c995-48fa-ba61-6d9adccbce3d', '1');
INSERT INTO `mod_role` VALUES ('da56785c-0d7c-4735-be21-5d7f69009372', '1');
INSERT INTO `mod_role` VALUES ('b0158ff5-642d-4547-8a2d-d957ac029032', '1');
INSERT INTO `mod_role` VALUES ('bf2265b6-317f-4108-8d50-a8046b3718d0', '1');
INSERT INTO `mod_role` VALUES ('d14be607-3081-43ad-9331-326ea7e97c35', '1');
INSERT INTO `mod_role` VALUES ('dc13b8bf-710d-4970-a65a-d97047592331', '1');
INSERT INTO `mod_role` VALUES ('fde7c1bc-7fb3-45d1-812c-430abb15c0c5', '1');
INSERT INTO `mod_role` VALUES ('08591bd4-f5c3-4084-ab1e-82cd4a622bba', '1');
INSERT INTO `mod_role` VALUES ('b5b4d66a-c682-401f-82f3-131429588225', '1');
INSERT INTO `mod_role` VALUES ('f1eb72e2-5440-4b65-a9f8-37a329f25db2', '1');
INSERT INTO `mod_role` VALUES ('852ac375-11b5-4624-8b38-6daaf7476477', '1');
INSERT INTO `mod_role` VALUES ('b9a7c2f4-3aec-4cf7-86cd-2e77ad2f8285', '1');
INSERT INTO `mod_role` VALUES ('a06bce44-e4a4-43af-a082-0b12b6572401', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('bfbc56ae-0b61-4194-b026-ef42c58678c9', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('982d83ec-9bb4-4b5e-86b9-27e0cfb4fcda', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('af6be946-c0b5-4e95-8579-f40da1ca4466', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('19298dd9-0af2-4885-b33d-38926a3d1e9f', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('26032ec3-db76-4fa4-88ba-46e25f3d2ac6', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('8ec76308-c995-48fa-ba61-6d9adccbce3d', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('da56785c-0d7c-4735-be21-5d7f69009372', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('b0158ff5-642d-4547-8a2d-d957ac029032', 'b6363d60-71aa-4489-b784-4effa01dffd2');
INSERT INTO `mod_role` VALUES ('bf2265b6-317f-4108-8d50-a8046b3718d0', 'b6363d60-71aa-4489-b784-4effa01dffd2');

-- ----------------------------
-- Procedure structure for proc_games
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_games`;
delimiter ;;
CREATE DEFINER=`root`@`%` PROCEDURE `proc_games`(startpage int,pagerows int,nameStr VARCHAR(50),statusStr VARCHAR(50))
BEGIN

	

	set startpage=(startpage-1)*pagerows;
		
	  #判断是否有过滤条件返回对应的数据
	if nameStr='' and statusStr='' then
			 SELECT 
				id ,
				gameId,
				icon,
				gameName,
				gamePath,
				version,
				team,
				staffGear,
				status,
				doc,
				createdTime
			FROM base_game
			where isDelete=0 
			LIMIT startpage, pagerows;
			SELECT COUNT(*) total FROM base_game where isDelete=0  ;
		else
			 SELECT 
				id,
				gameId,
				icon,
				gameName,
				gamePath,
				version,
				team,
				staffGear,
				status,
				doc,
				createdTime
			FROM base_game
			where isDelete=0 
				and gameName like concat("%",nameStr,"%") 
						and status like concat("%",statusStr,"%") 
			LIMIT startpage, pagerows;
			 SELECT 
				COUNT(*)  total
			FROM base_game
			where isDelete=0  
				and gameName like concat("%",nameStr,"%")
						and status like concat("%",statusStr,"%") 
			LIMIT startpage, pagerows;
		end if;
		

	
	

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for proc_roles
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_roles`;
delimiter ;;
CREATE DEFINER=`root`@`%` PROCEDURE `proc_roles`(startpage int,pagerows int,nameStr VARCHAR(50))
BEGIN

	

	set startpage=(startpage-1)*pagerows;
		
	  #判断是否有过滤条件返回对应的数据
		if nameStr='' then
			 SELECT 
				id,
				roleName,
				createdTime
			FROM base_role
			where isDelete=0 
			LIMIT startpage, pagerows;
			SELECT COUNT(*) total FROM base_role where isDelete=0  ;
		else
			 SELECT 
				id,
				roleName,
				createdTime
			FROM base_role
			where isDelete=0 
				and roleName like concat("%",nameStr,"%") 
			LIMIT startpage, pagerows;
			 SELECT 
				COUNT(*)  total
			FROM base_role
			where isDelete=0  
				and roleName like concat("%",nameStr,"%") 
			LIMIT startpage, pagerows;
		end if;
		

	
	

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for proc_system_log
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_system_log`;
delimiter ;;
CREATE DEFINER=`root`@`%` PROCEDURE `proc_system_log`( startpage INT, pagerows INT, nameStr VARCHAR ( 50 ), operationTypeStr VARCHAR ( 50 ), operationModStr VARCHAR ( 50 ) )
BEGIN

SET startpage = ( startpage - 1 ) * pagerows;#判断是否有过滤条件返回对应的数据
IF
	nameStr = '' 
	AND operationTypeStr = '' 
	AND operationModStr = '' THEN
SELECT
	id,
	username,
	createdTime,
	operationMod,
	operationType,
	ip
	 
FROM
	base_tp_log 
	order by createdTime desc
	LIMIT startpage,
	pagerows;
SELECT
	COUNT( id ) total 
FROM
	base_tp_log;
ELSE SELECT
	id,
	username,
	createdTime,
	operationType,
	operationMod,
	ip
FROM
	base_tp_log 
WHERE
	MATCH ( username, operationType,operationMod ) AGAINST (CONCAT(nameStr,operationTypeStr,operationModStr) )
	 order by createdTime desc
	LIMIT startpage,
	pagerows;
SELECT
	COUNT( id ) total 
FROM
	base_tp_log 
WHERE
	MATCH ( username, operationType,operationMod ) AGAINST (CONCAT(nameStr,operationTypeStr,operationModStr));

END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for proc_users
-- ----------------------------
DROP PROCEDURE IF EXISTS `proc_users`;
delimiter ;;
CREATE DEFINER=`root`@`%` PROCEDURE `proc_users`(startpage int,pagerows int,nameStr VARCHAR(50),roleId VARCHAR(50))
BEGIN

	

	set startpage=(startpage-1)*pagerows;
		
	  #判断是否有过滤条件返回对应的数据
		if nameStr='' and roleId='' then
			 SELECT 
				id,
				roles,
				rolesName,
				name,
				createdTime,
				email
			FROM base_user
			where isDelete=0 
			LIMIT startpage, pagerows;
			SELECT COUNT(*) total FROM base_user where isDelete=0  ;
		else
			 SELECT 
				id,
				roles,
				rolesName,
				name,
				createdTime,
				email
			FROM base_user
			where isDelete=0 
					and roles like concat("%",roleId,"%") 
				and name like concat("%",nameStr,"%") 
			LIMIT startpage, pagerows;
			 SELECT 
				COUNT(*)  total
			FROM base_user
			where isDelete=0 
				and roles like concat("%",roleId,"%") 
				and name like concat("%",nameStr,"%") 
			LIMIT startpage, pagerows;
		end if;
		

	
	

END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
