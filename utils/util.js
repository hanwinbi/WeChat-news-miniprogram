//格式化时间
function setTime(time) {
  time = time.toString()
  let b = new Date(time)
  if (b.getMinutes() < 10 || b.getHours() < 10) {
    if (b.getHours() < 10 && b.getMinutes() < 10) {
      return '0' + b.getHours().toString() + ":0" + b.getMinutes().toString()
    }
    else if (b.getHours() < 10) {
      return '0' + b.getHours().toString() + ":" + b.getMinutes().toString()
    }
    else if (b.getMinutes() < 10) {
      return b.getHours().toString() + ":0" + b.getMinutes().toString()
    }
  }
  return b.getHours().toString() + ":" + b.getMinutes().toString()
}

module.exports = {
  setTime: setTime,
}