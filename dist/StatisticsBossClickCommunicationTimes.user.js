// ==UserScript==
// @name         统计Boss点击沟通次数
// @namespace    https://github.com/ITKMUnigle/TampmonkeyJS
// @homepage     https://github.com/ITKMUnigle/TampmonkeyJS
// @updateURL    https://raw.githubusercontent.com/ITKMUnigle/TampmonkeyJS/main/dist/StatisticsBossClickCommunicationTimes.user.js
// @version      1.1
// @description  统计Boss点击沟通次数
// @author       Unigle
// @match        https://www.zhipin.com/web/geek/chat*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhipin.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    function jisuan() {
        //获取聊天列表
        var chatlist = document.querySelectorAll(".user-list > ul li .text .time")
        //统计次数
        let count = 0
        chatlist.forEach(_ => {
            if (_.textContent.indexOf(":") > 0) {
                let time = parseInt(_.textContent.split(":")[0])
                if ( time >= 0 && time <24) {
                    count ++
                }
            }
        })
        //创建span元素插入到container中
        let container = document.querySelector(".main-wrap");
        let child = document.createElement("span")
        child.textContent = `今天总共点击沟通：${count} 次`
        child.style.position="absolute"
        child.style.top="200px"
        child.style.right="50px"
        child.style.color="red"
        child.style.fontSize="24px"
        container.appendChild(child)
    }
    //设置定时器2s执行
    let timer = setTimeout(()=>{
        clearTimeout(timer)
        jisuan()
    },2000)
})();