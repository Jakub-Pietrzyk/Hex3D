class LevelEditor {
    constructor() {
      this.level = [];
      this.createHexesFromSelect();
    }

    createHexesFromSelect(){
      $("#hex_count").on("change",function(){
        levelEditor.clearField();
        var count = parseInt($(this).val());

        for(var i=0;i<count;i++){
          for(var j=0;j<count;j++){
            var hex = $("<div class='hex' id='id_" + i + "_" + j + "'>");
            var img = $("<img src='/gfx/hex.png' class='img-hex'>")
            hex.append(img)
            var top = 20 + i * 95;
            var left = 20 + j* 90;
            if(j%2 == 1) top += 47.5;
            hex.css({
              'top': top + 'px',
              "left": left + "px"
            });
            hex.on("click",function(){
              levelEditor.fieldClick($(this))
            })
            $("#level_editor_field").append(hex);
          }
        }
      })
    }

    clearField(){
      this.level = [];
      $("#level_editor_field").html("");
    }

    fieldClick(e){
      var field = $(e[0]);
      if(field.hasClass("active-hex-js")){
        var hex = levelEditor.level[field.data("hex_id")];
        hex.rotate();
      } else {
        var cords = levelEditor.getCordsFromId(field.attr("id"))
        var hex_id = levelEditor.level.length;
        var hex = new Hex(hex_id, cords[0], cords[1], 0);
        field.addClass("active-hex-js");
        field.data("hex_id", hex_id)
      }
    }

    getCordsFromId(id){
      var arr = id.split("_").slice(1, 3)
      return [parseInt(arr[0]), parseInt(arr[1])];
    }

}
