class Hex {
    constructor(id, x ,z, dirOut = 0, dirIn = 180, type="WALLS") {
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
      var hex_div = $("#id_" + this.x + "_" + this.z);
      hex_div.append(this.container);
    }

    rotate(){
      this.dirOut += 60;
      if(this.dirOut == 360) this.dirOut = 0;
      this.dirIn += 60;
      if(this.dirIn == 360) this.dirIn = 0;
      this.container.css("transform", "rotate(" +this.dirOut +"deg)");
    }
}
