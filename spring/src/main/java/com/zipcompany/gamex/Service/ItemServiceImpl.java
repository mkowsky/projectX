package com.zipcompany.gamex.Service;

import com.zipcompany.gamex.domain.Item;
import com.zipcompany.gamex.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import javax.transaction.Transactional;
import java.sql.Blob;



import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserService userService;

    @Override
    public Item addItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item getItemById(Long id) {
        return itemRepository.findItemById(id);
    }

    private JdbcTemplate jdbcTemp;

    public ItemServiceImpl(DataSource dataSource) {
        jdbcTemp = new JdbcTemplate(dataSource);
    }

    @Transactional
    public Blob getPhotoById(long id) {
        String query = "select i.item_picture from item i where i.id=?";
        Blob photo = jdbcTemp.queryForObject(query, new Object[]{id}, Blob.class);
        return photo;
    }

    public Item itemBoughtGenerateNewItem(long userId, long itemId) {
        Item item= itemRepository.getOneRandomItemThatIsNotInUserShop(userId,userService.getUser(userId).getLevel(),5);
        itemRepository.generateNewItem(userId,itemId,item.getId());
        return item;
    }

    @Override
    public List<Item> getRandomItemsToAuctionHouse() {
        return itemRepository.getRandomItemsToAuctionHouse();

    }

}
