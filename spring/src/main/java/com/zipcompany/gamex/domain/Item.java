package com.zipcompany.gamex.domain;



import com.fasterxml.jackson.annotation.JsonIgnore;
import org.aspectj.apache.bcel.generic.Tag;

import javax.persistence.*;

import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "item")
public class Item {


    private Long id;
    private String itemName;
    private ItemType itemType;

    @Lob
    private byte[] itemPicture;


    public Item(String itemName, ItemType itemType) {
        this.itemName = itemName;
        this.itemType = itemType;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public void setItemType(ItemType itemType) {
        this.itemType = itemType;
    }

    public byte[] getItemPicture() {
        return itemPicture;
    }

    public void setItemPicture(byte[] itemPicture) {
        this.itemPicture = itemPicture;
    }

    private List<MonsterItem> monsterItems;

    public Item() {

    }

    public Item(String name) {
        this.itemName = name;
    }

    public void addMonsterItem(MonsterItem monsterItem) {
        this.monsterItems.add(monsterItem);
    }

    @JsonIgnore
    @OneToMany(mappedBy = "primaryKey.item",
            cascade = CascadeType.ALL)
    public List<MonsterItem> getMonsterItems() {
        return monsterItems;
    }

    public void setMonsterItems(List<MonsterItem> monsterItems) {
        this.monsterItems = monsterItems;
    }
//    @ManyToMany(mappedBy = "items", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
//    private List<Monster> monsters;

    //   public List<Monster> getMonsters() {
//        return monsters;
//    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

// public void addMonster(Monster monster){
//      monsters.add(monster);
//      // monster.getItems().add(this);
//  }


//   public void setMonsters(List<Monster> monsters) {
//       this.monsters = monsters;
//   }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", itemName='" + itemName + '\'' +
                ", monsterItems=" + monsterItems +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemName);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        Item item = (Item) obj;
        return id == item.id && (itemName == item.itemName || (itemName != null && itemName.equals(item.getItemName())));
    }


}