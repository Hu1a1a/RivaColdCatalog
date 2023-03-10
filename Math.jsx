function Intl(value, fixed) {
    if (fixed != null && value && value != "-") {
        num = value.toString().split(".").toString().split(",")
        if (num[0].length > 3) {
            num[0] = num[0].slice(0, num[0].length - 3) + "." + num[0].slice(-3)
        }
        if (fixed > 0) {
            if (num.length > 1) {
                value = num[0] + "," + (num[1] + "0000000000").slice(0, fixed)
            } else {
                value = num[0] + "," + ("0000000000").slice(0, fixed)
            }
        } else {
            value = num[0]
        }
    }
    return value
}