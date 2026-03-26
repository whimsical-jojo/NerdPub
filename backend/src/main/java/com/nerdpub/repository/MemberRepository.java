package com.nerdpub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer>{

    Optional<Member> findByUsername(String username);

    List<Member> findByUsernameContaining(String username);
    
}
