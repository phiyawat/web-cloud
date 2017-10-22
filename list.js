var list =
[
  {
    id: 1,
    Facebook: 'www.facebook.com/golfcity.golfview'
  }
]

exports.findAll = function () {
  return list
}

exports.findById = function (id) {
  for (var i = 0;i < list.length;i++) {
    if (list[i].id == id) {
      return list[i]
    }
  }
}
