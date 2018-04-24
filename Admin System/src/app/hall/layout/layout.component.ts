import { Component, OnInit, trigger, state, style, transition, animate  } from '@angular/core';
import { HallService } from '../../@services/hall.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Layout } from '../../@objects/layout';
import { lastDayOfQuarter } from 'date-fns';
import { jsonpCallbackContext } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
  ],
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  layout: Layout;
  mode: string;
  width: number;
  height: number;
  name: string;

  constructor(public hallService: HallService,
  public route: ActivatedRoute) { 
    this.route.params.subscribe((params: Params )=> {
      this.mode = params['id'];
    });
  }

  ngOnInit() {
    if(this.mode == "add"){
      this.layout = new Layout();
    } else {
      this.hallService.getLayout(this.mode).subscribe((response) => {
        this.layout = response[0];
        this.layout.array = this.decode(response[0].encoded);
      })
    }
  }

  decode(encoded) {

    encoded = JSON.parse(encoded);

    var array = new Array(encoded.length);
    for(var i = 0; i < array.length; i++){

      console.log(encoded[i].margin)

      if(encoded[i].margin){
        array[i] = new Array();

        for(var j = 0; j < encoded[i].row.length; j++){
          array[i].push(false);
        }

        array[i+1] = new Array();
      } else {
        array[i] = new Array();
      }

      for(var j = 0; j < encoded[i].row.length; j++){
        if(encoded[i].row[j] == "offset")
          array[i].push(false);
        else 
          array[i].push(true);
      }
    }

    return array;
  }

  arraySize() {
    this.layout.array = new Array(this.height);

    for(var i = 0; i < this.height; i++){
      this.layout.array[i] = new Array();
      for(var j = 0; j < this.width; j++){
        this.layout.array[i].push(false);
      }
    }
  }

  toggle(i: number, j: number) {
    this.layout.array[i][j] = !this.layout.array[i][j];
  }

  toggleColumn(j: number) {
    for(var i = 0; i < this.layout.array.length; i++){
      this.layout.array[i][j] = !this.layout.array[i][j];
    }
  }

  toggleRow(i: number) {
    for(var j = 0; j < this.layout.array[i].length; j++){
      this.layout.array[i][j] = !this.layout.array[i][j];
    }
  }

  letter(index: number) {
    var ascii = 65;
    return String.fromCharCode(index + ascii);
  }

  submit() {
    var ascii = 65;
    var letter = 'A';
    var jsonObj = [];
    var marginFlag: boolean = false;
    for (var i = 0; i < this.layout.array.length; i++) {
      var object: rowObj = new rowObj();
      object.margin = marginFlag;
      marginFlag = false;
      var row = [];
      var margin = this.layout.array[i].length;
      for (var j = 0; j < this.layout.array[i].length; j++) {
        if (this.layout.array[i][j]) {
          row.push({ seat: { number: letter + '' + (j + 1) } });
        } else {
          row.push("offset");
          margin--;
        }
      }
      if (margin === 0) {
        marginFlag = true;
      } else {
        object.row = row;
        jsonObj.push(object);
        letter = String.fromCharCode(++ascii);
      }
    }
    var json = JSON.stringify(jsonObj);
    console.log(json);

    this.save(json);
  }

  save(json) {
    this.layout.encoded = json;

    this.hallService.saveLayout(this.layout).subscribe((response) => {
      console.log("hall added");
    })
  }
}


export class rowObj {
  margin: boolean;
  row: any[]
}
