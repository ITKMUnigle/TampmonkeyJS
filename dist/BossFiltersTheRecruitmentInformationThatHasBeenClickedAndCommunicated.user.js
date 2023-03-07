// ==UserScript==
// @name         Boss招聘过滤点击过沟通的招聘信息
// @version      1.0
// @description  Boss招聘过滤点击过沟通的招聘信息
// @author       Unigle
// @namespace    https://github.com/ITKMUnigle/TampmonkeyJS
// @homepage     https://github.com/ITKMUnigle/TampmonkeyJS
// @updateURL    https://raw.githubusercontent.com/ITKMUnigle/TampmonkeyJS/main/dist/BossFiltersTheRecruitmentInformationThatHasBeenClickedAndCommunicated.user.js
// @match  https://www.zhipin.com/web/geek/job?*
// @inculde https://www.zhipin.com/web/geek/job\?((?:&|[\w]+=[\w%]+))+
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhipin.com
// @grant        none
// @run-at       document-end
// @connect         raw.githubusercontent.com
// @connect         github.com
// @connect         cn.bing.com
// @connect         www.bing.com
// @connect         translate.google.cn
// @connect         translate.google.com
// @connect         localhost
// @connect         *

// @note v1.0 发布脚本

// ==/UserScript==

(function () {
    function clearChat() {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            console.log("执行清除已沟通boss开始", new Date().toLocaleString())
            var chatBtnList = document.querySelectorAll(".job-list-box li .start-chat-btn")
            var list = []
            if (chatBtnList.length === 0) { return }
            chatBtnList.forEach(_ => {
                if (_.innerHTML !== "继续沟通") {
                    list.push(_.parentNode.parentNode.parentNode.parentNode)
                }
            })

            let box = document.querySelector(".job-list-box")
            let liList = document.querySelectorAll(".job-list-box > li")

            liList.forEach(_ => {
                _.remove()
            })

            list.forEach(_ => {
                box.appendChild(_)
            })
            console.log("执行清除已沟通boss完毕", new Date().toLocaleString())
        }, 1000)
    }

    let loopTimer = setInterval(() => {
        let path = sessionStorage.getItem("path")
        if (path != location.href) {
            sessionStorage.setItem("path", location.href)
            clearChat()
        } else {
            console.log("地址路径相等 5秒后再次判断")
        }
    }, 5000)

    window.onbeforeunload = () => {
        sessionStorage.removeItem("path")
        clearInterval(loopTimer)
    }

})();