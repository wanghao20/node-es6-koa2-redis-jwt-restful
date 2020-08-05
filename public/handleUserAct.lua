-- local为局部变量，没有local关键字，则视为全局变量
-- redis.call是调用redis命令，下面使用了keys命令
-- KEYS[1]为第1个参数，lua数组下标从1开始
-- /**
-- * Created by wh on 2020/8/4
-- * author: wanghao
-- * @desc：操作redis脚本
-- */
-- 1:获取到redis中hash表里所有的活跃用户id
--  获取到所有的用户key
local hashKeys = redis.call('keys', ARGV[1] .. "*");
local ids = {};
-- 拿到用户所有活跃用户id
for i = 1, #hashKeys do
    -- 获取
    local len = string.len(hashKeys[i])
    local s, e = string.find(hashKeys[i], ARGV[1])
    ids[i] = string.sub(hashKeys[i], e+1, len)
end
-- 2:通过pfadd(key:某天的日期:value:用户id)判断用户当天是否登录过
local noActIds = {};
-- 判断当前用户是否是活跃用户
-- 需要判断的天数keys
local keysLen = ARGV[2]
local k = 1;
-- 参数下标需要加2(hashkeys+keyLen)
for j = 1, #ids do
    -- 拿到统计参数key下标
    local isSgn = 1;
    local argSbs = 2
    for i = 1, keysLen, 1 do
        argSbs = argSbs + 1;
        -- 登录过返回0 ,未登录过返回1
        local state = redis.call('pfadd', ARGV[argSbs], ids[j]);
        if (state == 0) then
            -- 登录过
            isSgn = 0;
        end
    end
    if(isSgn==1) then
        noActIds[k] = ids[j]
        k=k+1;
    end

end
-- 3:拿到所有未登录id从hash中持久化到数据库再从hash表中移除用户数据
-- 返回结果
return noActIds;
