package com.zipcompany.gamex.controller;

import com.zipcompany.gamex.Service.*;
import com.zipcompany.gamex.domain.*;
import com.zipcompany.gamex.repository.UserBackpackRepository;
import com.zipcompany.gamex.repository.UserItemRepository;
import com.zipcompany.gamex.repository.UserRepository;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/user")
public class ExampleController {

    @Autowired
    UserService userService;

    @Autowired
    ItemService itemService;

    @Autowired
    MonsterService monsterService;

    @Autowired
    MonsterItemService monsterItemService;

    @Autowired
    UserBackpackRepository userBackpackRepository;

    @Autowired
    UserItemRepository userItemRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserItemService userItemService;

    @GetMapping(value = "/userRankingLvlDesc")
    List<User> getUserRankingList()
    {
        return userService.getAllUsersByLvlDesc();
    }


    @GetMapping(value = "/test/{id}")
    public void testFunction(@PathVariable("id") Long userID){

//        User user = userService.getUser(userID);
//        System.out.println("Uzytkownik o nazwie " + user.getUsername() +
//                " ma plecak w kolorze " + user.getUserBackpack().getKolor() +
//                " w ktorym znajduje sie " + user.getUserBackpack().getUserItemList().size() +
//                " przedmiotow.");
//
//        UserBackpack userBackpack = userBackpackRepository.findUserBackpackById(userID);
//        System.out.println("Plecak o kolorze" +userBackpack.getKolor() +
//                " przypiany jest do uzytkownika o ID " + userBackpack.getUser().getId() +
//                " i przechowuje aktualnie " + userBackpack.getUserItemList().size() +
//                " przedmiotow"
//                );

        //Zwracanie uzykownika na pdostawie podanego ID itemu.
        User user = userRepository.findUserByUserItemID(userID);
        System.out.println("" +
                "");
        // User user = userItemRepository.findUserByUserItemID(userID);
        //System.out.println(userItemRepository.findUserByUserItemID(userID));
        System.out.println(user.getUsername());
        //User user = userItemRepository.findUserByUserItemID(userID);
        //System.out.println(user.getUsername());
        System.out.print("DZIALAM?");



    }


    //TODO: Jak cos sie wysypie to tutaj usun / przed getuser
    @RequestMapping(value = "/getuserItemImage/{id}")
    public void getItemPhoto(HttpServletResponse response, @PathVariable("id") long id) throws Exception {
        response.setContentType("image/jpeg");
        Blob ph = userItemService.getPhotoById(id);
        byte[] bytes = ph.getBytes(1, (int) ph.length());
        InputStream inputStream = new ByteArrayInputStream(bytes);
        IOUtils.copy(inputStream, response.getOutputStream());

        // System.out.println(itemService.getItemById(id).getItemName());
    }

    @GetMapping(value = "/getUserByUsername/{username}")
    User getUserByUsername(@PathVariable("username") String username) {

        return userService.findByUsername(username);

    }

    @GetMapping(value = "/itemyusera/{id}")
    public List<UserItem> getUserItems(@PathVariable("id") Long id){
        User user = userService.getUser(id);

        return user.getUserBackpack().getUserItemList();
    }

    @GetMapping(value = "/getRandomItemsToShop/{userId}")
    public List<Item> getRandomItemsToShop(@PathVariable long userId) {
//
        return userService.getUser(userId).getShopItems();
    }



    @PostMapping("")
    User safeUser(@RequestBody User user) {
        return userService.safeUser(user);
    }

    @GetMapping("")
    List<User> getUsers() {
        return userService.getAllUsers();
    }


//    @PostMapping("/monsters/{monsterId}/{itemId}")
//    void addMonsterToItem(@PathVariable(value = "monsterId") Long monsterId, @PathVariable(value = "itemId") Long itemId){
//
//        Item item = itemService.getItemById(itemId);
//
//        Monster monster = monsterService.findMonsterById(monsterId);
//
//        item.addMonster(monster);
//
//        monster.addItem(item);
//        itemService.addItem(item);
//
//        monster.getItems().add(item);
//    }
//


    //System.out.println(item.getMonsterItems().get(0).getMonster());
//      for(int i = 0; i < item.getMonsterItems().size(); i ++){
//          System.out.println(item.getMonsterItems().get(i).getMonster().getMonsterName());
//      }


//      //return item.getMonsters();
    //return monsterItemService.findByItemId(itemId);
    //return null;

}
