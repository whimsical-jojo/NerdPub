package com.nerdpub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.dto.LoginDTO;
import com.nerdpub.dto.MemberDTO;
import com.nerdpub.mapper.MemberMapper;
import com.nerdpub.model.Member;
import com.nerdpub.repository.MemberRepository;
import com.nerdpub.security.JwtService;
import com.nerdpub.security.PasswordHasher;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AccountManagementService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberMapper memberMapper;

    @Autowired
    PasswordHasher passwordHasher;

    @Autowired
    JwtService jwtService;

    public String login(LoginDTO loginDTO) {
        //Fixed it back to this by making it so the repo is joined and there is only one
		Member user = memberRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
        // verifico: le password corrispondono? Se non corrispondono, stessa storia
        // cambia il messaggio di errore                
        if (!user.getPassword().equals(passwordHasher.toHash(loginDTO.getPassword()))) {
            throw new RuntimeException("Invalid password");
        }

        // jwtService che è un servizio che non tocca il db, genera il token a partire dallo user
        // e lo rimanda all'utente sotto forma di TokenDTO
        // il token viene inviato al client, il client ce lo rimanderà
        return jwtService.generateToken(user);
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
        member.setPassword(passwordHasher.toHash(member.getPassword()));
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
        memberDTO.setPassword(passwordHasher.toHash(memberDTO.getPassword()));
        memberMapper.updateFromDTO(memberDTO, member);
        member = memberRepository.save(member);
        return memberMapper.toDTO(member); 
    }

    /**
     * From the token returns the currently logged in member
     * @param token
     * @return
     */
    public MemberDTO getCurrentUser(String username) {
        return memberMapper.toDTO(
                memberRepository.findByUsername(username).get());
    }
    
}
