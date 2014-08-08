define(function(){
var directives  = {
    rotate3d : function(value){
        value   = value.split(' ');
        var xangle  = value[0],
            yangle  = value[1],
            zangle  = value[2],
            looks   = value[3],
            node    = this,
            dom     = node.get('dom');

        node.set('angle',{
            xangle  : xangle,
            yangle  : yangle,
            zangle  : zangle
        });
        //zangle
        dom.style.webkitTransform = "rotate("+zangle+")";
        
        //xangle yangle
        
    },
    rotate  : function(value){
        console.log(this,value);
        this.style.webkitTransform = "rotate("+value+")";
    }
}

return directives 

})
