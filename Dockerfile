FROM node:latest 
# 工作目录
WORKDIR /web/wechat_money_king_server
ENV PORT 9090
# 复制配置文件
COPY package*.json ./
COPY process.yml ./
RUN npm set registry https://registry.npm.taobao.org/ \
  && npm install pm2 -g \
  && npm install
# 使用pm2管理
CMD ["pm2-runtime", "process.yml", "--only", "app", "--env", "production"]
EXPOSE 9090