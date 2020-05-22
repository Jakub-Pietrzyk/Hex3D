class LevelEditor {
    constructor() {
      this.json = {
        size: null,
        level: []
      };
      this.createHexesFromSelect();
      this.leftButtons();
    }

    createHexesFromSelect(){
      $("#hex_count").on("change",function(){
        levelEditor.clearField();
        levelEditor.json.size = parseInt($(this).val());
        levelEditor.generateFields();
      })
    }

    generateFields(){
      var count = levelEditor.json.size;
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
            levelEditor.hexClick($(this))
          })
          $("#level_editor_field").append(hex);
        }
      }
      levelEditor.updateJSON()
    }

    clearField(){
      this.json.level = [];
      $("#level_editor_field").html("");
    }

    hexClick(e){
      var field = $(e[0]);
      if(field.hasClass("active-hex-js")){
        var hex = levelEditor.json.level[field.data("hex_id")];
        hex.type = $(".type-active").text();
        hex.rotate();
      } else {
        var cords = levelEditor.getCordsFromId(field.attr("id"))
        var hex_id = levelEditor.json.level.length;
        var dirIn = 0;
        if(levelEditor.json.level.length > 0){
          var dirIn = levelEditor.json.level[hex_id-1].dirOut + 180;
          if(dirIn >= 360) dirIn -= 360;
        }
        var type = $(".type-active").text();
        var hex = new Hex(hex_id, cords[0], cords[1], 0,dirIn ,type);
        field.addClass("active-hex-js");
        field.data("hex_id", hex_id)
      }
      levelEditor.updateJSON()
    }

    getCordsFromId(id){
      var arr = id.split("_").slice(1, 3)
      return [parseInt(arr[0]), parseInt(arr[1])];
    }

    updateJSON(){
      var display_text = "{<br />&nbsp;&nbsp;'size': " + levelEditor.json.size + ",<br />&nbsp;&nbsp;'level': [<br />";
      for(var i=0; i<levelEditor.json.level.length;i++){
        display_text += "&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'id': " + levelEditor.json.level[i]["id"] + ",<br />"
        display_text += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'x': " + levelEditor.json.level[i]["x"] + ",<br />"
        display_text += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'z': " + levelEditor.json.level[i]["z"] + ",<br />"
        display_text += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'dirIn': " + levelEditor.json.level[i]["dirIn"] + ",<br />"
        display_text += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'dirOut': " + levelEditor.json.level[i]["dirOut"] + ",<br />"
        display_text += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'type': " + levelEditor.json.level[i]["type"] + "<br />"
        display_text += "&nbsp;&nbsp;&nbsp;&nbsp;}"
        if(i == levelEditor.json.level.length -1) display_text += ",";
        display_text += "<br />";
      }
      display_text += "&nbsp;&nbsp;]<br />}";
      $("#json_panel").html(display_text)
    }

    leftButtons(){
      $(".type-button").on("click", function(){
        $(".type-button").removeClass("type-active");
        $(this).toggleClass("type-active");
      })

      $("#hex_button").on("click",function(){
        location.href += "hex";
      })

      $("#play_button").on("click",function(){
        location.href += "game";
      })

      $("#movement_button").on("click", function(){
        location.href += "movement";
      })

      $("#save_level").on("click", function(){
        if(levelEditor.json.size != null){
          $.ajax({
            url: "/saveLevel",
            data: { level: JSON.stringify(levelEditor.json) },
            type: "POST",
            success: function (data) {
              alert("Poziom zapisany na serwerze")
            },
            error: function (xhr, status, error) {
              console.log(xhr);
            },
          });
        }
      })

      $("#export_level").on("click", function(){
        $.ajax({
          url: "/getLevel",
          data: {},
          type: "POST",
          success: function (response) {
            if(response != "NO_LEVEL"){
              var data = JSON.parse(response)
              levelEditor.clearField();
              levelEditor.json.size = data["size"];
              levelEditor.generateFields();
              var hexes = data["level"];
              for(var i=0;i<hexes.length;i++){
                var hex = new Hex(hexes[i]["id"], hexes[i]["x"], hexes[i]["z"], hexes[i]["dirOut"], hexes[i]["dirIn"],hexes[i]["type"]);
                var field = $("#id_" + hexes[i]["x"] + "_" + hexes[i]["z"]);
                field.addClass("active-hex-js");
                field.data("hex_id", hexes[i]["id"]);
              }
              levelEditor.updateJSON();
            }
          },
          error: function (xhr, status, error) {
            console.log(xhr);
          },
        });
      })
    }
}
