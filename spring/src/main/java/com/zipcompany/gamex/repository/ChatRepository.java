package com.zipcompany.gamex.repository;

import com.zipcompany.gamex.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ChatRepository  extends JpaRepository<ChatMessage,Long> {

}
