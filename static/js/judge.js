(function (w) {
    w.judge = {
        isNum (str) {
            return /^\d*$/.test(str) || /^(\d{1,}\.\d*)$/.test(str)
        },
        isPhone (str) {
            return /^1[34578]\d{9}$/.test(str)
        }
    }
}(window))