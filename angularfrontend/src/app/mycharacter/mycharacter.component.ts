import {ExamplespringService} from '../services/examplespring.service';
import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, CdkDragEnter, CdkDragExit, CdkDragStart, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DropService} from '../services/drop.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './mycharacter.component.html',
  styleUrls: ['./mycharacter.component.scss']
})
export class MycharacterComponent implements OnInit {
  previusDragContainer;
  infoAboutItem;
  rect;
  userItems;
  itemImg;
  actualHoverItem;
  myItemName;
  myItemDamage;
  myItemStrength;
  myItemWidsdom;
  myItemDefense;

  constructor(private userService: ExamplespringService, private dropService: DropService) {
  }

  ngOnInit() {
    this.dropService.getRandomItemsToShop(4).subscribe(response => { // W PRZYSZLOSCI NIE MOZNA POBIERAC LOSOWYCH OFC
      this.userItems = response;
      window.sessionStorage.setItem('userItems', JSON.stringify(this.userItems));
      for (const item of this.userItems) {  // dla wszystkich pobranych elementow
        this.itemImg = document.createElement('img'); // stworzenie nowego elementu html typu img
        this.itemImg.src = 'http://localhost:8080/item/getItemImage/' + item.id; // ustawienie zrodla obrazka na backend w springu
        this.itemImg.id = 'userItemImg' + item.id + item.itemType.toLowerCase(); // przypisanie id przedmiotu do id elementu html
        this.itemImg.addEventListener('mouseover', this.mouseOverItem); // dodanie do obrazka obslugi zdarzen
        this.itemImg.addEventListener('mouseout', this.mouseOutItem);
        // na razie przypisujemy byle gddzie do pola na podstawie id przedmiotu -> i tak jets ich 9 a pol 10
        document.getElementById('userItem' + item.id).appendChild(this.itemImg);
        document.getElementById('userItem' + item.id).id = 'userItem' + item.id + item.itemType.toLowerCase();
      }
    });
  }

  // obsluga zdarzenie przenoszenia przedmiotow z eq/plecak i plecak/eq
  // id slotow w plecaku
  // slot1 ale draggable są userItem1 -> drag and drop polega na zamianie WYLACZNIE ZDJEC MIEJSCAMI, tak aby polozenie slotow
  // bylo stale i niezalezne od wykonanego drag and dropa
  // slot2 ale draggable są userItem2
  // .
  // .
  // id miejsc w eq
  // earring ale draggable sa earringE
  // helmet ale draggable sa helmetE
  // .
  // .

  mouseOverItem(ev) {
    // ev.target to zdjecie aktualnego przedmiotu
    // wypelnic infoAboutItem statystykami przedmiotu

    this.userItems = JSON.parse(window.sessionStorage.getItem('userItems'));
    for (const item of this.userItems) {
      if (ev.target.id.includes(item.id)) {
        this.actualHoverItem = item;
        break;
      }
    }
    document.getElementById('itemName').innerText = this.actualHoverItem.itemName;
    if (this.actualHoverItem.itemDamage !== 0) {
      document.getElementById('itemDamage').parentElement.style.display = 'inline-block';
      document.getElementById('itemDamage').innerText = this.actualHoverItem.itemDamage;
    } else {
      document.getElementById('itemDamage').parentElement.style.display = 'none';
    }
    if (this.actualHoverItem.itemDefense !== 0) {
      document.getElementById('itemDefense').parentElement.style.display = 'inline-block';
      document.getElementById('itemDefense').innerText = this.actualHoverItem.itemDefense;
    } else {
      document.getElementById('itemDefense').parentElement.style.display = 'none';
    }
    if (this.actualHoverItem.itemStrength !== 0) {
      document.getElementById('itemStrength').parentElement.style.display = 'inline-block';
      document.getElementById('itemStrength').innerText = this.actualHoverItem.itemStrength;
    } else {
      document.getElementById('itemStrength').parentElement.style.display = 'none';
    }
    if (this.actualHoverItem.itemWidsdom !== 0) { // #TODO uwaga na literowke
      document.getElementById('itemWidsdom').parentElement.style.display = 'inline-block';
      document.getElementById('itemWidsdom').innerText = this.actualHoverItem.itemWidsdom;
    } else {
      document.getElementById('itemWidsdom').parentElement.style.display = 'none';
    }
    document.getElementById(this.actualHoverItem.itemType.toLowerCase() + 'HolderPhoto').style.opacity = '0.3';

    this.rect = ev.target.getBoundingClientRect();
    this.infoAboutItem = document.getElementById('infoAboutItem');
    this.infoAboutItem.style.left = this.rect.left + 'px';
    this.infoAboutItem.style.top = this.rect.top * 0.9 + 'px';
    this.infoAboutItem.style.visibility = 'visible';
  }

  mouseOutItem(ev) {
    document.getElementById(this.actualHoverItem.itemType.toLowerCase() + 'HolderPhoto').style.opacity = '1';
    this.infoAboutItem.style.visibility = 'hidden';
  }

  swapElements(oldItemId: string, oldContainerId: string) {
    console.log(oldContainerId);
    document.getElementById(oldContainerId).appendChild(document.getElementById(oldItemId));


  }

  dragStart(event: CdkDragStart) {
    this.myItemDefense = document.getElementById('itemDefense').innerText ? document.getElementById('itemDefense').innerText : 0;
    this.myItemDamage = document.getElementById('itemDamage').innerText ? document.getElementById('itemDamage').innerText : 0;
    this.myItemName = document.getElementById('itemName').innerText
    this.myItemStrength = document.getElementById('itemStrength').innerText ? document.getElementById('itemStrength').innerText : 0;
    this.myItemWidsdom = document.getElementById('itemWidsdom').innerText ? document.getElementById('itemWidsdom').innerText : 0;
    document.getElementById('wrongItemWarning').style.animation = ''; // reset animacji dla wrongItemWarning
    this.previusDragContainer = event.source.element.nativeElement.parentElement.id; // miejsce z ktorego rozpoczynam drag
  }

  dragEntered(event: CdkDragEnter) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '0.3';
  }

  dragExit(event: CdkDragExit) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
  }

  drop(event: any) {
    document.getElementById(event.container.element.nativeElement.parentElement.children[0].id).style.opacity = '1';
    // sprawdz czy przeniesienie jest mozliwe czyli dla plecaka zawsze jest mozliwe, ale jak juz zakladasz przedmiot to trzeba sprawdzic
    if (event.item.element.nativeElement.children[0].id.includes(event.container.element.nativeElement.id) ||
      event.container.element.nativeElement.id.includes('slot')) {
      if (event.container.element.nativeElement.id.includes('slot') && this.previusDragContainer.includes('slot')) {
        if (event.container.element.nativeElement.children[0].children.length === 0) {
          document.getElementById(event.container.element.nativeElement.children[0].id).append
          (document.getElementById(event.item.element.nativeElement.children[0].id));
        }
      }
      // PRZELICZANIE STATYSTYK
      // jesli przenosisz z innego miejsca niz relacja plecak-plecak to... -> CZYLI
      // DZIALAJ DLA KAZDEGO MOZLIWEGO PRZENIESIA ZA WYJATKIEM PLECAK-PLECAK BO TUTAJ TRZEBA TO BYLO ROZDZIELIC, ZEBY
      // DLA KAZDEGO PONIZSZEGO PRZENIESIA OBLICZAC STATYSTKI
      if (((!this.previusDragContainer.includes('slot') || !event.container.element.nativeElement.id.includes('slot'))
        && event.container.element.nativeElement.children[0].children.length === 0)) {
        document.getElementById(event.container.element.nativeElement.children[0].id).append
        (document.getElementById(event.item.element.nativeElement.children[0].id));
        console.log('tak trzeba przeliczyc staty');


        // NIE MOZNA DOKONYWAC ZAMIANY PRZEDMIOTOW PRZENOSZAC PRZEDMIOT NA PRZEDMIOT -> TRZEBA PRZENIESC DO WOLNEGO MIEJSCA
        // #TODO
        // #TODO
        // #TODO
        // #TODO
        // WSZYSTKIE parametry itemu dostepne W ZMIENNYCH
        // console.log(this.myItemName); // maja wartosc dodatnia lub ujemna lub 0
        // console.log(this.myItemWidsdom);
        // console.log(this.myItemStrength);
        // console.log(this.myItemDefense);
        // console.log(this.myItemDamage);
        // if(this.previousContainer.includes('slot') => to przenosimy z plecaka do eq czyli dodaj staty
        // #TODO
        // if(!this.previousContainer.includes('slot') => to przenosimy z eq do plecaka czyli odejmij staty
        // #TODO
        // #TODO
        // #TODO
        // #TODO
        // MIEJSCE NA KOD PRZELICZAJACY STATYSTYKI PO UPUSZCZENIU PRZEDMIOTU


        // MIEJSCE NA KOD PRZELICZAJACY STATYSTYKI PO UPUSZCZENIU PRZEDMIOTU
      }
      } else {
        // jesli przeniesienie w ogole nie bylo niemozliwe to:
        document.getElementById('wrongItemWarning').style.animation = 'changeVisibility 2s';

      }
    }
  }

