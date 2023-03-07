// ==UserScript==
// @name         统计Boss点击沟通次数
// @version      1.3.1
// @description  统计Boss点击沟通次数
// @author       Unigle
// @namespace    https://github.com/ITKMUnigle/TampmonkeyJS
// @homepage     https://github.com/ITKMUnigle/TampmonkeyJS
// @updateURL    https://raw.githubusercontent.com/ITKMUnigle/TampmonkeyJS/main/dist/StatisticsBossClickCommunicationTimes.user.js
// @match        https://www.zhipin.com/web/geek/chat*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhipin.com
// @grant        none
// @run-at       document-start
// @connect         raw.githubusercontent.com
// @connect         github.com
// @connect         cn.bing.com
// @connect         www.bing.com
// @connect         translate.google.cn
// @connect         translate.google.com
// @connect         localhost
// @connect         *

// @note v1.3.1 - 修改提醒消息过滤
// @note v1.3 - 新增BOSS提醒消息过滤
// @note v1.2 - 修改内容
// @note v1.1 - 修复bug
// ==/UserScript==

(function () {
    'use strict';
    function jisuan() {
        //获取聊天列表
        let chatBoxList = document.querySelectorAll(".user-list > ul li .text")
        let nodeList = []
        let count = 0
        let autoBossTipsCount = 0
        chatBoxList.forEach(_ => {
            if (_.childNodes[0].textContent.indexOf(":") > 0) {
                nodeList.push({
                    time: _.childNodes[0].textContent,
                    lastMsg: _.childNodes[2].textContent
                })
            }
        })
        // 过滤逻辑
        nodeList.forEach(_ => {
            if (parseInt(_.time.split(":")[0]) >= 0 && parseInt(_.time.split(":")[0]) < 24) {
                if (_.lastMsg != '尊贵的VIP用户，您的消息已被心仪Boss优先查看') {
                    count++
                }else{
                    autoBossTipsCount++
                }
            }
        })
        let container = document.querySelector(".main-wrap");
        let msgBox = document.querySelector("#boss_chat_count")
        if (msgBox) {
            msgBox.remove()
        }
        let child = document.createElement("span")
        child.id = "boss_chat_count"
        child.textContent = `今天总共点击沟通：${count} 次\nBoss设置的提醒功能次数: ${autoBossTipsCount}`
        child.style.position = "absolute"
        child.style.top = "200px"
        child.style.right = "50px"
        child.style.color = "red"
        child.style.fontSize = "22px"
        child.style.whiteSpace="pre-wrap"
        container.appendChild(child)
    }
    //设置定时器2s执行
    let timer = setTimeout(() => {
        clearTimeout(timer)
        jisuan()
    }, 2000)
})();