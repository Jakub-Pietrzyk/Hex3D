class Hex {
    constructor(id, x ,z, dirOut = 0, dirIn= 180, type="WALLS") {
      this.id = id;
      this.x = x;
      this.z = z;
      this.dirOut = dirOut;
      this.dirIn = dirIn;
      this.type = type;
      this.display();
      levelEditor.json.level.push(this);
    }

    display(){
      this.container = $("<div class='arrow'>^<br />" + this.id + "</div>");
      this.container.css("transform", "rotate(" +this.dirOut +"deg)");
      this.container.attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
      var hex_div = $("#id_" + this.x + "_" + this.z);
      hex_div.append(this.container);
    }

    rotate(){
      this.dirOut += 60;
      if(this.dirOut == 360) this.dirOut = 0;
      this.container.css("transform", "rotate(" +this.dirOut +"deg)");
      if(levelEditor.json.level.length > this.id) levelEditor.json.level[this.id + 1].updateDirIn(this.dirOut);
    }

    updateDirIn(dirOut){
      var dirIn = dirOut + 180;
      if(dirIn >= 360) dirIn -= 360;
      this.dirIn = dirIn;
    }
}
