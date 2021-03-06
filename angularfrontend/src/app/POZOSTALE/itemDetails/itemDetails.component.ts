import {Component, OnInit} from '@angular/core';
import {DropService} from '../../services/drop.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-drop',
  templateUrl: './itemDetails.component.html',
  styleUrls: ['./itemDetails.component.css']
})
export class ItemDetailsComponent implements OnInit {
  powiazane;
  numer;
  nazwa;

  itemSila;
  itemInteligencja;
  itemObrona;
  itemObrazenia;

  index;

  constructor(private dropService: DropService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.numer = this.route.snapshot.paramMap.get("id");
    this.dropService.getMonstersWhichDropThisItem(this.numer).subscribe(response => {
      this.powiazane = response;
      this.nazwa = response[0].item.itemName;
      this.index = response[0].item.id;
      this.itemSila = response[0].item.itemStrength;
      this.itemInteligencja = response[0].item.itemWidsdom;
      this.itemObrona = response[0].item.itemDefense;
      this.itemObrazenia = response[0].item.itemDamage;
    });
  }

}
