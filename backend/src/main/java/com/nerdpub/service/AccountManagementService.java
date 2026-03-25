package com.nerdpub.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.dto.LoginDTO;
import com.nerdpub.dto.MemberDTO;
import com.nerdpub.mapper.MemberMapper;
import com.nerdpub.model.Member;
import com.nerdpub.repository.MemberRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AccountManagementService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberMapper memberMapper;

    //@Autowired
    //PasswordHasher passwordHasher;



    public String login(LoginDTO loginDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

    
    public void deleteById(int id) {
        memberRepository.deleteById(id);
    }


    /**
     * Creates a new User from a DTO
     * @param memberDTO
     * @return
     */
    public MemberDTO create(MemberDTO memberDTO) {
        
        Member member = memberMapper.toEntity(memberDTO);
        //member.setPassword(passwordHasher.toHash(member.getPassword()));
        member = memberRepository.save(member);
        return memberMapper.toDTO(member);
    }

    /**
     * Updates an existing User from a DTO
     * @param memberDTO
     * @return
     */
    public MemberDTO update(MemberDTO memberDTO) {
        Member member = memberRepository.findById(memberDTO.getId())
            .orElseThrow(() -> new EntityNotFoundException("User not found"));
        memberMapper.updateFromDTO(memberDTO, member);
        member = memberRepository.save(member);
        return memberMapper.toDTO(member); 
    }

    /**
     * From the token returns the currently logged in member
     * @param token
     * @return
     */
    public MemberDTO getCurrentUser(String membername) {
        return memberMapper.toDTO(
                memberRepository.findByUsername(membername).get());
    }
    
}
