var list =
{
  id: [
    {
      Facebook: 'www.facebook.com/golfcity.golfview'
    },
    {
      Facebook: 'www.facebook.com/golfcity.golfview',
      Instragram: '@cityparktu'
    },
    {
      Email: 'skyview.apartment@gmail.com'
    }
  ]
}

exports.findAll = function(){
    return list;
}

exports.findById = function(id){
    for(var i = 0;i < list.length;i++){
        if(list[i].id == id){
        return list[i];
        }
    }
};
